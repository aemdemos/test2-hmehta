/* global WebImporter */
export default function parse(element, { document }) {
    // Create the header row exactly as specified in the example
    const headerRow = ['Accordion'];

    // Extract accordion items
    const mainTable = element.querySelector('.main-table');
    const accordionItems = mainTable.querySelectorAll('.accordion__item');

    const contentRows = Array.from(accordionItems).map((item) => {
        const titleCell = item.querySelector('.accordion__button');
        const panel = item.querySelector('.accordion__panel');

        if (!titleCell || !panel) {
            return null; // Handle missing data gracefully
        }

        const table = panel.querySelector('table');
        const rows = table ? Array.from(table.querySelectorAll('tr')) : [];

        const contentCells = rows.map(row => {
            const header = row.querySelector('th');
            const data = row.querySelector('td');

            const headerContent = header ? document.createElement('strong') : null;
            if (headerContent) {
                headerContent.textContent = header.textContent.trim();
            }

            const dataContent = data ? data.textContent.trim() : '';

            return [headerContent, dataContent];
        });

        const nestedTable = WebImporter.DOMUtils.createTable(contentCells, document);
        return [titleCell.textContent.trim(), nestedTable];
    }).filter(Boolean); // Filter out null rows for missing data

    // Build the final table
    const tableData = [
        headerRow,
        ...contentRows
    ];

    const block = WebImporter.DOMUtils.createTable(tableData, document);

    // Replace the original element with the new block table
    element.replaceWith(block);
}
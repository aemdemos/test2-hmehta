/* global WebImporter */
export default function parse(element, { document }) {
    const headerRow = ['Table (striped, bordered)'];

    // Extract content from the element
    const infoHeadingElement = element.querySelector('.info-heading');
    const infoBodyElement = element.querySelector('.info-body');

    const infoHeading = infoHeadingElement ? infoHeadingElement.textContent.trim() : '';
    const infoBody = infoBodyElement ? infoBodyElement.textContent.trim() : '';

    const tableRows = Array.from(element.querySelectorAll('table tbody tr')).map(row => {
        return Array.from(row.children).map(cell => cell.textContent.trim());
    });

    // Create block table structure
    const cells = [
        headerRow, // Header row
        [infoHeading], // Content row with heading
        [infoBody], // Content row with body
        [document.createElement('hr')], // Section separator
        ...tableRows, // Add table data rows
    ];

    const blockTable = WebImporter.DOMUtils.createTable(cells, document);

    // Replace the original element with the new block table
    element.replaceWith(blockTable);
}
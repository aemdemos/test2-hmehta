/* global WebImporter */
export default function parse(element, { document }) {
    /**
     * Helper function to extract Accordion items
     * @param {HTMLElement} accordionItem
     * @returns {Array} [title, content]
     */
    function extractAccordionItem(accordionItem) {
        const title = accordionItem.querySelector('[data-accordion-component="AccordionItemButton"]')?.textContent.trim() || '';
        const contentElement = accordionItem.querySelector('[data-accordion-component="AccordionItemPanel"]');
        const contentRows = Array.from(contentElement.querySelectorAll('tr')).map(row => {
            const header = row.querySelector('th')?.textContent.trim() || '';
            const cell = row.querySelector('td')?.textContent.trim() || '';
            return `${header}: ${cell}`;
        });
        return [title, contentRows.join('<br>')];
    }

    // Extract Accordion items
    const accordionItems = Array.from(element.querySelectorAll('[data-accordion-component="AccordionItem"]'));
    const accordionData = accordionItems.map(extractAccordionItem);

    // Prepare table data
    const headerRow = ['Accordion'];
    const rows = accordionData.map(([title, content]) => [title, content]);

    const tableData = [headerRow, ...rows];

    // Create block table
    const blockTable = WebImporter.DOMUtils.createTable(tableData, document);

    // Replace the original element with the new block table
    element.replaceWith(blockTable);
}
/* global WebImporter */
export default function parse(element, { document }) {
    const headerRow = [document.createElement('strong')];
    headerRow[0].textContent = 'Accordion';

    const rows = Array.from(element.querySelectorAll('[data-accordion-component="AccordionItem"]')).map(item => {
        const title = item.querySelector('[data-accordion-component="AccordionItemButton"]').textContent.trim();
        const content = item.querySelector('[data-accordion-component="AccordionItemPanel"]');

        // Extract valid content and filter out empty paragraphs
        const contentElements = Array.from(content ? content.children : []).filter(el => {
            return el.textContent.trim() !== '' && el.textContent.trim() !== '\u00A0';
        });

        return [title, contentElements];
    });

    const tableData = [headerRow, ...rows];
    const blockTable = WebImporter.DOMUtils.createTable(tableData, document);

    element.replaceWith(blockTable);
}
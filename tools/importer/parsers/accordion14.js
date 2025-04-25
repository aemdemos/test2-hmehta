/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Accordion'];

  const rows = Array.from(element.querySelectorAll('[data-accordion-component="AccordionItem"]')).map((item) => {
    const title = item.querySelector('[data-accordion-component="AccordionItemButton"]').textContent.trim();
    const contentElement = item.querySelector('[data-accordion-component="AccordionItemPanel"]');

    // Handle edge case: missing content
    const content = contentElement ? contentElement.innerHTML.trim() : '';
    const contentDiv = document.createElement('div');
    contentDiv.innerHTML = content;

    return [title, contentDiv];
  });

  const tableData = [headerRow, ...rows];

  const blockTable = WebImporter.DOMUtils.createTable(tableData, document);

  element.replaceWith(blockTable);
}
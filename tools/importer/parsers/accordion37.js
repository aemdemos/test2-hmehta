/* global WebImporter */
export default function parse(element, { document }) {
  const cells = [];

  // Add header row
  const headerRow = ['Accordion'];
  cells.push(headerRow);

  // Process each accordion item
  const accordionItems = element.querySelectorAll('[data-accordion-component="AccordionItem"]');
  accordionItems.forEach((item) => {
    const titleElement = item.querySelector('[data-accordion-component="AccordionItemButton"]');
    const contentElement = item.querySelector('[data-accordion-component="AccordionItemPanel"]');

    const title = titleElement ? titleElement.textContent.trim() : '';
    const content = contentElement ? contentElement.innerHTML.trim() : '';

    cells.push([title, content]);
  });

  // Create table using WebImporter.DOMUtils.createTable
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new table
  element.replaceWith(table);
}
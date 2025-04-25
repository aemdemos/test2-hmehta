/* global WebImporter */
 export default function parse(element, { document }) {
  const headerRow = ['Accordion'];

  const rows = [];

  // Find all accordion items
  const accordionItems = element.querySelectorAll('[data-accordion-component="AccordionItem"]');

  accordionItems.forEach((item) => {
    const title = item.querySelector('[data-accordion-component="AccordionItemButton"]')?.textContent.trim();
    const content = item.querySelector('[data-accordion-component="AccordionItemPanel"]');

    if (title && content) {
      const contentElements = [];

      // Extract all child elements in the content
      Array.from(content.children).forEach((child) => {
        contentElements.push(child.cloneNode(true));
      });

      rows.push([title, contentElements]);
    }
  });

  const tableData = [headerRow, ...rows];

  const table = WebImporter.DOMUtils.createTable(tableData, document);

  element.replaceWith(table);
}
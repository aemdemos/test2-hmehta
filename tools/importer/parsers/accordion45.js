/* global WebImporter */
 export default function parse(element, { document }) {
  const headerRow = ['Accordion'];
  const rows = [];

  const accordionItems = element.querySelectorAll('[data-accordion-component="AccordionItem"]');

  accordionItems.forEach((item) => {
    const title = item.querySelector('[data-accordion-component="AccordionItemButton"]').textContent.trim();
    const contentElement = item.querySelector('[data-accordion-component="AccordionItemPanel"] div');
    const content = contentElement ? contentElement.cloneNode(true) : document.createTextNode('');

    rows.push([title, content]);
  });

  const tableData = [headerRow, ...rows];
  const block = WebImporter.DOMUtils.createTable(tableData, document);

  element.replaceWith(block);
}
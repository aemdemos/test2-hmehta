/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Accordion'];

  const rows = [];

  const accordionItems = element.querySelectorAll('[data-accordion-component="AccordionItem"]');

  accordionItems.forEach((item) => {
    const title = item.querySelector('[data-accordion-component="AccordionItemButton"]');
    const content = item.querySelector('[data-accordion-component="AccordionItemPanel"]');

    if (title && content) {
      const titleCell = document.createElement('div');
      titleCell.textContent = title.textContent.trim();

      const contentCell = document.createElement('div');
      contentCell.innerHTML = content.innerHTML.trim();

      rows.push([titleCell, contentCell]);
    }
  });

  const tableData = [headerRow, ...rows];
  const table = WebImporter.DOMUtils.createTable(tableData, document);

  element.replaceWith(table);
}
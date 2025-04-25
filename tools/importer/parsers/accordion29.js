/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Accordion'];
  const rows = [];

  const accordionItems = element.querySelectorAll('[data-accordion-component="AccordionItem"]');

  accordionItems.forEach(item => {
    const titleElem = item.querySelector('[data-accordion-component="AccordionItemButton"]');
    const contentElem = item.querySelector('[data-accordion-component="AccordionItemPanel"]');

    const title = titleElem ? titleElem.textContent.trim() : '';
    let content = '';

    if (contentElem) {
      content = contentElem.innerHTML.trim();
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = content;
      content = tempDiv.textContent.trim();
    }

    rows.push([title, content]);
  });

  const tableData = [headerRow, ...rows];
  const blockTable = WebImporter.DOMUtils.createTable(tableData, document);

  element.replaceWith(blockTable);
}
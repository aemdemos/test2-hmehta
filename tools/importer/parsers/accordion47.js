/* global WebImporter */
export default function parse(element, { document }) {
  const rows = [];

  // Add header row
  rows.push(['Accordion']);

  // Extract accordion items
  const accordionItems = element.querySelectorAll('.accordion__item');
  accordionItems.forEach((item) => {
    const title = item.querySelector('[data-accordion-component="AccordionItemButton"]').textContent.trim();

    const contentTable = item.querySelector('table.spec-table');
    let content = '';

    if (contentTable) {
      const tableRows = contentTable.querySelectorAll('tr');
      const tableContent = [];

      tableRows.forEach((tr) => {
        const rowHeader = tr.querySelector('th')?.textContent.trim();
        const rowData = tr.querySelector('td')?.textContent.trim();
        tableContent.push(`${rowHeader}: ${rowData}`);
      });

      content = tableContent.join(' | ');
    }

    rows.push([title, content]);
  });

  const blockTable = WebImporter.DOMUtils.createTable(rows, document);

  element.replaceWith(blockTable);
}
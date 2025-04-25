/* global WebImporter */
export default function parse(element, { document }) {
  const cells = [];

  // Header row (matches the example header exactly)
  const headerRow = ['Accordion'];
  cells.push(headerRow);

  // Extract accordion items dynamically
  const accordionItems = element.querySelectorAll('.accordion__item');
  accordionItems.forEach((item) => {
    const titleCell = item.querySelector('.accordion__button')?.textContent.trim() || '';

    const contentCell = [];
    const contentTable = item.querySelector('.spec-table');
    if (contentTable) {
      const rows = Array.from(contentTable.querySelectorAll('tr'));
      rows.forEach((row) => {
        const th = row.querySelector('th')?.textContent.trim() || '';
        const td = row.querySelector('td')?.textContent.trim() || '';

        // Create separate paragraph elements for each piece of content
        const paragraph = document.createElement('p');
        paragraph.textContent = `${th}: ${td}`;
        contentCell.push(paragraph);
      });
    }

    cells.push([titleCell, contentCell]);
  });

  // Create the block table dynamically
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the block table
  element.replaceWith(block);
}
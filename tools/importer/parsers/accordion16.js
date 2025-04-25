/* global WebImporter */
export default function parse(element, { document }) {
  const cells = [];

  // Add header row
  cells.push(['Accordion']);

  // Extract accordion items
  const accordionItems = element.querySelectorAll('[data-accordion-component="AccordionItem"]');

  accordionItems.forEach((item) => {
    const title = item.querySelector('[data-accordion-component="AccordionItemButton"]')?.textContent.trim();
    const content = item.querySelector('[data-accordion-component="AccordionItemPanel"]');

    let contentElements = [];
    if (content) {
      content.querySelectorAll('tr').forEach((row) => {
        const key = row.querySelector('th')?.textContent.trim();
        const value = row.querySelector('td')?.textContent.trim();
        if (key && value) {
          contentElements.push(`${key}: ${value}`);
        }
      });
    }

    // Add title and content as a new row in the table
    cells.push([title, contentElements.join('\n')]);
  });

  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block table
  element.replaceWith(block);
}
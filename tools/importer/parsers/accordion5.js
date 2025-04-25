/* global WebImporter */
export default function parse(element, { document }) {
  const cells = [];

  // Add the header row with block name
  cells.push(['Accordion']);

  // Select all accordion items within the element
  const accordionItems = element.querySelectorAll('[data-accordion-component="AccordionItem"]');

  accordionItems.forEach((item) => {
    const titleElement = item.querySelector('[data-accordion-component="AccordionItemButton"]');
    const contentElement = item.querySelector('[data-accordion-component="AccordionItemPanel"]');

    const title = titleElement ? titleElement.textContent.trim() : '';
    const content = contentElement ? contentElement.innerHTML.trim() : '';

    // Push title and content into the table
    cells.push([title, content]);
  });

  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block
  element.replaceWith(block);
}
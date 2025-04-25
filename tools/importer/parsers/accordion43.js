/* global WebImporter */
export default function parse(element, { document }) {
  // Extract the accordion items
  const accordionItems = Array.from(element.querySelectorAll('[data-accordion-component="AccordionItem"]'));

  // Prepare table rows
  const rows = accordionItems.map(item => {
    const titleElement = item.querySelector('[data-accordion-component="AccordionItemButton"]');
    const contentElement = item.querySelector('[data-accordion-component="AccordionItemPanel"]');

    const title = titleElement ? titleElement.textContent.trim() : '';
    const content = contentElement ? contentElement.innerHTML.trim() : '';

    return [title, content];
  });

  // Validate header row
  const headerRow = ['Accordion'];

  // Create the table with content
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    ...rows
  ], document);

  // Replace the original element with the newly created table
  element.replaceWith(table);
}
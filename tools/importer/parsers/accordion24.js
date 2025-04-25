/* global WebImporter */
export default function parse(element, { document }) {
  // Extract header information
  const headerRow = ['Accordion'];

  // Extract accordion items dynamically
  const accordions = [...element.querySelectorAll('[data-accordion-component="AccordionItem"]')];
  const rows = accordions.map((accordion) => {
    const titleElement = accordion.querySelector('[data-accordion-component="AccordionItemButton"]');
    const title = titleElement ? titleElement.textContent.trim() : 'Untitled';

    const contentElement = accordion.querySelector('[data-accordion-component="AccordionItemPanel"]');
    const content = contentElement ? contentElement.innerHTML.trim() : '<p>No content available</p>';

    return [title, document.createElement('div').innerHTML = content];
  });

  // Add an empty check for rows to handle edge cases
  const tableData = rows.length > 0 ? [headerRow, ...rows] : [headerRow, ['No data available']];

  // Create table block using WebImporter
  const block = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace element with the new block in the DOM
  element.replaceWith(block);
}
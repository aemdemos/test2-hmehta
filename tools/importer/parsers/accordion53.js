/* global WebImporter */
export default function parse(element, { document }) {
  const cells = [];

  // Add the header row
  const headerRow = ['Accordion'];
  cells.push(headerRow);

  // Fetch all accordion items
  const accordionItems = element.querySelectorAll('[data-accordion-component="AccordionItem"]');

  accordionItems.forEach((item) => {
    // Extract the title cell
    const titleCell = item.querySelector('[data-accordion-component="AccordionItemButton"]');
    const titleContent = titleCell ? titleCell.textContent.trim() : '';

    // Extract the content cell
    const contentCell = item.querySelector('[data-accordion-component="AccordionItemPanel"]');
    const parsedContent = [];

    // Parse rows inside the content cell
    const rows = contentCell?.querySelectorAll('tr') || [];
    rows.forEach((row) => {
      const cells = row.querySelectorAll('td, th');
      cells.forEach((cell) => {
        parsedContent.push(cell.textContent.trim());
      });
    });

    const content = parsedContent.length ? parsedContent.join(' ') : '';

    // Push extracted data as a single row into the table
    cells.push([titleContent, content]);
  });

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the block
  element.replaceWith(block);
}
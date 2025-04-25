/* global WebImporter */
export default function parse(element, { document }) {
  // Create the header row based on the example
  const headerRow = ['Accordion'];

  // Extract accordion items
  const accordionItems = element.querySelectorAll('[data-accordion-component="AccordionItem"]');

  // Create table rows for accordion block
  const rows = [headerRow];

  accordionItems.forEach(item => {
    const titleElement = item.querySelector('[data-accordion-component="AccordionItemButton"]');
    const title = titleElement ? titleElement.textContent.trim() : '';

    const contentElement = item.querySelector('[data-accordion-component="AccordionItemPanel"]');
    const contentElements = [];

    if (contentElement) {
      Array.from(contentElement.childNodes).forEach(child => {
        if (child.nodeType === 3) { // TEXT_NODE
          const textContent = child.textContent.trim();
          if (textContent) {
            contentElements.push(document.createTextNode(textContent));
          }
        } else if (child.nodeType === 1) { // ELEMENT_NODE
          // Recursively clean up inline styles within elements
          const clonedElement = child.cloneNode(true);
          clonedElement.querySelectorAll('[style]').forEach(el => el.removeAttribute('style'));
          contentElements.push(clonedElement);
        }
      });
    }

    rows.push([title, contentElements]);
  });

  // Create the block table
  const blockTable = WebImporter.DOMUtils.createTable(rows, document);

  // Replace element with the block table
  element.replaceWith(blockTable);
}
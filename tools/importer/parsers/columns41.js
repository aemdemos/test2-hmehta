/* global WebImporter */
export default function parse(element, { document }) {
  // Ensure proper content extraction
  const inputs = Array.from(element.querySelectorAll("input"));
  const dropdowns = Array.from(element.querySelectorAll("button"));

  // Extract dynamic content
  const cells = [
    ["Columns"], // Correct header row with exactly one column
    [
      inputs.concat(dropdowns).map(item => {
        const textElement = document.createElement('div');
        textElement.textContent = item.placeholder || item.querySelector('span')?.textContent || item.value || item.textContent || '';
        return textElement;
      })
    ]
  ];

  // Create the table block
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element
  element.replaceWith(block);
}
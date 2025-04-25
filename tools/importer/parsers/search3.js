/* global WebImporter */
export default function parse(element, { document }) {
  // Define the header row for the block table
  const headerRow = ['Search'];

  // Define the URL for the query index
  const queryIndexURL = 'https://main--helix-block-collection--adobe.hlx.page/block-collection/sample-search-data/query-index.json';

  // Create the table structure
  const cells = [
    headerRow,
    [document.createElement('a')],
  ];

  cells[1][0].textContent = queryIndexURL;
  cells[1][0].href = queryIndexURL;

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block table
  element.replaceWith(block);
}
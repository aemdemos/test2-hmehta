/* global WebImporter */
export default function parse(element, { document }) {
  // Extract relevant content from the HTML element
  const queryIndexUrl = element.querySelector('a')?.href || 'https://main--helix-block-collection--adobe.hlx.page/block-collection/sample-search-data/query-index.json';

  // Define the table structure
  const headerRow = ['Search'];
  const contentRow = [queryIndexUrl];

  // Create the block table
  const cells = [
    headerRow,
    contentRow,
  ];

  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block table
  element.replaceWith(blockTable);
}
/* global WebImporter */
export default function parse(element, { document }) {
  // Verify the input element and its structure
  if (!element) return;

  // Extract the iframe element containing the video
  const iframe = element.querySelector('iframe');
  if (!iframe || !iframe.src) return;

  // Get the video URL from the iframe's src attribute
  const videoUrl = iframe.src;

  // Create the block table structure
  const headerRow = ['Embed'];
  const contentRow = [videoUrl];
  const cells = [headerRow, contentRow];

  // Use the helper function to create the table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block table
  element.replaceWith(block);
}
/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Embed'];

  // Dynamically extract image and video link from the element
  const imageElement = element.querySelector('img');
  const videoLink = element.querySelector('a')?.href || ''; // Extract the video link dynamically

  // Create the video link element if a link exists
  const videoLinkElement = document.createElement('a');
  if (videoLink) {
    videoLinkElement.href = videoLink;
    videoLinkElement.textContent = videoLink;
  }

  // Combine the image and video link into a single cell
  const combinedCellContent = [];
  if (imageElement) {
    combinedCellContent.push(imageElement);
  }
  if (videoLink) {
    combinedCellContent.push(document.createElement('br')); // Add a line break between image and link
    combinedCellContent.push(videoLinkElement);
  }

  const cells = [
    headerRow,
    [combinedCellContent] // Ensure the second row contains only one column with combined content
  ];

  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block table
  element.replaceWith(block);
}
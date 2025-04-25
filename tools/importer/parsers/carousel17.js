/* global WebImporter */
export default function parse(element, { document }) {
  // Define the header row with block name
  const headerRow = ['Carousel'];

  // Extract slides from the carousel
  const slides = Array.from(element.querySelectorAll('.slick-slide')).map((slide) => {
    const img = slide.querySelector('img');
    const heading = slide.querySelector('h3');

    // Handle image extraction
    const imageElement = img ? document.createElement('img') : null;
    if (img) {
      imageElement.src = img.src;
      imageElement.alt = img.alt || ''; // Handle missing alt attribute gracefully
    }

    // Handle content extraction
    const content = [];
    if (heading) {
      const titleElement = document.createElement('h3');
      titleElement.textContent = heading.textContent;
      content.push(titleElement);
    }

    return [imageElement, content]; // Each row contains image & content
  });

  // Assemble the table data
  const tableData = [headerRow, ...slides];
  const blockTable = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element with the new block table
  element.replaceWith(blockTable);
}
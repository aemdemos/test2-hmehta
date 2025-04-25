/* global WebImporter */
export default function parse(element, { document }) {
  const cells = [];

  // Add the header for the Carousel block
  const headerRow = ['Carousel'];
  cells.push(headerRow);

  // Extract carousel slides
  const slides = element.querySelectorAll('.slick-slide');
  slides.forEach((slide) => {
    const image = slide.querySelector('img');
    const title = slide.querySelector('h3');

    // Ensure image exists before accessing src
    const imageElement = image ? document.createElement('img') : null;
    if (image) {
      imageElement.src = image.src;
    }

    // Ensure title exists before creating element
    const titleElement = title ? document.createElement('h3') : null;
    if (title) {
      titleElement.textContent = title.textContent;
    }

    const cellContent = [];
    if (titleElement) {
      cellContent.push(titleElement);
    }
    cells.push([imageElement, cellContent]);
  });

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the given element with the new block table
  element.replaceWith(block);
}
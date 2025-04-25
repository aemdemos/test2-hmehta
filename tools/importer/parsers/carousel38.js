/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Carousel'];
  const rows = [];

  // Locate the slides
  const slides = element.querySelectorAll('.slick-track > .slick-slide');

  slides.forEach((slide) => {
    const imageWrapper = slide.querySelector('.Slides__ImageWrapper-sc-trhqnk-1 img');
    
    if (imageWrapper) {
      const img = document.createElement('img');
      img.src = imageWrapper.src;
      img.alt = imageWrapper.alt;

      rows.push([img]);
    }
  });

  const cells = [headerRow, ...rows];
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace element with table
  element.replaceWith(table);
}
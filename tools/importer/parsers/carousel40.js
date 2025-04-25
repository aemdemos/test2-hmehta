/* global WebImporter */
export default function parse(element, { document }) {
    const headerRow = ['Carousel'];

    // Extract slides
    const slides = Array.from(element.querySelectorAll('.slick-slide')).map(slide => {
        const img = slide.querySelector('img');
        const imageElement = document.createElement('img');
        imageElement.src = img.src;

        // No title or description present in the HTML, handling as edge cases with empty strings
        const content = [];
        
        return [imageElement, content];
    });

    const cells = [headerRow, ...slides];

    // Create table
    const blockTable = WebImporter.DOMUtils.createTable(cells, document);

    // Replace element
    element.replaceWith(blockTable);
}
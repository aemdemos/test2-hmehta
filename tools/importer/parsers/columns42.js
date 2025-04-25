/* global WebImporter */
export default function parse(element, { document }) {
  const cells = [];

  // Add the header row for the block type
  cells.push(['Columns']);

  // Extract elements from the page
  const items = element.querySelectorAll('.VehicleRangestyles__DetailItemWrapper-sc-1cd4r4l-7');

  const row = [];
  items.forEach((item) => {
    const img = item.querySelector('img');
    const heading = item.querySelector('p.heading');
    const info = item.querySelector('.info');

    const cellContent = [];
    if (img) {
      const imageElement = document.createElement('img');
      imageElement.src = img.src;
      imageElement.alt = img.alt;
      cellContent.push(imageElement);
    }
    if (heading) {
      const headingElement = document.createElement('p');
      headingElement.textContent = heading.textContent;
      cellContent.push(headingElement);
    }
    if (info) {
      const infoElement = document.createElement('p');
      infoElement.textContent = info.textContent;
      cellContent.push(infoElement);
    }

    row.push(cellContent);
  });

  cells.push(row);

  // Create the table block
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new table
  element.replaceWith(table);
}
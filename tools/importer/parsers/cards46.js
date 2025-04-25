/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Cards'];

  const cardRows = Array.from(element.querySelectorAll('.CoreValuesstyles__CardWrapper-sc-wkko5b-2')).map((card) => {
    const img = card.querySelector('img');
    const heading = card.querySelector('.CoreValuesstyles__Heading-sc-wkko5b-5');
    const description = card.querySelector('.CoreValuesstyles__Description-sc-wkko5b-6');

    const imageElement = document.createElement('img');
    imageElement.src = img ? img.src : '';
    imageElement.alt = img ? img.alt : '';

    const contentWrapper = document.createElement('div');
    if (heading) {
      const headingElement = document.createElement('h3');
      headingElement.textContent = heading.textContent.trim();
      contentWrapper.appendChild(headingElement);
    }
    if (description) {
      const descriptionElement = document.createElement('p');
      descriptionElement.textContent = description.textContent.trim();
      contentWrapper.appendChild(descriptionElement);
    }

    return [imageElement, contentWrapper];
  });

  const tableData = [headerRow, ...cardRows];
  const blockTable = WebImporter.DOMUtils.createTable(tableData, document);

  element.replaceWith(blockTable);
}
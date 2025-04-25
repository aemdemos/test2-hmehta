/* global WebImporter */
export default function parse(element, { document }) {
  const cells = [];

  // Add the header row
  const headerRow = ['Hero'];
  cells.push(headerRow);

  // Validate and extract content dynamically
  const detailsWrapper = element.querySelectorAll('.SuperCarryFeaturesstyles__DetailItem-sc-twygap-9');

  const content = [];

  detailsWrapper.forEach(item => {
    const heading = item.querySelector('.heading')?.textContent.trim();
    const subHeading = item.querySelector('.sub-heading')?.textContent.trim();
    const listItems = Array.from(item.querySelectorAll('ul.list li')).map(li => li.textContent.trim());

    // Create section dynamically based on extracted content
    const section = document.createElement('div');

    if (heading) {
      const headingElem = document.createElement('h3');
      headingElem.textContent = heading;
      section.appendChild(headingElem);
    }

    if (subHeading) {
      const subHeadingElem = document.createElement('p');
      subHeadingElem.textContent = subHeading;
      section.appendChild(subHeadingElem);
    }

    if (listItems.length > 0) {
      const listElem = document.createElement('ul');
      listItems.forEach(listItem => {
        const listItemElem = document.createElement('li');
        listItemElem.textContent = listItem;
        listElem.appendChild(listItemElem);
      });
      section.appendChild(listElem);
    }

    const hr = document.createElement('hr');
    section.appendChild(hr); // Add horizontal rule to separate sections

    content.push(section);
  });

  cells.push([content]); // Add content as a single cell in second row

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block table
  element.replaceWith(block);
}
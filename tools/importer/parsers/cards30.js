/* global WebImporter */
export default function parse(element, { document }) {
  // Extract relevant content
  const rows = Array.from(element.querySelectorAll('.PragatiFeaturesstyles__ContentItemWrapper-sc-bbskim-5'));

  const headerRow = ['Cards'];
  const tableData = [headerRow];

  rows.forEach(row => {
    const imageWrapper = row.querySelector('.PragatiFeaturesstyles__IconWrapper-sc-bbskim-7 img');
    const image = document.createElement('img');
    image.src = imageWrapper?.src || ''; // Handle missing image
    image.alt = imageWrapper?.alt || 'Image'; // Handle missing alt text

    const titleElement = row.querySelector('.info-heading');
    const title = document.createElement('strong');
    title.textContent = titleElement?.textContent || 'No title'; // Handle missing title

    const descriptionElement = row.querySelector('.info-description');
    const description = document.createElement('p');
    description.textContent = descriptionElement?.textContent || ''; // Handle missing description

    const contentCell = [title, description];

    tableData.push([image, contentCell]);
  });

  // Create the table block
  const block = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element with the block
  element.replaceWith(block);
}
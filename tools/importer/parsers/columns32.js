/* global WebImporter */
export default function parse(element, { document }) {
  const rows = [];

  // Header row
  const headerRow = ['Columns'];
  rows.push(headerRow);

  // Safely attempt to extract the necessary elements
  const imageContainer = element.querySelector('.WhoWeArestyles__MapContainer-sc-1ad4yzq-3 img');
  const cards = element.querySelectorAll('.WhoWeArestyles__CardWrapper-sc-1ad4yzq-5');

  // Create image cell dynamically
  const imageCell = document.createElement('img');
  if (imageContainer) {
    imageCell.src = imageContainer.src;
    imageCell.alt = imageContainer.alt || '';
  } else {
    // Fallback: empty image cell
    imageCell.textContent = 'Image not available';
  }

  // Create content cell dynamically
  const contentCell = document.createElement('div');

  if (cards.length > 0) {
    cards.forEach((card) => {
      const cardBody = card.querySelector('.WhoWeArestyles__CardBody-sc-1ad4yzq-6');
      const numberLoader = cardBody?.querySelector('.number-loader');
      const cardText = cardBody?.querySelector('.WhoWeArestyles__CardTextWrapper-sc-1ad4yzq-7');

      if (numberLoader && cardText) {
        const itemWrapper = document.createElement('div');
        const number = document.createElement('span');
        number.textContent = numberLoader.textContent;

        const text = document.createElement('p');
        text.textContent = cardText.textContent;

        itemWrapper.appendChild(number);
        itemWrapper.appendChild(text);
        contentCell.appendChild(itemWrapper);
      }
    });
  } else {
    // Fallback: no cards found
    const fallbackMessage = document.createElement('p');
    fallbackMessage.textContent = 'Content not available';
    contentCell.appendChild(fallbackMessage);
  }

  // Handle the Explore More button and footer content dynamically
  const exploreButtonWrapper = element.querySelector('a[href="/about-us"]');
  const outletWrapper = element.querySelector('.WhoWeArestyles__OutletWrapper-sc-1ad4yzq-10');

  if (exploreButtonWrapper && outletWrapper) {
    const itemWrapper = document.createElement('div');

    const button = exploreButtonWrapper.querySelector('button');
    if (button) {
      const link = document.createElement('a');
      link.href = exploreButtonWrapper.href;
      link.textContent = button.textContent;
      itemWrapper.appendChild(link);
    }

    const outletText = outletWrapper.querySelector('p');
    const outletStats = outletWrapper.querySelector('div');
    if (outletStats && outletText) {
      const statsText = document.createElement('span');
      statsText.textContent = `${outletStats.textContent} ${outletText.textContent}`;
      itemWrapper.appendChild(statsText);
    }

    contentCell.appendChild(itemWrapper);
  }

  // Add the row with the image and content block
  rows.push([imageCell, contentCell]);

  // Replace the original element with the new block table
  const blockTable = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(blockTable);
}
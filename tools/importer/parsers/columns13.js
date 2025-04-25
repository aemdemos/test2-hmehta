/* global WebImporter */
export default function parse(element, { document }) {
  // Helper function to extract image and caption
  const extractCardData = (cardElement) => {
    const imgWrapper = cardElement.querySelector('.SuperCarryFeaturesstyles__ImgWrapper-sc-twygap-7');
    const img = imgWrapper.querySelector('img');
    const src = img.getAttribute('src');
    const alt = img.getAttribute('alt');

    return {
      imageElement: (() => {
        const image = document.createElement('img');
        image.src = src;
        image.alt = alt;
        return image;
      })(),
    };
  };

  // Extract card data
  const cards = Array.from(
    element.querySelectorAll('.SuperCarryFeaturesstyles__Card-sc-twygap-11')
  ).map(extractCardData);

  // Extract details
  const details = Array.from(
    element.querySelectorAll('.SuperCarryFeaturesstyles__DetailItem-sc-twygap-9')
  ).map((detailElement) => {
    const heading = detailElement.querySelector('.heading')?.textContent.trim() || '';
    const subHeading = detailElement
      .querySelector('.sub-heading')?.textContent.trim() || '';
    const listItems = Array.from(
      detailElement.querySelectorAll('ul.list li')
    ).map((li) => li.textContent.trim());

    return {
      heading,
      subHeading,
      listItems,
    };
  });

  // Extract disclaimer
  const disclaimer = element.querySelector(
    '.SuperCarryFeaturesstyles__DisclaimerWrapper-sc-twygap-16 p.disclaimer-text'
  )?.textContent.trim() || '';

  // Create structured table
  const headerRow = ['Columns'];
  const dataRows = cards.map((card, index) => {
    const detail = details[index] || { heading: '', subHeading: '', listItems: [] };
    const columnContent = [
      (() => {
        const heading = document.createElement('h3');
        heading.textContent = detail.heading;

        const subHeading = document.createElement('p');
        subHeading.textContent = detail.subHeading;

        const ul = document.createElement('ul');
        detail.listItems.forEach((item) => {
          const li = document.createElement('li');
          li.textContent = item;
          ul.appendChild(li);
        });

        return [heading, subHeading, ul];
      })(),
      card.imageElement,
    ];

    return columnContent;
  });

  // Add disclaimer row
  const disclaimerRow = [document.createElement('hr'), (() => {
    const disclaimerParagraph = document.createElement('p');
    disclaimerParagraph.textContent = disclaimer;
    return disclaimerParagraph;
  })()];

  const cells = [headerRow, ...dataRows, disclaimerRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace element with block
  element.replaceWith(block);
}
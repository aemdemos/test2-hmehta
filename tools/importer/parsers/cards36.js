/* global WebImporter */
export default function parse(element, { document }) {
  const cards = [];

  // Select all the slider wrappers
  const wrappers = element.querySelectorAll('.ChannelJourneystyles__ChannelSliderWrapper-sc-1c26h6l-10');

  wrappers.forEach(wrapper => {
    const year = wrapper.querySelector('.ChannelJourneystyles__Year-sc-1c26h6l-9')?.textContent.trim();

    const slides = wrapper.querySelectorAll('.ChannelJourneystyles__ChannelCardWrapper-sc-1c26h6l-2');
    slides.forEach(slide => {
      const imageWrapper = slide.querySelector('.ChannelJourneystyles__ImageWrapper-sc-1c26h6l-3 img');
      const img = document.createElement('img');
      img.src = imageWrapper?.src;
      img.alt = imageWrapper?.alt;

      const heading = slide.querySelector('.ChannelJourneystyles__CardHeading-sc-1c26h6l-6')?.textContent.trim();
      const body = slide.querySelector('.ChannelJourneystyles__CardBody-sc-1c26h6l-7')?.textContent.trim();

      const cardContent = [];
      if (heading) {
        const h = document.createElement('h3');
        h.textContent = heading;
        cardContent.push(h);
      }

      if (body) {
        const p = document.createElement('p');
        p.textContent = body;
        cardContent.push(p);
      }

      cards.push([img, cardContent]);
    });
  });

  // Add the header row
  const cells = [['Cards']];
  cells.push(...cards);

  const table = WebImporter.DOMUtils.createTable(cells, document);

  element.replaceWith(table);
}
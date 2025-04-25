/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Hero'];

  // Extract elements
  const image = document.createElement('img');
  const imgSrc = element.querySelector('img')?.src;
  if (imgSrc) {
    image.setAttribute('src', imgSrc);
    image.setAttribute('alt', 'Background Image');
  }

  const headingElement = element.querySelector('.BrandPageHeaderBannerstyles__HeaderContentWrapper-sc-1178i5s-1 h3') || element.querySelector('.VehicleCarouselstyles__ImageTextWrapper-sc-1enxgth-7 h3');
  const heading = document.createElement('h1');
  heading.textContent = headingElement?.textContent?.trim() || 'Tour H3';

  const subheadingElement = element.querySelector('.BrandPageHeaderBannerstyles__HeaderContentWrapper-sc-1178i5s-1 p') || element.querySelector('.VehicleCarouselstyles__ImageTextWrapper-sc-1enxgth-7 p');
  const subheading = document.createElement('p');
  subheading.textContent = subheadingElement?.textContent?.trim() || 'Drive your way to success with strong performance and economy';

  // Extract CTAs
  const ctaLinks = [];
  const ctaElements = element.querySelectorAll('.QuickActionsstyles__ActionButton-sc-16o1b8z-3');
  ctaElements.forEach((cta) => {
    const ctaText = cta.querySelector('.QuickActionsstyles__QAButtonTitle-sc-16o1b8z-6')?.textContent;
    const ctaHref = cta.href;
    if (ctaText && ctaHref) {
      const link = document.createElement('a');
      link.setAttribute('href', ctaHref);
      link.textContent = ctaText;
      ctaLinks.push(link);
    }
  });

  const contentRowElements = [image, heading, subheading, ...ctaLinks];

  // Create block table
  const cells = [
    headerRow, // Header row
    [contentRowElements] // Content row
  ];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element
  element.replaceWith(block);
}
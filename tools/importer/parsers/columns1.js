/* global WebImporter */

export default function parse(element, { document }) {
  const headerRow = ['Columns']; // Header row

  // Extract content from the current element dynamically
  const logoImg = element.querySelector('.logo-footer img');
  const logoImage = logoImg ? document.createElement('img') : null;
  if (logoImg) {
    logoImage.src = logoImg.src;
    logoImage.alt = logoImg.alt || 'Logo';
  }

  const socialIconsWrapper = element.querySelector('.social-icon-footer');
  const socialIcons = socialIconsWrapper
    ? Array.from(socialIconsWrapper.querySelectorAll('a')).map((link) => {
        const icon = link.querySelector('svg');
        const iconWrapper = document.createElement('div');
        if (icon) {
          iconWrapper.append(icon.cloneNode(true));
        }
        return iconWrapper;
      })
    : [];

  const tollFreeContainer = element.querySelector('.TollFreestyles__TollFreeContainer-sc-16vr7d3-0');
  const tollFreeImg = tollFreeContainer?.querySelector('img');
  const tollFreeNumber = tollFreeContainer?.querySelector('.TollFreestyles__TollFreeNumber-sc-16vr7d3-3 a');

  const tollFreeContent = [];
  if (tollFreeImg) {
    const tollFreeImageElement = document.createElement('img');
    tollFreeImageElement.src = tollFreeImg.src;
    tollFreeImageElement.alt = tollFreeImg.alt || 'Toll Free';
    tollFreeContent.push(tollFreeImageElement);
  }
  if (tollFreeNumber) {
    const tollFreeTextElement = document.createElement('p');
    tollFreeTextElement.textContent = `Call us at ${tollFreeNumber.textContent}`;
    tollFreeContent.push(tollFreeTextElement);
  }

  const footerLinks = element.querySelector('.CopyRightstyles__StyledUL-sc-nlksl4-1');
  const footerLinkItems = footerLinks
    ? Array.from(footerLinks.querySelectorAll('a')).map((link) => {
        const footerLinkElement = document.createElement('a');
        footerLinkElement.href = link.href;
        footerLinkElement.textContent = link.textContent;
        return footerLinkElement;
      })
    : ['No footer links available'];

  // Create table content dynamically
  const cells = [
    headerRow,
    [
      logoImage || document.createTextNode('No Logo Available'),
      socialIcons.length > 0 ? socialIcons : ['No social icons available'],
      tollFreeContent.length > 0 ? tollFreeContent : ['No toll-free information'],
      footerLinkItems,
    ],
  ];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element with the new block table
  element.replaceWith(block);
}
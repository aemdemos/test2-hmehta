/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Columns'];

  // Extracting relevant data dynamically from the provided HTML
  const logoLink = element.querySelector('.logo-img-link');
  const logoImage = logoLink?.querySelector('img');
  const logoContent = logoImage
    ? [logoImage.cloneNode(true), document.createTextNode('Maruti Suzuki')]
    : document.createTextNode('Logo missing');

  const socialLinks = element.querySelectorAll('.social-icons a');
  const socialIconsContent = Array.from(socialLinks).map((link) => {
    const icon = link.querySelector('svg');
    const iconContent = icon ? icon.cloneNode(true) : document.createTextNode('Icon missing');
    const linkContent = document.createElement('a');
    linkContent.href = link.href;
    linkContent.appendChild(iconContent);
    return linkContent;
  });

  const tollFreeContainer = element.querySelector('.TollFreestyles__TollFreeContainer-sc-16vr7d3-0');
  const tollFreeImage = tollFreeContainer?.querySelector('img');
  const tollFreeNumber = tollFreeContainer?.querySelector('.TollFreestyles__TollFreeNumber-sc-16vr7d3-3 a');
  const tollFreeContent = tollFreeImage && tollFreeNumber
    ? [tollFreeImage.cloneNode(true), document.createTextNode(tollFreeNumber.href)]
    : document.createTextNode('Toll Free data missing');

  const footerLinks = element.querySelectorAll('.Footerstyles__FooterContainer-sc-1bodkfa-2 a');
  const footerContent = footerLinks.length
    ? Array.from(footerLinks).map((link) => {
        const linkElement = document.createElement('a');
        linkElement.href = link.href;
        linkElement.textContent = link.href;
        return linkElement;
      })
    : [document.createTextNode('Footer links missing')];

  // Creating a structured array for the table
  const cells = [
    headerRow,
    [logoContent, socialIconsContent],
    [tollFreeContent, footerContent],
  ];

  // Creating a block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replacing the original element with the new block table
  element.replaceWith(block);
}
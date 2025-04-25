/* global WebImporter */
export default function parse(element, { document }) {
  // Fixing header row to match the example structure
  const headerRow = ['Columns'];

  // Extract logo section
  const logoWrapper = element.querySelector('.logo-footer .logo-img img');
  const logoImg = logoWrapper ? logoWrapper.cloneNode(true) : null;

  // Extract toll-free section and group content
  const tollFreeContainer = element.querySelector('.TollFreestyles__TollFreeContainer-sc-16vr7d3-0');
  const tollFreeImage = tollFreeContainer?.querySelector('img')?.cloneNode(true) || null;
  const tollFreeText = tollFreeContainer?.querySelector('.TollFreestyles__TollFreeText-sc-16vr7d3-2')?.textContent?.trim() || '';
  const tollFreeNumber = tollFreeContainer?.querySelector('.TollFreestyles__TollFreeNumber-sc-16vr7d3-3 a')?.cloneNode(true) || null;
  const tollFreeContent = document.createElement('div');
  if (tollFreeText) tollFreeContent.append(tollFreeText);
  if (tollFreeNumber) tollFreeContent.append(tollFreeNumber);

  // Extract footer items and group them into single cells
  const footerContainer = element.querySelector('.Footerstyles__FooterContainer-sc-1bodkfa-2');
  const footerItems = footerContainer ? Array.from(footerContainer.querySelectorAll('.Footerstyles__AccordionItem-sc-1bodkfa-3')).map(item => {
    const title = item.querySelector('.main-title')?.textContent?.trim() || '';
    const links = Array.from(item.querySelectorAll('a')).map(link => link.cloneNode(true));
    const groupedContent = document.createElement('div');
    if (title) groupedContent.append(title);
    links.forEach(link => groupedContent.append(link));
    return [groupedContent];
  }) : [];

  // Extract copyright section and group content
  const copyrightSection = element.querySelector('.CopyRightstyles__CRWrapper-sc-nlksl4-0');
  const copyrightText = copyrightSection?.querySelector('p')?.textContent?.trim() || '';
  const copyrightLinks = Array.from(copyrightSection?.querySelectorAll('a') || []).map(link => link.cloneNode(true));
  const copyrightContent = document.createElement('div');
  if (copyrightText) copyrightContent.append(copyrightText);
  copyrightLinks.forEach(link => copyrightContent.append(link));

  // Create the block table using WebImporter.DOMUtils.createTable
  const cells = [
    headerRow,
    [logoImg, tollFreeImage, tollFreeContent].filter(Boolean),
    ...footerItems,
    [copyrightContent]
  ];

  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block table
  element.replaceWith(block);
}
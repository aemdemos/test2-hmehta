/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Hero'];

  // Extract the logo image element
  const logoElement = element.querySelector('.logo-img img');
  const logoImageRow = logoElement ? [[logoElement.cloneNode(true)]] : [];

  // Extract the navigation links, ensuring no content is concatenated
  const navLinksRows = [...element.querySelectorAll('.HeaderLinksstyles__LinkWrapper-sc-1fpaws1-3 a')]
    .map((link) => {
      const anchor = document.createElement('a');
      anchor.href = link.href;
      anchor.textContent = link.textContent;
      return [[anchor]]; // Maintain separate rows for each link
    });

  // Combine rows for content
  const contentRows = logoImageRow.concat(navLinksRows.flat());

  // Create the table
  const cells = [headerRow, ...contentRows];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element
  element.replaceWith(block);
}
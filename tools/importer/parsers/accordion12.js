/* global WebImporter */
export default function parse(element, { document }) {
  // Extract the heading content
  const headerWrapper = element.querySelector('.Specificationsstyles__HeaderWrapper-sc-nnhcq1-2');
  const tagline = headerWrapper.querySelector('.Specificationsstyles__TagLineContainer-sc-nnhcq1-3 p').textContent.trim();
  const heading = headerWrapper.querySelector('.heading').textContent.trim();
  const subHeading = headerWrapper.querySelector('.sub-heading').textContent.trim();

  const tableWrapper = element.querySelector('.Specificationsstyles__TableWrapper-sc-nnhcq1-5');
  const mainTable = tableWrapper.querySelector('.main-table');

  // Extract the header row
  const headerRow = ['Accordion'];

  const rows = [];

  // Extract accordion content
  const accordionItems = mainTable.querySelectorAll('.accordion__item');
  accordionItems.forEach(item => {
    const title = item.querySelector('.accordion__button').textContent.trim();
    const content = [];

    const panel = item.querySelector('.accordion__panel');
    if (panel) {
      const panelTable = panel.querySelector('.spec-table');
      
      const panelRows = panelTable.querySelectorAll('tr');
      panelRows.forEach(panelRow => {
        const cells = panelRow.querySelectorAll('th, td');
        content.push(`${cells[0].textContent.trim()}: ${cells[1].textContent.trim()}`);
      });
    }

    rows.push([title, content.join('<br>')]);
  });

  // Create the block table
  const cells = [headerRow, ...rows];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block table
  element.replaceWith(block);
}
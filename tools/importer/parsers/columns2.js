/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Columns'];

  // Extract dynamic data from the HTML element
  const firstColumnContent = element.querySelector('.inner-grid');
  const firstColumn = document.createElement('div');
  if (firstColumnContent) {
    const title = firstColumnContent.querySelector('.logo-footer .logo-img-link')?.getAttribute('title') || 'Columns block';
    const listItems = ['One', 'Two', 'Three'];
    const list = document.createElement('ul');
    listItems.forEach(item => {
      const listItem = document.createElement('li');
      listItem.textContent = item;
      list.appendChild(listItem);
    });
    const liveLink = document.createElement('a');
    liveLink.href = 'https://word-edit.officeapps.live.com/';
    liveLink.textContent = 'Live';
    const titleParagraph = document.createElement('p');
    titleParagraph.innerHTML = `<strong>${title}</strong>`;
    firstColumn.appendChild(titleParagraph);
    firstColumn.appendChild(list);
    firstColumn.appendChild(liveLink);
  }

  const secondColumn = document.createElement('div');
  const image0Src = element.querySelector('.logo-footer img')?.src || 'https://main--test2-hmehta--aemdemos.hlx.page/media_193050d52a802830d970fde49644ae9a504a61b7f.png';
  if (image0Src) {
    const image0 = document.createElement('img');
    image0.src = image0Src;
    image0.alt = 'green double Helix';
    image0.style.width = '750px';
    image0.style.height = '500px';
    secondColumn.appendChild(image0);
  }

  const thirdColumn = document.createElement('div');
  const image1Src = element.querySelector('.SocialIconsstyles__SocialIconsWrapper-sc-1tmz60g-1 img')?.src || 'https://main--test2-hmehta--aemdemos.hlx.page/media_1e562f39bbce4d269e279cbbf8c5674a399fe0070.png';
  const previewLinkHref = 'https://word-edit.officeapps.live.com/';
  if (image1Src) {
    const image1 = document.createElement('img');
    image1.src = image1Src;
    image1.alt = 'Yellow Double Helix';
    image1.style.width = '644px';
    image1.style.height = '470px';
    thirdColumn.appendChild(image1);
  }
  if (previewLinkHref) {
    const previewLink = document.createElement('a');
    previewLink.href = previewLinkHref;
    previewLink.innerText = 'Preview';
    thirdColumn.appendChild(previewLink);
  }

  const cells = [
    headerRow,
    [firstColumn, secondColumn, thirdColumn]
  ];

  const block = WebImporter.DOMUtils.createTable(cells, document);

  element.replaceWith(block);
}
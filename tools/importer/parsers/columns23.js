/* global WebImporter */
 export default function parse(element, { document }) {
  const headerRow = ['Columns'];

  // Prepare cell content for the second row
  const column1Content = document.createElement('div');
  column1Content.innerHTML = '<p>Columns block</p><ul><li>One</li><li>Two</li><li>Three</li></ul><a href="https://word-edit.officeapps.live.com/" target="_blank">Live</a>';

  const column2Content = [];
  const greenImage = document.createElement('img');
  greenImage.src = 'https://main--test2-hmehta--aemdemos.hlx.page/media_193050d52a802830d970fde49644ae9a504a61b7f.png#width=750&height=500';
  greenImage.alt = 'green double Helix';
  column2Content.push(greenImage);

  // Prepare cell content for the third row
  const yellowImage = document.createElement('img');
  yellowImage.src = 'https://main--test2-hmehta--aemdemos.hlx.page/media_1e562f39bbce4d269e279cbbf8c5674a399fe0070.png#width=644&height=470';
  yellowImage.alt = 'Yellow Double Helix';
  const previewLink = document.createElement('a');
  previewLink.href = 'https://word-edit.officeapps.live.com/';
  previewLink.target = '_blank';
  previewLink.innerHTML = 'Preview';

  const column3Content = document.createElement('div');
  column3Content.innerHTML = '<p>Or you can just view the preview</p>';
  column3Content.append(previewLink);

  // Create table cells array
  const cells = [
    headerRow,
    [column1Content, column2Content],
    [yellowImage, column3Content]
  ];

  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  element.replaceWith(blockTable);
}
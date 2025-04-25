/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Columns'];

  // Extract dropdown content
  const dropdowns = Array.from(element.querySelectorAll('.Dropdownstyles__DropdownWrapper-sc-1aqqjyg-0 .Dropdownstyles__LabelText-sc-1aqqjyg-2')).map(dropdown => {
    // Create a list item for each dropdown
    const listItem = document.createElement('li');
    listItem.textContent = dropdown.textContent.trim();
    return listItem;
  });

  // Create an unordered list to hold dropdowns
  const dropdownList = document.createElement('ul');
  dropdowns.forEach(dropdown => dropdownList.appendChild(dropdown));

  // Extract pricing information
  const priceContainer = element.querySelector('.VariantPricingStripstyles__PriceTextWrapper-sc-1kiz4qv-4');
  const priceText = priceContainer.querySelector('strong')?.textContent.trim() || '';
  const priceNote = priceContainer.querySelector('p')?.textContent.trim() || '';

  const priceContent = document.createElement('div');
  if (priceText) {
    const priceElement = document.createElement('strong');
    priceElement.textContent = priceText;
    priceContent.appendChild(priceElement);
  }
  if (priceNote) {
    const noteElement = document.createElement('p');
    noteElement.textContent = priceNote;
    priceContent.appendChild(noteElement);
  }

  const cells = [
    headerRow,
    [dropdownList],
    [priceContent]
  ];

  const block = WebImporter.DOMUtils.createTable(cells, document);

  element.replaceWith(block);
}
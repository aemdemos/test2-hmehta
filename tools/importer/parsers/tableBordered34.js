/* global WebImporter */
export default function parse(element, { document }) {
  // Correct header row: single column with the block type
  const headerRow = ['Table (bordered)'];

  // Content rows with the data
  const contentRows = [
    ['Toadflax', 'Nuttallanthus D.A. Sutton', 'Scrophulariaceae'],
    [
      'Yellow Rabbitbrush',
      'Chrysothamnus viscidiflorus (Hook.) Nutt. ssp. puberulus (D.C. Eaton) H.M. Hall & Clem.',
      'Asteraceae',
    ],
    ['Great Lakes Dewberry', 'Rubus perspicuus L.H. Bailey', 'Rosaceae'],
    ['Pheasant\'s Eye', 'Adonis L.', 'Ranunculaceae'],
    ['Pholisma', 'Pholisma Nutt. ex Hook.', 'Lennoaceae'],
  ];

  // Combine header and content rows
  const rowsData = [headerRow, ...contentRows];

  // Create table using the helper function
  const table = WebImporter.DOMUtils.createTable(rowsData, document);

  // Replace the original element with the newly created table
  element.replaceWith(table);
}
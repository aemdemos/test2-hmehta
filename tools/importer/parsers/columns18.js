/* global WebImporter */
export default function parse(element, { document }) {
    // Create the header row for the table
    const headerRow = ['Columns'];

    // Extract the cards content from the HTML
    const cardElements = element.querySelectorAll('.PragatiBenefitsstyles__CardContainer-sc-18zx0sj-4');

    // Process each card and extract the relevant data
    const cardData = Array.from(cardElements).map((card) => {
        const img = card.querySelector('img');
        const imageElement = document.createElement('img');
        imageElement.src = img.src;
        imageElement.alt = img.alt;

        const title = card.querySelector('.PragatiBenefitsstyles__TextWrapper-sc-18zx0sj-7');
        const description = card.querySelector('.PragatiBenefitsstyles__Description-sc-18zx0sj-8');

        const textContent = document.createElement('div');
        if (title) {
            const titleElement = document.createElement('p');
            titleElement.textContent = title.textContent;
            textContent.appendChild(titleElement);
        }
        if (description) {
            const descElement = document.createElement('p');
            descElement.textContent = description.textContent;
            textContent.appendChild(descElement);
        }

        return [imageElement, textContent];
    });

    // Create the table rows
    const rows = [headerRow, ...cardData];

    // Generate the block table using WebImporter.DOMUtils.createTable
    const blockTable = WebImporter.DOMUtils.createTable(rows, document);

    // Replace the original element with the new block table
    element.replaceWith(blockTable);
}
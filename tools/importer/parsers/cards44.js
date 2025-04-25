/* global WebImporter */
export default function parse(element, { document }) {
    const cells = [];

    // Header row
    const headerRow = ['Cards'];
    cells.push(headerRow);

    // Extract card information
    const cardElements = element.querySelectorAll('.CoreValuesstyles__CardContainer-sc-wkko5b-1 > section');

    cardElements.forEach((card) => {
        // Image extraction
        const imageWrapper = card.querySelector('.Awardsstyles__ImageWrapper-sc-ec4ax9-2 img');
        let image = null;
        if (imageWrapper) {
            image = document.createElement('img');
            image.src = imageWrapper.getAttribute('src');
            image.alt = imageWrapper.getAttribute('alt') || '';
        }

        // Content extraction
        const contentWrapper = card.querySelector('.Awardsstyles__ContentWrapper-sc-ec4ax9-3');
        let textContent = document.createElement('div');

        if (contentWrapper) {
            const titleElement = contentWrapper.querySelector('.Awardsstyles__Heading-sc-ec4ax9-4');
            const descriptionElement = contentWrapper.querySelector('.Awardsstyles__ShortDescription-sc-ec4ax9-5');

            if (titleElement) {
                const title = document.createElement('strong');
                title.textContent = titleElement.textContent.trim();
                textContent.appendChild(title);
            }

            if (descriptionElement) {
                const description = document.createElement('p');
                description.textContent = descriptionElement.textContent.trim();
                textContent.appendChild(description);
            }
        }

        // Push row if valid content exists
        if (image || textContent.childNodes.length > 0) {
            cells.push([image, textContent]);
        }
    });

    const table = WebImporter.DOMUtils.createTable(cells, document);

    element.replaceWith(table);
}
/* global WebImporter */
export default function parse(element, { document }) {
    const headerRow = ['Cards'];

    const rows = Array.from(element.querySelectorAll('[data-index]')).map((slide) => {
        // Extract the image
        const img = slide.querySelector('img')?.cloneNode(true);

        // Extract the description
        const description = slide.querySelector(
            '.NewsArticlestyles__ArticleDescription-sc-g87a7o-7'
        )?.textContent?.trim() || '';

        // Extract the link
        const link = slide.querySelector('a')?.href;
        const linkElement = link 
            ? document.createElement('a') 
            : null;

        if (linkElement) {
            linkElement.href = link;
            linkElement.textContent = description;
        }

        const textContent = linkElement 
            ? [description, linkElement] 
            : [description];

        return [img, textContent];
    });

    const tableData = [headerRow, ...rows];

    // Create the block table
    const blockTable = WebImporter.DOMUtils.createTable(tableData, document);

    element.replaceWith(blockTable);
}
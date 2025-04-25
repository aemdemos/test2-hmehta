/* global WebImporter */
export default function parse(element, { document }) {
    // Validate element and document existence
    if (!element || !document) {
        throw new Error('Invalid input: element or document is missing');
    }

    // Extract the testimonial cards dynamically
    const testimonialCards = Array.from(element.querySelectorAll('.Testimonialstyles__Card-sc-1qfevss-3'));

    // Define the header row exactly as per example
    const headerRow = ['Carousel'];

    // Initialize content rows for the block table
    const contentRows = testimonialCards.map(card => {
        // Extract image dynamically
        const imageWrapper = card.querySelector('.Testimonialstyles__CardImage-sc-1qfevss-4 img');
        const image = document.createElement('img');
        image.src = imageWrapper ? imageWrapper.src : '';

        // Extract title (name) dynamically
        const titleWrapper = card.querySelector('.Testimonialstyles__CardName-sc-1qfevss-6');
        const title = document.createElement('h2');
        title.textContent = titleWrapper && titleWrapper.textContent.trim() ? titleWrapper.textContent.trim() : 'No Title';

        // Extract description dynamically
        const descriptionWrapper = card.querySelector('.Testimonialstyles__CardBody-sc-1qfevss-7 div');
        const description = document.createElement('p');
        description.textContent = descriptionWrapper && descriptionWrapper.textContent.trim() ? descriptionWrapper.textContent.trim() : 'No Description';

        // Combine all text content dynamically
        const textContent = document.createElement('div');
        textContent.appendChild(title);
        textContent.appendChild(description);

        return [image, textContent];
    });

    // Combine headerRow and contentRows into tableData
    const tableData = [headerRow, ...contentRows];

    // Create the block table using WebImporter.DOMUtils.createTable()
    const block = WebImporter.DOMUtils.createTable(tableData, document);

    // Ensure the element gets replaced dynamically
    element.replaceWith(block);
}
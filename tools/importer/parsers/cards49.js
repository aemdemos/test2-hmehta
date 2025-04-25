/* global WebImporter */
export default function parse(element, { document }) {
  // Define the header row exactly as specified in the example
  const headerRow = ['Cards'];

  // Extract rows dynamically from the element
  const rows = Array.from(element.querySelectorAll('.KnowMoreCommercialstyles__GridItemWrapper-sc-1e27g8n-7')).map((card) => {
    const image = card.querySelector('img');
    const imgElement = document.createElement('img');
    imgElement.src = image.src; // Dynamically extract the src
    imgElement.alt = image.alt; // Dynamically extract the alt text

    const textWrapper = card.querySelector('.KnowMoreCommercialstyles__PostTextWrapper-sc-1e27g8n-9');
    const title = textWrapper.querySelector('.KnowMoreCommercialstyles__PostTitle-sc-1e27g8n-10')?.textContent || ''; // Handle missing title
    const description = textWrapper.querySelector('.KnowMoreCommercialstyles__PostSubtitle-sc-1e27g8n-11 p')?.textContent || ''; // Handle missing description
    const ctaLink = textWrapper.querySelector('a');

    const content = [];
    if (title) {
      const titleElement = document.createElement('strong');
      titleElement.textContent = title; // Dynamically set the title text
      content.push(titleElement);
    }

    if (description) {
      const descriptionParagraph = document.createElement('p');
      descriptionParagraph.textContent = description; // Dynamically set the description text
      content.push(descriptionParagraph);
    }

    if (ctaLink) {
      const linkElement = document.createElement('a');
      linkElement.href = ctaLink.href; // Dynamically set the href
      linkElement.target = ctaLink.target; // Transfer the target attribute
      linkElement.rel = ctaLink.rel; // Transfer the rel attribute
      linkElement.textContent = ctaLink.textContent; // Dynamically set the text content
      content.push(linkElement);
    }

    return [imgElement, content];
  });

  // Create the table using the helper function
  const table = WebImporter.DOMUtils.createTable([headerRow, ...rows], document);

  // Replace the original element with the new table
  element.replaceWith(table);
}
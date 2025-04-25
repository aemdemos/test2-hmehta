/* global WebImporter */
export default function parse(element, { document }) {
    // Separate navigation links and vehicle details into distinct tables

    // Extract navigation links
    const navLinksWrapper = element.querySelector('.HeaderLinksstyles__NavigationWrapper-sc-1fpaws1-2');
    const navLinks = Array.from(navLinksWrapper.querySelectorAll('.HeaderLinksstyles__NavLinks-sc-1fpaws1-4 a')).map((link) => {
        const linkElement = document.createElement('a');
        linkElement.href = link.href;
        linkElement.textContent = link.textContent.trim();
        return [linkElement];
    });

    const navigationHeaderRow = ['Navigation'];
    const navigationTableData = [navigationHeaderRow, ...navLinks];
    const navigationTable = WebImporter.DOMUtils.createTable(navigationTableData, document);

    // Extract vehicle details
    const vehicleRangeWrapper = element.querySelector('.HeaderLinksstyles__SubmenuWrapper-sc-1fpaws1-5');
    const vehicleDetailsRows = [];

    if (vehicleRangeWrapper) {
        const vehicles = Array.from(vehicleRangeWrapper.querySelectorAll('.HeaderLinksstyles__VehicleItem-sc-1fpaws1-11'));
        vehicles.forEach((vehicle) => {
            const vehicleLink = vehicle.querySelector('a');

            const vehicleImage = vehicleLink.querySelector('img');
            const vehicleDesc = Array.from(vehicleLink.querySelectorAll('p')).map((p) => p.textContent.trim()).join('<br>');

            const exploreLink = vehicle.querySelector('.HeaderLinksstyles__VehiclesLinkButton-sc-1fpaws1-18');

            const imageCell = vehicleImage ? [vehicleImage.cloneNode(true)] : [];
            const detailCell = vehicleDesc;
            const exploreCell = exploreLink ? [exploreLink.cloneNode(true)] : [];

            vehicleDetailsRows.push([imageCell]);
            vehicleDetailsRows.push([detailCell]);
            vehicleDetailsRows.push([exploreCell]);
        });
    }

    const vehicleHeaderRow = ['Vehicles'];
    const vehicleTableData = [vehicleHeaderRow, ...vehicleDetailsRows];
    const vehicleTable = WebImporter.DOMUtils.createTable(vehicleTableData, document);

    // Replace the original element with individual tables
    const wrapperDiv = document.createElement('div');
    wrapperDiv.appendChild(navigationTable);
    wrapperDiv.appendChild(vehicleTable);
    
    element.replaceWith(wrapperDiv);
}
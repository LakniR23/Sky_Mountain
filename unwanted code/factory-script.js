// In your main listings page (factories listing)
function createPropertyCards() {
    const propertyListings = document.getElementById('property-listings');
    
    properties.forEach((property, index) => {
        // Create card HTML
        const propertyCard = document.createElement('div');
        propertyCard.className = 'property-card';
        propertyCard.setAttribute('data-index', index);
        
        // Use direct filename with numbering instead of URL parameter
        const targetPage = `insideFactory${index + 1}.html`;
        
        // Rest of your card creation code...
        propertyCard.innerHTML = `
            <!-- Card content -->
            <div class="buttons-container">
                <a href="${targetPage}" class="btn btn-primary view-details">View Details</a>
                <!-- Other buttons -->
            </div>
            <!-- More card content -->
        `;
        
        // Add event listener for card click
        propertyCard.addEventListener('click', (e) => {
            // Prevent action if clicking on interactive elements
            if (!e.target.closest('.property-share') && 
                !e.target.closest('.slider-nav') && 
                !e.target.closest('.btn-contact') &&
                !e.target.closest('.btn-primary') &&
                !e.target.closest('.btn-secondary')) {
                window.location.href = targetPage;
            }
        });
        
        // Add the card to the listings container
        propertyListings.appendChild(propertyCard);
    });
}
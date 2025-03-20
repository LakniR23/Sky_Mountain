// Function to create property cards
function createPropertyCards() {
    const propertyListings = document.getElementById('property-listings');
    
    properties.forEach((property, index) => {
        // Create card HTML
        const propertyCard = document.createElement('div');
        propertyCard.className = 'property-card';
        propertyCard.setAttribute('data-index', index);
        
        // For demo purposes, use a placeholder image if no images are available
        const imageSrc = property.images && property.images.length > 0 ? 
                         property.images[0] : 
                         '/api/placeholder/400/320';
        
        // Define the target HTML page for each property
        // First property goes to insideHouse1.html, second to insideHouse2.html, etc.
        const targetPage = `insideFactory${index + 1}.html`;
        
        propertyCard.innerHTML = `
            <div class="image-container">
                <div class="slider">
                    <img src="${imageSrc}" alt="${property.title}">
                    <div class="slider-nav prev">
                        <i class="fas fa-chevron-left"></i>
                    </div>
                    <div class="slider-nav next">
                        <i class="fas fa-chevron-right"></i>
                    </div>
                </div>
                <div class="property-share">
                    <i class="fas fa-share-alt"></i>
                </div>
            </div>
            <div class="property-details">
                <h5 class="property-title">${property.title}</h5>
                <p class="property-location">${property.location}</p>
                
                <div class="property-info">
                    <div class="info-row">
                        <span class="info-label">Used or New:</span>
                        <span class="info-value">${property.usedOrNew}</span>
                    </div>
                    <div class="info-row">
                        <span class="info-label">No. of units:</span>
                        <span class="info-value">${property.units}</span>
                    </div>
                    <div class="info-row">
                        <span class="info-label">Suitable for:</span>
                        <span class="info-value">${property.suitableForFactoryType}</span>
                    </div>
                </div>
                
                <div class="price-section">
                    <div class="price-label">Starting Price</div>
                    <div class="price-value">${property.startingPrice}</div>
                    <div class="price-usd">
                        <span class="usd-value">${property.priceUSD}</span>
                        <span class="usd-label">LISTED IN USD</span>
                    </div>
                </div>
                
                <div class="buttons-container">
                    <a href="${targetPage}" class="btn btn-primary view-details">View Details</a>
                    <a href="tel:${property.contactNumber}" class="btn btn-secondary btn-contact">
                        <i class="fas fa-phone"></i> ${property.contactNumber}
                    </a>
                </div>
            </div>
        `;
        
        propertyListings.appendChild(propertyCard);
        
        // Setup image slider functionality
        setupSlider(propertyCard, property.images || []);
        
        // Add event listener for card click (except for share button and slider)
        propertyCard.addEventListener('click', (e) => {
            // Prevent action if clicking on share or slider buttons or contact button
            if (!e.target.closest('.property-share') && 
                !e.target.closest('.slider-nav') && 
                !e.target.closest('.btn-contact') &&
                !e.target.closest('.btn-primary') &&
                !e.target.closest('.btn-secondary')) {
                window.location.href = targetPage;
            }
        });
    });
    
    // Setup share buttons
    setupShareButtons();
}

// Function to setup image slider
function setupSlider(card, images) {
    if (!images || images.length <= 1) {
        const sliderNav = card.querySelectorAll('.slider-nav');
        sliderNav.forEach(nav => nav.style.display = 'none');
        return; // No need for slider if there's only one image or no images
    }
    
    const slider = card.querySelector('.slider');
    const img = slider.querySelector('img');
    const prevBtn = card.querySelector('.slider-nav.prev');
    const nextBtn = card.querySelector('.slider-nav.next');
    
    let currentIndex = 0;
    
    // Update image source
    function updateImage() {
        // Use the actual image from the images array or fallback to placeholder
        img.src = images[currentIndex] || '/api/placeholder/400/320';
        img.setAttribute('alt', `Image ${currentIndex + 1}`);
    }
    
    // Previous button click
    prevBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        currentIndex = (currentIndex > 0) ? currentIndex - 1 : images.length - 1;
        updateImage();
    });
    
    // Next button click
    nextBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        currentIndex = (currentIndex < images.length - 1) ? currentIndex + 1 : 0;
        updateImage();
    });
}

// Function to handle the share button click
function setupShareButtons() {
    document.querySelectorAll('.property-share').forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            // Get the property card this button belongs to
            const propertyCard = this.closest('.property-card');
            const propertyTitle = propertyCard.querySelector('.property-title').textContent;
            
            // Implement your share functionality here
            // For example, you could open a modal or use the Web Share API
            if (navigator.share) {
                navigator.share({
                    title: propertyTitle,
                    text: `Check out this property: ${propertyTitle}`,
                    url: window.location.href,
                });
            } else {
                alert('Share functionality: ' + propertyTitle);
                // Here you could implement a custom share dialog
            }
        });
    });
}

// Note: Property data should be imported from houses.js

// Initialize the page
window.addEventListener('DOMContentLoaded', createPropertyCards);
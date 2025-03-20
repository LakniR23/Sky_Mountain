/**
 * This script handles the functionality for the property details page.
 * It is designed to be common across all property pages while pulling
 * specific data from the property-data.js file.
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize the property page with data from property-data.js
    initializePropertyPage();
    
    // Set up event listeners
    setupEventListeners();
});

/**
 * Initializes the property page with data from propertyData object
 */
function initializePropertyPage() {
    // Update page title
    document.title = `${propertyData.name} | Property Details`;
    
    // Populate property details
    document.getElementById('propertyName').textContent = propertyData.name;
    document.getElementById('propertyLocation').textContent = propertyData.location;
    document.getElementById('developmentType').textContent = propertyData.developmentType;
    document.getElementById('numberOfUnits').textContent = propertyData.numberOfUnits;
    document.getElementById('unitMix').textContent = propertyData.unitMix;
    document.getElementById('developer').textContent = propertyData.developer;
    document.getElementById('priceLocal').textContent = propertyData.priceLocal;
    document.getElementById('priceUSD').textContent = `${propertyData.priceUSD} | LISTED IN ${propertyData.listedCurrency}`;
    document.getElementById('phoneNumber').textContent = propertyData.phoneNumber;
    
    // Populate description
    document.getElementById('propertyDescription').innerHTML = propertyData.description;
    
    // Populate features
    const featuresList = document.getElementById('featuresList');
    propertyData.features.forEach(feature => {
        const li = document.createElement('li');
        li.textContent = feature;
        featuresList.appendChild(li);
    });
    
    // Load images into slider
    loadPropertyImages();
}

/**
 * Sets up event listeners for interactive elements on the page
 */
function setupEventListeners() {
    // Image slider navigation
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    prevBtn.addEventListener('click', () => {
        navigateSlider(-1);
    });
    
    nextBtn.addEventListener('click', () => {
        navigateSlider(1);
    });
    
    // View Details button
    const viewDetailsBtn = document.getElementById('viewDetailsBtn');
    viewDetailsBtn.addEventListener('click', () => {
        // This could scroll to the description section or open a modal
        const descriptionSection = document.querySelector('.property-description');
        descriptionSection.scrollIntoView({ behavior: 'smooth' });
    });
    
    // Schedule Viewing button
    const scheduleViewingBtn = document.getElementById('scheduleViewingBtn');
    scheduleViewingBtn.addEventListener('click', () => {
        // This could open a booking form or redirect to a scheduling page
        window.location.href = propertyData.contactFormUrl;
    });
    
    // Contact Phone button
    const contactPhone = document.getElementById('contactPhone');
    contactPhone.href = `tel:${propertyData.phoneNumber.replace(/\s+/g, '')}`;
    
    // Make Inquiry button
    const makeInquiryBtn = document.getElementById('makeInquiryBtn');
    makeInquiryBtn.addEventListener('click', () => {
        // This will redirect to the common inquiry form
        window.location.href = propertyData.inquiryFormUrl;
    });
    
    // Share button
    const shareBtn = document.querySelector('.share-btn');
    shareBtn.addEventListener('click', () => {
        // Check if the Web Share API is supported
        if (navigator.share) {
            navigator.share({
                title: propertyData.name,
                text: `Check out this property: ${propertyData.name} in ${propertyData.location}`,
                url: window.location.href
            })
            .catch(error => console.log('Error sharing:', error));
        } else {
            // Fallback for browsers that don't support the Web Share API
            // Could implement a custom share modal here
            alert('Share this property: ' + window.location.href);
        }
    });
}

/**
 * Loads property images into the slider
 */
function loadPropertyImages() {
    const sliderWrapper = document.getElementById('sliderWrapper');
    
    // Clear existing content
    sliderWrapper.innerHTML = '';
    
    // Add images to slider
    propertyData.images.forEach(imageSrc => {
        const img = document.createElement('img');
        img.src = imageSrc;
        img.alt = propertyData.name;
        sliderWrapper.appendChild(img);
    });
    
    // Initialize slider position
    currentSlide = 0;
    updateSliderPosition();
}

// Global slider variables
let currentSlide = 0;

/**
 * Navigates the slider in the specified direction
 * @param {number} direction - Direction to move (-1 for previous, 1 for next)
 */
function navigateSlider(direction) {
    const sliderWrapper = document.getElementById('sliderWrapper');
    const totalSlides = propertyData.images.length;
    
    currentSlide = (currentSlide + direction + totalSlides) % totalSlides;
    updateSliderPosition();
}

/**
 * Updates the slider position based on currentSlide
 */
function updateSliderPosition() {
    const sliderWrapper = document.getElementById('sliderWrapper');
    const slideWidth = sliderWrapper.clientWidth;
    
    sliderWrapper.style.transform = `translateX(-${currentSlide * slideWidth}px)`;
}

// Handle window resize to maintain correct slider position
window.addEventListener('resize', () => {
    updateSliderPosition();
});
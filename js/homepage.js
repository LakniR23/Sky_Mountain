// Image data
const sliderData = [
  { id: 1, image: "images/Properties/Shangrila.jpg", title: "Shangri-La Colombo", description: "A five-star luxury hotel featuring elegant rooms, fine dining, and stunning ocean views.", link: "shangrila.html" },
  { id: 2, image: "images/Properties/Altair.jpg", title: "Altair Colombo", description: "A striking twin-tower residential skyscraper with a unique slanted design and modern apartments.", link: "altair.html" },
  { id: 3, image: "images/Houses/Battaramulla/1.jpg", title: "Battaramulla Residence", description: "A spacious contemporary home with lush greenery, offering a peaceful suburban lifestyle.", link: "insideHouse1.html" },
  { id: 4, image: "images/Properties/Galle.jpg", title: "Galle Heritage Villa", description: "A beautifully restored colonial-style villa with antique wooden interiors and a private courtyard.", link: "galle-heritage.html" },
  { id: 5, image: "images/Properties/Weligama2.jpg", title: "Weligama Beachfront Villa", description: "A luxurious beachfront villa with direct access to golden sands and breathtaking ocean views.", link: "weligama-beachfront.html" },
  { id: 6, image: "images/Properties/Colombo.jpg", title: "Colombo Business Tower", description: "A modern high-rise commercial building with premium office spaces in the heart of the city.", link: "colombo-business.html" },
  { id: 7, image: "images/Properties/Kandy.jpg", title: "Kandy Hillside Bungalow", description: "A charming bungalow nestled in the hills, offering stunning views of lush tea plantations.", link: "kandy-hillside.html" },
  { id: 8, image: "images/Properties/Mawella.jpg", title: "Mawella Lakefront Property", description: "A serene lakefront estate with expansive gardens and private boat access.", link: "mawella-lakefront.html" },
  { id: 9, image: "images/Properties/Dondra.jpg", title: "Dondra Oceanfront Land", description: "A prime coastal land plot ideal for a luxury resort or private retreat.", link: "dondra-oceanfront.html" },
  { id: 10, image: "images/Properties/Gampola.jpg", title: "Gampola Mountain Retreat", description: "A secluded hilltop property offering breathtaking panoramic views and fresh mountain air.", link: "gampola-mountain.html" },
  { id: 11, image: "images/Properties/Weligama.jpg", title: "Weligama Surf Lodge", description: "A cozy boutique lodge designed for surfers, with easy access to the best waves in town.", link: "weligama-surf.html" },
  { id: 12, image: "images/Properties/Victoria.jpg", title: "Victoria Gulf", description: "A scenic land parcel with breathtaking views of Victoria Reservoir, perfect for a tranquil retreat or eco-friendly development.", link: "victoria-gulf.html" },
];

// Slider configuration
const itemsPerRow = 3; // Show only 3 images per row
const visibleItems = itemsPerRow; // 3 items visible at once
const totalItems = sliderData.length;
const totalSlides = Math.ceil(totalItems / visibleItems); // Adjust for 3 images per slide

// Elements
const sliderContent = document.getElementById('sliderContent');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const sliderDots = document.getElementById('sliderDots');

// State
let currentSlide = 0;
let autoSlideInterval;

// Initialize slider
function initSlider() {
  updateSlider();
  renderDots();
  startAutoSlide();

  // Event listeners
  prevBtn.addEventListener('click', goToPrevious);
  nextBtn.addEventListener('click', goToNext);
}

// Update the slider display
function updateSlider() {
  sliderContent.innerHTML = '';

  const row = document.createElement('div');
  row.className = 'slider-row';

  const startIndex = currentSlide * itemsPerRow;
  let itemsAdded = 0;

  for (let i = 0; i < itemsPerRow; i++) {
      const itemIndex = startIndex + i;
      if (itemIndex < totalItems) {
          row.appendChild(createCard(sliderData[itemIndex]));
          itemsAdded++;
      }
  }

  // If the last slide has fewer than 3 items, add placeholders
  while (itemsAdded < itemsPerRow) {
      const emptyDiv = document.createElement('div');
      emptyDiv.className = 'empty-card';
      row.appendChild(emptyDiv);
      itemsAdded++;
  }

  sliderContent.appendChild(row);
  updateDots();
  updateButtons();
}

// Create a card element
function createCard(item) {
  const card = document.createElement('div');
  card.className = 'card';
  card.setAttribute('data-link', item.link);
  card.innerHTML = `
      <img src="${item.image}" alt="${item.title}">
      <div class="card-content">
          <h3 class="card-title">${item.title}</h3>
          <p class="card-description">${item.description}</p>
      </div>
  `;
  
  // Add click event listener to the card
  card.addEventListener('click', function() {
    window.location.href = this.getAttribute('data-link');
  });
  
  // Add hover effect to indicate it's clickable
  card.style.cursor = 'pointer';
  
  return card;
}

// Render indicator dots
function renderDots() {
  sliderDots.innerHTML = ''; // Clear previous dots
  for (let i = 0; i < totalSlides; i++) {
    const dot = document.createElement('div');
    dot.className = 'dot';
    if (i === 0) dot.classList.add('active');

    dot.addEventListener('click', () => {
      currentSlide = i;
      updateSlider();
      resetAutoSlide();
    });

    sliderDots.appendChild(dot);
  }
}

// Update indicator dots
function updateDots() {
  const dots = document.querySelectorAll('.dot');
  dots.forEach((dot, index) => {
    dot.classList.toggle('active', index === currentSlide);
  });
}

// Update button states
function updateButtons() {
  prevBtn.disabled = currentSlide === 0;
  nextBtn.disabled = currentSlide === totalSlides - 1;

  prevBtn.style.opacity = prevBtn.disabled ? '0.5' : '1';
  prevBtn.style.cursor = prevBtn.disabled ? 'not-allowed' : 'pointer';

  nextBtn.style.opacity = nextBtn.disabled ? '0.5' : '1';
  nextBtn.style.cursor = nextBtn.disabled ? 'not-allowed' : 'pointer';
}

// Navigation functions
function goToPrevious() {
  if (currentSlide > 0) {
    currentSlide--;
    updateSlider();
    resetAutoSlide();
  }
}

function goToNext() {
  if (currentSlide < totalSlides - 1) {
    currentSlide++;
    updateSlider();
    resetAutoSlide();
  }
}

// Auto slide functionality
function startAutoSlide() {
  autoSlideInterval = setInterval(() => {
    if (currentSlide < totalSlides - 1) {
      currentSlide++;
    } else {
      currentSlide = 0;
    }
    updateSlider();
  }, 5000);
}

function resetAutoSlide() {
  clearInterval(autoSlideInterval);
  startAutoSlide();
}

// Initialize the slider when the document is ready
document.addEventListener('DOMContentLoaded', function() {
  // Check if slider elements exist
  if (sliderContent && prevBtn && nextBtn && sliderDots) {
    initSlider();
    console.log("Slider initialized successfully");
  } else {
    console.error("Slider elements not found on page:");
    console.error("sliderContent:", sliderContent);
    console.error("prevBtn:", prevBtn);
    console.error("nextBtn:", nextBtn);
    console.error("sliderDots:", sliderDots);
  }
});

let index = 0;
const images = document.querySelectorAll('.carousel-image');

function changeImage() {
    // Hide the current active image
    images[index].classList.remove('active');

    // Increment index and loop back to the start if necessary
    index++;
    if (index >= images.length) {
        index = 0;
    }

    // Show the next image
    images[index].classList.add('active');
}

// Set the interval for image change every 6 seconds
setInterval(changeImage, 5000); // Change image every 3 seconds (adjust timing as needed)
const profileForm = document.getElementById('profileForm');
const editBtn = document.getElementById('editBtn');
const saveBtn = document.getElementById('saveBtn');
const cancelBtn = document.getElementById('cancelBtn');
const photoLabel = document.getElementById('photoLabel');
const profilePhoto = document.getElementById('profilePhoto');
const formInputs = document.querySelectorAll('.form-control:not([readonly])');

// Store original values for cancel operation
const originalValues = {};
formInputs.forEach(input => {
    originalValues[input.id] = input.value;
});

// Preview uploaded image
profilePhoto.addEventListener('change', function(e) {
    if (e.target.files && e.target.files[0]) {
        const reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById('profile-preview').src = e.target.result;
        }
        reader.readAsDataURL(e.target.files[0]);
    }
});

// Edit button handler
editBtn.addEventListener('click', function() {
    // Enable form fields
    formInputs.forEach(input => {
        input.disabled = false;
    });
    profilePhoto.disabled = false;
    
    // Show the photo upload label
    photoLabel.style.display = 'flex';
    
    // Toggle buttons
    editBtn.style.display = 'none';
    saveBtn.style.display = 'inline-block';
    cancelBtn.style.display = 'inline-block';
});

// Cancel button handler
cancelBtn.addEventListener('click', function() {
    // Reset form to original values
    formInputs.forEach(input => {
        input.value = originalValues[input.id];
        input.disabled = true;
    });
    
    // Reset profile image
    document.getElementById('profile-preview').src = originalValues['profile-preview'] || '/api/placeholder/200/200';
    profilePhoto.disabled = true;
    
    // Hide the photo upload label
    photoLabel.style.display = 'none';
    
    // Toggle buttons back
    editBtn.style.display = 'inline-block';
    saveBtn.style.display = 'none';
    cancelBtn.style.display = 'none';
});

// Store original profile image
originalValues['profile-preview'] = document.getElementById('profile-preview').src;
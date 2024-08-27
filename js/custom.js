// Map
const body = document.body; 
document.addEventListener('DOMContentLoaded', function () {
    // Initialize the map
    var map = L.map('map', {
        center: [33.6844, 73.0479], // Set the initial coordinates [latitude, longitude]
        zoom: 13, // Set the initial zoom level
        zoomControl: false, // Disable the zoom controls
        minZoom: 13, // Set the minimum zoom level (same as initial zoom)
        maxZoom: 13, // Set the maximum zoom level (same as initial zoom)
        dragging: false, // Disable dragging
        scrollWheelZoom: false, // Disable scroll wheel zoom
        doubleClickZoom: false, // Disable double click zoom
        touchZoom: false // Disable touch zoom
    });

    // Add a tile layer to the map (e.g., OpenStreetMap tiles)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19
    }).addTo(map);

    // You can add markers or other layers here if needed
});


//Categories dropdown
document.addEventListener('DOMContentLoaded', function () {
    const customDropdownToggle = document.getElementById('customCategoriesDropdown');
    const customDropdownMenu = document.getElementById('customDropdownMenu');
    const customSubcategoryContainer = document.getElementById('customSubcategories');

    // Show/hide dropdown and add/remove overlay on click
    customDropdownToggle.addEventListener('click', function (event) {
        event.preventDefault();
        customDropdownMenu.style.display = customDropdownMenu.style.display === 'block' ? 'none' : 'block';
        body.classList.toggle('custom-overlay-active');
    });

    // Handle dropdown item click
    document.querySelectorAll('.custom-dropdown-item').forEach(item => {
        item.addEventListener('click', event => {
            event.preventDefault();
            const categoryName = event.target.getAttribute('data-category');
            const subcategories = {
                'Clothing & Accessories': ['Tops', 'Bottoms', 'Outerwear'],
                'Electronics': ['Phones', 'Laptops', 'Accessories'],
                // Add more subcategories as needed
            };

            if (customSubcategoryContainer.style.display === 'block' && document.getElementById('customSelectedCategory').textContent === categoryName) {
                customSubcategoryContainer.style.display = 'none';
                customDropdownMenu.style.width = '900px'; // Collapse width
            } else {
                document.getElementById('customSelectedCategory').textContent = categoryName;
                const subcategoryList = document.getElementById('customSubcategoryList');
                subcategoryList.innerHTML = '';
                if (subcategories[categoryName]) {
                    subcategories[categoryName].forEach(subcat => {
                        const li = document.createElement('li');
                        li.textContent = subcat;
                        subcategoryList.appendChild(li);
                    });
                }
                customSubcategoryContainer.style.display = 'block';
                customDropdownMenu.style.width = '1200px'; // Expand width
            }
        });
    });

    // Close dropdown and remove overlay when clicking outside
    document.addEventListener('click', function (event) {
        if (!customDropdownToggle.contains(event.target) && !customDropdownMenu.contains(event.target)) {
            customDropdownMenu.style.display = 'none';
            body.classList.remove('custom-overlay-active');
        }
    });

    // Prevent dropdown from closing when clicking inside
    customDropdownMenu.addEventListener('click', function (event) {
        event.stopPropagation();
    });
});


//search 
document.addEventListener('DOMContentLoaded', () => {
    const body = document.body;

    document.querySelectorAll('.input-group').forEach(group => {
        const input = group.querySelector('input');
        const clearButton = group.querySelector('.btn-clear');

        if (input && clearButton) {
            // Function to toggle clear button visibility and overlay
            function toggleClearButton() {
                if (input.value.length > 0) {
                    clearButton.classList.remove('d-none');
                    body.classList.add('custom-overlay-active');
                } else {
                    clearButton.classList.add('d-none');
                    body.classList.remove('custom-overlay-active');
                }
            }

            // Event listener for input typing
            input.addEventListener('input', toggleClearButton);

            // Event listener for button click to clear the input
            clearButton.addEventListener('click', () => {
                input.value = '';
                toggleClearButton(); // Hide button after clearing input
                input.focus(); // Optional: Focus back on the input
            });

            // Initial call to set the button visibility on page load
            toggleClearButton();
        } else {
            console.log('Input or clear button not found:', { input, clearButton });
        }
    });

    document.querySelectorAll('.btn-save').forEach(button => {
        button.addEventListener('click', () => {
            button.classList.toggle('active');
            const regularIcon = button.querySelector('.fa-regular');
            const solidIcon = button.querySelector('.fa-solid');
            regularIcon.classList.toggle('d-none');
            solidIcon.classList.toggle('d-none');
        });
    });

    // Handle click events on remove buttons
    document.querySelectorAll('.btn-remove').forEach(button => {
        button.addEventListener('click', (event) => {
            event.preventDefault();
            event.stopPropagation(); // Prevent the dropdown from closing
            const item = event.currentTarget.closest('.custom-dropdown-item');
            item.remove();
        });
    });

    // Handle click event on the settings icon
    document.getElementById('settings-icon').addEventListener('click', (event) => {
        event.preventDefault();
        window.location.href = 'settings.html';
    });

    // Prevent the dropdown from closing when clicking inside it
    document.getElementById('searchDropdownMenu').addEventListener('click', (event) => {
        event.stopPropagation();
    });

    // Keep dropdown open when clicking on the input field
    document.getElementById('searchInput').addEventListener('focus', () => {
        const searchDropdownMenu = document.getElementById('searchDropdownMenu');
        searchDropdownMenu.classList.add('show');
        body.classList.add('custom-overlay-active');
    });
});

// Search click
document.getElementById('searchInput').addEventListener('focus', function () {
    const searchDropdownMenu = document.getElementById('searchDropdownMenu');
    if (searchDropdownMenu.style.display === 'block') {
        searchDropdownMenu.style.display = 'none';
        body.classList.remove('custom-overlay-active');
    } else {
        searchDropdownMenu.style.display = 'block';
        body.classList.add('custom-overlay-active');
    }
});

// Close dropdown when clicking outside
document.addEventListener('click', function (event) {
    const searchDropdownMenu = document.getElementById('searchDropdownMenu');
    const searchInput = document.getElementById('searchInput');
    if (!searchInput.contains(event.target) && !searchDropdownMenu.contains(event.target)) {
        searchDropdownMenu.style.display = 'none';
        body.classList.remove('custom-overlay-active');
    }
});


//Location dropdown
document.addEventListener('DOMContentLoaded', function () {
    const locationInput = document.getElementById('locationInput');
    const locationDropdownMenu = document.getElementById('locationDropdownMenu');
    const clearButton = locationInput.nextElementSibling;
    const locationItems = document.querySelectorAll('.location-dropdown-item');

    // Function to toggle clear button visibility
    function toggleClearButton() {
        if (locationInput.value.length > 0) {
            clearButton.classList.remove('d-none');
            body.classList.add('custom-overlay-active');
        } else {
            clearButton.classList.add('d-none');
            body.classList.remove('custom-overlay-active');
        }
    }

    // Show dropdown and manage input field behavior on focus
    locationInput.addEventListener('focus', function () {
        locationDropdownMenu.classList.add('show');
        toggleClearButton();
        locationInput.classList.add('multiline');
    });

    // Hide dropdown and manage input field behavior on blur
    locationInput.addEventListener('blur', function () {
        setTimeout(() => {
            if (!locationDropdownMenu.contains(document.activeElement)) {
                locationDropdownMenu.classList.remove('show');
                locationInput.classList.remove('multiline');
            }
        }, 200);
    });

    // Toggle clear button on input change
    locationInput.addEventListener('input', function () {
        toggleClearButton();
    });

    // Clear input field on clear button click
    clearButton.addEventListener('click', function () {
        locationInput.value = '';
        toggleClearButton();
        locationInput.classList.remove('multiline');
        locationInput.focus();
    });

    // Handle location item click
    locationItems.forEach(item => {
        item.addEventListener('mousedown', function (event) {
            event.preventDefault();
            const locationText = item.querySelector('.search-text').innerText;
            locationInput.value = locationText;
            locationInput.focus();
            locationInput.classList.add('multiline');
            locationDropdownMenu.classList.add('show');
            toggleClearButton();
        });
    });

    // Prevent the dropdown from hiding when clicking inside it
    locationDropdownMenu.addEventListener('mousedown', function (event) {
        event.preventDefault();
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', function (event) {
        if (!locationInput.contains(event.target) && !locationDropdownMenu.contains(event.target)) {
            locationDropdownMenu.classList.remove('show');
        }
    });

    // Initial call to set the button visibility on page load
    toggleClearButton();
});

// Reports Dropdown 
document.addEventListener('DOMContentLoaded', function () {
    const reportsDropdown = document.getElementById('reportsDropdown');
    const reportsDropdownMenu = document.querySelector('.reports-dropdown-menu');

    // Show dropdown on click and toggle overlay
    reportsDropdown.addEventListener('click', function (event) {
        event.preventDefault();
        reportsDropdownMenu.classList.toggle('show');
        body.classList.toggle('custom-overlay-active');
    });

    // Close dropdown and remove overlay when clicking outside
    document.addEventListener('click', function (event) {
        if (!reportsDropdown.contains(event.target) && !reportsDropdownMenu.contains(event.target)) {
            reportsDropdownMenu.classList.remove('show');
            body.classList.remove('custom-overlay-active');
        }
    });

    // Prevent the dropdown from hiding when clicking inside it
    reportsDropdownMenu.addEventListener('click', function (event) {
        event.stopPropagation();
    });
});


// Language and Currency Dropdown 
document.addEventListener('DOMContentLoaded', function () {
    const languageCurrencyDropdown = document.getElementById('languageCurrencyDropdown');
    const languageCurrencyDropdownMenu = document.querySelector('.language-currency-dropdown-menu');
    const btnClose = languageCurrencyDropdownMenu.querySelector('.btn-close');
    const languageItems = document.querySelectorAll('.language-item');

    // Show dropdown on click
    languageCurrencyDropdown.addEventListener('click', function (event) {
        event.preventDefault();
        languageCurrencyDropdownMenu.classList.toggle('show');
        body.classList.toggle('custom-overlay-active');
    });

    // Close dropdown on close button click
    btnClose.addEventListener('click', function () {
        languageCurrencyDropdownMenu.classList.remove('show');
        body.classList.remove('custom-overlay-active');
    });

    // Close dropdown when clicking outside or on the globe icon
    document.addEventListener('click', function (event) {
        if (!languageCurrencyDropdown.contains(event.target) && !languageCurrencyDropdownMenu.contains(event.target)) {
            languageCurrencyDropdownMenu.classList.remove('show');
        }
    });

    // Prevent the dropdown from hiding when clicking inside it
    languageCurrencyDropdownMenu.addEventListener('click', function (event) {
        event.stopPropagation();
    });

    // Handle language item selection
    languageItems.forEach(item => {
        item.addEventListener('click', function () {
            // Remove 'selected' class from all items
            languageItems.forEach(i => i.classList.remove('selected'));
            // Add 'selected' class to clicked item
            item.classList.add('selected');
        });
    });
});


//Wishlist 
document.addEventListener('DOMContentLoaded', function () {
    const wishlistDropdown = document.getElementById('wishlistDropdown');
    const wishlistDropdownMenu = document.querySelector('.wishlist-dropdown-menu');
    const btnClose = wishlistDropdownMenu.querySelector('.wishlist-dropdown-header .btn-close');
    const removeButtons = wishlistDropdownMenu.querySelectorAll('.wishlist-item .btn-close');// Reference to the body element

    // Show dropdown and add overlay on click
    wishlistDropdown.addEventListener('click', function (event) {
        event.preventDefault();
        wishlistDropdownMenu.classList.toggle('show');
        body.classList.toggle('overlay-active');
    });

    // Close dropdown and remove overlay on close button click
    btnClose.addEventListener('click', function () {
        wishlistDropdownMenu.classList.remove('show');
        body.classList.remove('overlay-active');
    });

    // Close dropdown and remove overlay when clicking outside or on the heart icon
    document.addEventListener('click', function (event) {
        if (!wishlistDropdown.contains(event.target) && !wishlistDropdownMenu.contains(event.target)) {
            wishlistDropdownMenu.classList.remove('show');
            body.classList.remove('overlay-active');
        }
    });

    // Prevent the dropdown from hiding when clicking inside it
    wishlistDropdownMenu.addEventListener('click', function (event) {
        event.stopPropagation();
    });

    // Handle item removal
    removeButtons.forEach(button => {
        button.addEventListener('click', function (event) {
            event.stopPropagation();
            const item = button.closest('.wishlist-item');
            item.remove();
            updateBorders();
        });
    });

    // Function to update the borders dynamically
    function updateBorders() {
        const items = document.querySelectorAll('.wishlist-item');
        items.forEach((item, index) => {
            if (index === items.length - 1) {
                item.style.borderBottom = 'none';
            } else {
                item.style.borderBottom = '1px solid #ccc';
            }
        });
    }

    // Initial call to set the borders correctly
    updateBorders();
});


//Notifications dropdown 
document.addEventListener('DOMContentLoaded', function () {
    const notificationsDropdown = document.getElementById('notificationsDropdown');
    const notificationsDropdownMenu = document.querySelector('.notifications-dropdown-menu');
    const btnClose = notificationsDropdownMenu.querySelector('.notifications-dropdown-header .btn-close');
    const removeButtons = notificationsDropdownMenu.querySelectorAll('.notification-item .btn-close');
    const settingsLink = notificationsDropdownMenu.querySelector('.notifications-dropdown-header .settings-link');

    // Function to position the dropdown below the notification icon with top margin
    // Show dropdown on click
    notificationsDropdown.addEventListener('click', function (event) {
        event.preventDefault();
        notificationsDropdownMenu.classList.toggle('show');
        if (notificationsDropdownMenu.classList.contains('show')) {
            positionDropdown(); // Position the dropdown when it's shown
        }
    });

    // Close dropdown on close button click
    btnClose.addEventListener('click', function () {
        notificationsDropdownMenu.classList.remove('show');
    });

    // Close dropdown when clicking outside or on the bell icon
    document.addEventListener('click', function (event) {
        if (!notificationsDropdown.contains(event.target) && !notificationsDropdownMenu.contains(event.target)) {
            notificationsDropdownMenu.classList.remove('show');
        }
    });

    // Prevent the dropdown from hiding when clicking inside it
    notificationsDropdownMenu.addEventListener('click', function (event) {
        event.stopPropagation();
    });

    // Handle window resize to reposition the dropdown
    window.addEventListener('resize', function () {
        if (notificationsDropdownMenu.classList.contains('show')) {
            positionDropdown(); // Recalculate position on window resize
        }
    });

    // Handle item removal
    removeButtons.forEach(button => {
        button.addEventListener('click', function (event) {
            event.stopPropagation();
            const item = button.closest('.notification-item');
            item.remove();
        });
    });

    // Close dropdown when clicking on the settings link
    settingsLink.addEventListener('click', function (event) {
        event.preventDefault();
        notificationsDropdownMenu.classList.remove('show');
    });

    // Function to update the borders dynamically
    function updateBorders() {
        const items = document.querySelectorAll('.notification-item');
        items.forEach((item, index) => {
            if (index === items.length - 1) {
                item.style.borderBottom = 'none';
            } else {
                item.style.borderBottom = '1px solid #ccc';
            }
        });
    }

    // Initial call to set the borders correctly
    updateBorders();
});


//Inbox Dropdown 
document.addEventListener('DOMContentLoaded', function () {
    const inboxDropdown = document.getElementById('inboxDropdown');
    const inboxDropdownMenu = document.querySelector('.inbox-dropdown-menu');
    const btnClose = inboxDropdownMenu.querySelector('.inbox-dropdown-header .btn-close');
    const settingsLink = inboxDropdownMenu.querySelector('.inbox-dropdown-header .settings-link');

    // Show dropdown on click
    inboxDropdown.addEventListener('click', function (event) {
        event.preventDefault();
        inboxDropdownMenu.classList.toggle('show');
        if (inboxDropdownMenu.classList.contains('show')) {
            positionDropdown(); // Position the dropdown when it's shown
        }
    });

    // Close dropdown on close button click
    btnClose.addEventListener('click', function () {
        inboxDropdownMenu.classList.remove('show');
    });

    // Close dropdown when clicking outside or on the inbox icon
    document.addEventListener('click', function (event) {
        if (!inboxDropdown.contains(event.target) && !inboxDropdownMenu.contains(event.target)) {
            inboxDropdownMenu.classList.remove('show');
        }
    });

    // Prevent the dropdown from hiding when clicking inside it
    inboxDropdownMenu.addEventListener('click', function (event) {
        event.stopPropagation();
    });

    // Close dropdown when clicking on the settings link
    settingsLink.addEventListener('click', function (event) {
        event.preventDefault();
        inboxDropdownMenu.classList.remove('show');
    });

    // Function to update the borders dynamically
    function updateBorders() {
        const items = document.querySelectorAll('.inbox-item');
        items.forEach((item, index) => {
            if (index === items.length - 1) {
                item.style.borderBottom = 'none';
            } else {
                item.style.borderBottom = '1px solid #ccc';
            }
        });
    }

    // Initial call to set the borders correctly
    updateBorders();
});


// Account Dropdown
document.addEventListener("DOMContentLoaded", function () {
    const accountIcon = document.querySelector('.nav-link .account-icon');
    const accountDropdown = document.getElementById('accountDropdown');

    accountIcon.addEventListener('click', function (e) {
        e.preventDefault();
        accountDropdown.classList.toggle('show'); // Toggle the dropdown visibility

    });

    // Close the dropdown when clicking outside of it
    document.addEventListener('click', function (e) {
        if (!accountDropdown.contains(e.target) && !accountIcon.contains(e.target)) {
            accountDropdown.classList.remove('show');
        }
    });

    // Handle window resize
    window.addEventListener('resize', function () {
        if (accountDropdown.classList.contains('show')) {
            const iconRect = accountIcon.getBoundingClientRect();
            const dropdownWidth = accountDropdown.offsetWidth;
            const viewportWidth = window.innerWidth;

            let leftPosition = iconRect.left + window.scrollX - (dropdownWidth - accountIcon.offsetWidth) / 2;

            if (leftPosition + dropdownWidth > viewportWidth) {
                leftPosition = viewportWidth - dropdownWidth - 10;
            } else if (leftPosition < 10) {
                leftPosition = 10;
            }

            if (iconRect.left < 10) {
                leftPosition = iconRect.left + window.scrollX;
            }

            accountDropdown.style.top = `${iconRect.bottom + window.scrollY}px`;
            accountDropdown.style.left = `${leftPosition}px`;
        }
    });
});

//List View
document.addEventListener('DOMContentLoaded', function () {
    const mapViewBtn = document.getElementById('mapViewBtn');
    const mapSection = document.querySelector('.map-section');
    const listSection = document.querySelector('.list-section');
    let map; // Declare the map variable

    // Function to initialize the map only if it hasn't been initialized already
    function initializeMap() {
        if (!map) { // Check if map is not initialized
            map = L.map('map', {
                center: [33.6844, 73.0479], // Set the initial coordinates [latitude, longitude]
                zoom: 13, // Set the initial zoom level
                zoomControl: false // Disable the zoom controls
            });

            // Add a tile layer to the map (e.g., OpenStreetMap tiles)
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 19
            }).addTo(map);
        } else {
            map.invalidateSize(); // Recalculate the map size if it's already initialized
        }
    }

    // Toggle between Map View and List View
    mapViewBtn.addEventListener('click', function () {
        // Only apply this functionality if the screen width is less than 768px (mobile view)
        if (window.innerWidth < 768) {
            if (mapSection.classList.contains('d-none')) {
                // Show Map View
                mapSection.classList.remove('d-none');
                listSection.classList.add('d-none');
                mapViewBtn.innerHTML = '<i class="fas fa-list"></i> List View';
                initializeMap(); // Initialize or refresh the map
            } else {
                // Show List View
                mapSection.classList.add('d-none');
                listSection.classList.remove('d-none');
                mapViewBtn.innerHTML = '<i class="fas fa-map-marker-alt"></i> Map View';
            }
        }
    });
});

//Wishlist mobile
document.addEventListener('DOMContentLoaded', () => {
    const wishlistToggle = document.getElementById('wishlist-toggle');
    const wishlistMenu = document.getElementById('wishlist-menu');
    const closeMenu = document.getElementById('close-menu');
    const removeCardIcons = document.querySelectorAll('.remove-card');

    // Toggle the wishlist menu
    wishlistToggle.addEventListener('click', (e) => {
        e.preventDefault();
        wishlistMenu.classList.toggle('open-wishlist-menu');
    });

    // Close the wishlist menu
    closeMenu.addEventListener('click', () => {
        wishlistMenu.classList.remove('open-wishlist-menu');
    });

    // Remove a card from the wishlist
    removeCardIcons.forEach(icon => {
        icon.addEventListener('click', () => {
            icon.closest('.wishlist-card').remove();
        });
    });
});

//mobile-search 
function toggleCustomSection() {
    const section = document.getElementById('customFullScreenSection');
    section.style.display = section.style.display === 'none' || section.style.display === '' ? 'block' : 'none';
    const bottomNav = document.getElementById('bottom-nav');
    bottomNav.style.display = section.style.display === 'none' || section.style.display === '' ? 'flex' : 'none';
}
//OnClick Departments 
function openDepartmentsSection() {
    document.getElementById('departments-section').classList.add('show');
}

function closeDepartmentsSection() {
    document.getElementById('departments-section').classList.remove('show');
}

function goBack() {
    // Implement the functionality to go back to the previous section
    closeDepartmentsSection();
}
// Departments Sub-section
function openSubSection(department) {
    document.getElementById("subSection").style.display = "block";
    document.getElementById("selectedDepartment").innerText = department;
}

function closeSubSection() {
    document.getElementById("subSection").style.display = "none";
}

//sidebar 
document.querySelector('.navbar-toggler').addEventListener('click', function() {
    const navbarNav = document.querySelector('#sideBar');
    
    navbarNav.classList.add('show');
    body.classList.toggle('overlay-active');
});

function closeNav() {
    const navbarNav = document.querySelector('#sideBar');
    const bodyOverlay = document.querySelector('#bodyOverlay');
    
    navbarNav.classList.remove('show');
    body.classList.remove('overlay-active');
}

document.querySelector('#bodyOverlay').addEventListener('click', closeNav);

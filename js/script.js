/**
 * Attach click event listener to the dropdown header.
 * Toggles the visibility of the dropdown list when clicked.
 * Prevents the dropdown from closing when the header is clicked.
 */

// Close dropdown when clicking outside
$(document.body).click(function () {
    // Check if dropdown is currently open
    if (!($('#dropdown-header').next().hasClass('hide-dropdown'))) {
        // If open, hide the dropdown list
        $('.dropdown-list').addClass('hide-dropdown');
        $('.custom-dropdown').removeClass('active-dropdown');
    }
});

// Toggle dropdown visibility when header is clicked
$('#dropdown-header').click(function () {
    // Check if dropdown is currently closed
    if ($(this).next().hasClass('hide-dropdown')) {
        // If closed, show the dropdown list
        $('.dropdown-list').removeClass('hide-dropdown');
    } else {
        // If open, hide the dropdown list
        $('.dropdown-list').addClass('hide-dropdown');
    }
    $(this).parent('.custom-dropdown').toggleClass('active-dropdown');
});

// Prevent dropdown from closing when clicking on header
$("#dropdown-header").click(function (e) {
    // Stop event propagation to prevent closing
    e.stopPropagation();
});



//  =========== Function to update selected items in the corresponding section
function updateSelectedItems(selectId, targetId) {
    var selectedItems = $(selectId).val() || [];
    var targetContainer = $(targetId);

    // Clear the existing items in the target container
    targetContainer.empty();

    // Add selected items to the target container
    selectedItems.forEach(function (item) {
        var addedKeyword = $('<div class="added-keyword"><p class="mx-auto">' + item + '</p></div>');
        targetContainer.append(addedKeyword);
    });
}

// Update selected provinces when an item is selected or deselected
$('#provinces').on('changed.bs.select', function () {
    updateSelectedItems('#provinces', '#selectedProvinces');
});

// Update selected regions when an item is selected or deselected
$('#regions').on('changed.bs.select', function () {
    updateSelectedItems('#regions', '#selectedRegions');
});
// Update selected countries when an item is selected or deselected
$('#countrySelect').on('changed.bs.select', function () {
    updateSelectedItems('#countrySelect', '#selectedCountries');
});

// Function to delete selected item
function deleteSelectedItem(targetId, itemValue) {
    var targetContainer = $(targetId);

    // Remove the item from the target container
    targetContainer.find('div.added-keyword').each(function () {
        var currentItem = $(this);
        if (currentItem.find('p').text() === itemValue) {
            currentItem.remove();
        }
    });
}

// Event listener for delete button
$('.added-Keywords').on('click', '.delete_icon', function () {
    var selectedItemValue = $(this).siblings('p').text();

    // Delete item from selected provinces
    deleteSelectedItem('#selectedProvinces', selectedItemValue);

    // Delete item from selected regions
    deleteSelectedItem('#selectedRegions', selectedItemValue);

    deleteSelectedItem('#selectedCountries', selectedItemValue);
});

/**
 * Adds and removes the 'active' class on the label element corresponding to the input field
 * based on focus and input events.
 */
$('.form-field input').each(function () {
    $(this).on('focus', function () {
        $(this).siblings('label').addClass('active');
    });

    $(this).on('blur', function () {
        if ($(this).val().trim() === '') {
            $(this).siblings('label').removeClass('active');
        }
    });

    $(this).on('input', function () {
        $(this).siblings('label').addClass('active');


    });
});

// 
// Reusable function to handle text truncation with "Show More" and "Show Less"
function createTruncatedText(elementId, fullText, wordLimit) {
    // Get the container where the text will be displayed
    const textContainer = document.getElementById(elementId);

    // Get the truncated version of the text
    function truncateText(text, limit) {
        const words = text.split(" "); // Split text into words
        if (words.length <= limit) {
            return text; // If the word count is within the limit, return the full text
        }

        const truncated = words.slice(0, limit).join(" "); // Get the first `limit` words
        return `${truncated}...`; // Add ellipsis to indicate truncation
    }

    // Create the initial truncated text
    const truncatedText = truncateText(fullText, wordLimit);

    // Create a paragraph to hold the text
    const paragraph = document.createElement("p");
    paragraph.textContent = truncatedText;

    // Create the toggle button
    const toggleButton = document.createElement("button");
    toggleButton.classList.add("borderless-btn", "show-more-link");


    toggleButton.textContent = "Show More";
    paragraph.appendChild(toggleButton);
    textContainer.appendChild(paragraph);
    if (fullText.split(" ").length > wordLimit) {
        toggleButton.style.display = "inline";
    } else {
        toggleButton.style.display = "none";
    }
   
        // Append the toggle button without the edit button
        toggleButton.addEventListener("click", function () {
            if (paragraph.textContent.startsWith(truncatedText)) {
                paragraph.textContent = fullText;
                paragraph.appendChild(toggleButton);
                toggleButton.textContent = "Show Less";
            } else {
                paragraph.textContent = truncatedText;
                paragraph.appendChild(toggleButton);
                toggleButton.textContent = "Show More";
            }
        });
    
}

/**
 * Function to toggle message box visibility.
 * @param {Event} e - The event object.
 */
function toggleMessageBox(e) {
    e.stopPropagation();
    var target = $(this).data('info-target');
    var $messageBox = $('#' + target);
    if ($messageBox.hasClass('active')) {
        $messageBox.removeClass('active'); // If the message box is active, hide it
    } else {
        $('.message-box').removeClass('active'); // Hide all other message boxes
        $messageBox.addClass('active'); // Show the targeted message box
    }

}

$('.toggle-Info-Msg').click(toggleMessageBox);

$('.addedKeywords').on('click', '.toggle-Info-Msg', toggleMessageBox);


/**
 * Function to hide message box when clicking outside.
 * If the click target is not within the toggle-Info-Msg or message-box elements, 
 * the active class is removed from all message-box elements.
 * @param {Event} e - The click event.
 */
$(document).click(function (e) {
    if (!$(e.target).closest('.toggle-Info-Msg').length && !$(e.target).closest('.message-box').length) {
        $('.message-box').removeClass('active');
    }
});

/* ------ Function to hide a container when a specific element within it is clicked. ---- */
function hideContainerOnClick(containerSelector, closeButtonSelector) {
    // Attach a click event handler to the document
    $(containerSelector).on('click', closeButtonSelector, function () {
        // Hide the container when the close button is clicked
        $(containerSelector).hide();
    });
}


/**
 * Attach click event listener to delete icons.
 * Removes the parent container of the delete icon when clicked.
 */

$('#addedFiles').on('click', '.deleteFile', function () {
    // Find the parent container of the delete icon
    var fileInfoContainer = $(this).closest('.file-info');
    // Remove the parent container from the DOM
    fileInfoContainer.remove();
});
// ------------- Attach a change event listener to the checkboxes------------
$(".checkbox").change(function () {
    $(this).closest('.checkbox-container').toggleClass('checked');

});
$('#subBusinessCategories').on('click', '.checkbox', function () {
    $(this).closest('.checkbox-container').toggleClass('checked');

});
/**
 * Function to deselect custom radio buttons.
 * @param {NodeList} radios - The NodeList containing the radio buttons to deselect.
 */
function deselect_customRadios(radios) {
    radios.forEach(radio => {
        radio.classList.remove("selected");
        radio.querySelector('.radio-icon-active').classList.remove("selected");
    });
}
/**
 * Retrieves the selected value of a radio group.
 * @param {NodeList} radios - The NodeList of radio buttons in the group.
 * @returns {string|null} - The value of the selected radio button, or null if none is selected.
 */
function getSelectedValue(radios) {
    let selectedValue = null;
    radios.forEach(radio => {
        if (radio.classList.contains("selected")) {
            selectedValue = radio.getAttribute("data-value");
        }
    });
    return selectedValue;
}
document.addEventListener("DOMContentLoaded", function () {
    const customRadiosGroup1 = document.querySelectorAll(".category-radio-group");
    const customRadiosGroup2 = document.querySelectorAll(".service-area-radio-group");

    customRadiosGroup1.forEach(radio => {
        radio.addEventListener("click", function () {
            deselect_customRadios(customRadiosGroup1);
            radio.classList.add("selected");
            radio.querySelector('.radio-icon-active').classList.add("selected");
        });
    });

    customRadiosGroup2.forEach(radio => {
        radio.addEventListener("click", function () {
            deselect_customRadios(customRadiosGroup2);
            radio.classList.add("selected");
            radio.querySelector('.radio-icon-active').classList.add("selected");

        });
    });
});
/**
 * Retrieves the values of all checked checkboxes within a specified group.
 * @param {string} groupName - The name attribute value of the checkbox group.
 * @returns {Array} - An array containing the values of the checked checkboxes.
 */
function getCheckedCheckboxes(groupName) {
    var checkedCheckboxes = [];
    // Iterate over each checkbox group with the specified name
    $('input[type="checkbox"][name="' + groupName + '"]').each(function () {
        // Check if the current checkbox is checked
        if ($(this).prop('checked')) {
            // If checked, add its value to the array
            checkedCheckboxes.push($(this).val());
        }
    });

    // Return the array containing the values of the checked checkboxes
    return checkedCheckboxes;
}

/**
 * Initializes clear icon functionality for input fields.
 * @param {string} inputSelector - The selector for the input field.
 * @param {string} clearIconSelector - The selector for the clear icon.
 */
function initializeClearIcon(inputSelector, clearIconSelector) {
    var $searchInput = $(inputSelector);
    var $clearIcon = $(clearIconSelector);

    // Show/hide clear icon based on input value
    $searchInput.on('input', function () {
        if ($(this).val().trim() !== '') {
            $clearIcon.css('display', 'block');
        } else {
            $clearIcon.css('display', 'none');
        }
    });

    // Clear input value when clear icon is clicked
    $clearIcon.on('click', function () {
        $searchInput.val('');
        $clearIcon.css('display', 'none');
        $searchInput.siblings('label').removeClass('active');
    });
}


/**
 * Validates an email address.
 * @param {string} email - The email address to validate.
 * @returns {boolean} - True if the email address is valid, otherwise false.
 */
function validateEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
}


/**
 * Validates a phone number.
 * @param {string} phoneValue - The phone number to validate.
 * @returns {boolean} - True if the phone number is valid, otherwise false.
 */
function validatePhone(phoneValue) {

    // Check if the phone number contains any alphabetic characters
    if (/[a-zA-Z]/.test(phoneValue)) {
        return false;
    } else if (!(iti.isValidNumberPrecise())) {
        // If the phone number is not valid according to ( International Telephone Input)
        return false;
    }

    // If the phone number passes all checks, return true indicating it's valid
    return true;
}

/**
 * Counts the number of words in the provided text and checks if it falls within specified limits.
 * @param {string} text - The text to count words from.
 * @param {number} [minCount] - Minimum allowed word count (optional, defaults to undefined).
 * @param {number} [maxCount] - Maximum allowed word count (optional, defaults to undefined).
 * @returns {object} - An object containing word count information including wordCount, exceededWords, maxWords, and minWords.
 */
function countWords(text, minCount, maxCount) {
    minCount = minCount;
    maxCount = maxCount;
    var wordCount = text.trim().split(/\s+/).length;
    var exceededWords = Math.max(0, wordCount - maxCount);

    return {
        wordCount: wordCount,
        exceededWords: exceededWords,
        maxWords: maxCount,
        minWords: minCount
    };
}

/**
 * Applies a mask to the specified input field to ensure proper formatting for dates.
 * @param {string} inputSelector - The selector for the input field to apply the mask to.
 * @param {string} maskFormat - The mask format to apply to the input field.
 */
function applyDateMask(inputSelector, maskFormat) {
    $(inputSelector).mask(maskFormat, { placeholder: "dd / mm / yyyy" });
}

// ---------- -----------------
// Media Gallery --------------
// ----------------------------

// Define limits for different types of media files
const filelimits = {
    logo: 1,
    photos: Infinity, // Unlimited
    productImages: 5
};

var addedFileCount; // Counter to keep track of the number of selected files
var selectedImages = {}; // Object to store data of selected images
function getSelctedMediaFiles() {
    return selectedImages;
}
// Function to handle modal trigger
$('#galleryModal').on('show.bs.modal', function (event) {
    const button = $(event.relatedTarget);
    const type = button.data('type'); // Get the type of media (logo, photos, productImages)
    const limit = filelimits[type];
    $(this).find('.add-selected-media-btn').attr('data-type', type);
    // Update the data-fileLimit attribute with the new value
    $('#limitIndicator').data('fileLimit', limit);
    // Disable video files if the data-type is 'logo'
    if (type === 'logo') {
        $(this).find('.media-container[data-format="video"]').addClass('disabled');
    } else {
        $(this).find('.media-container[data-format="video"]').removeClass('disabled');
    }

    // Check if any file is selected and enable/disable add media button accordingly
    var selectedFiles = $(this).find('.media-container.selected').length;
    if (selectedFiles > 0) {
        $(this).find('.add-selected-media-btn').prop('disabled', false);
    } else {
        $(this).find('.add-selected-media-btn').prop('disabled', true);
    }
});

// Function to deselect an image
function deselectMedia(id) {
    addedFileCount--;
    // Remove the image from the selectedImages object
    delete selectedImages[id];
    // Remove the media-preview element from the frontend
    $('#selectedMediaPreviews #' + id).remove();

    // Access the parent container of the deselected image using data-id attribute
    var parentImageContainer = $('.media-container[data-id="' + id + '"]');
    parentImageContainer.find('.image-checkbox').css('display', 'none');
    // Remove class 'selected' 
    parentImageContainer.removeClass('selected');

    // Count the number of selected images
    var numberOfSelectedImages = Object.keys(selectedImages).length;
    $('.noOfSelectedMediaFiles').text(numberOfSelectedImages);
}

// Click event handler for image selection
$('.image-clickable').each(function (index) {
    $(this).click(function () {
        addedFileCount = $('#selectedMediaPreviews .media-preview').length;
        // Get the data attributes of the parent container
        var id = $(this).closest('.media-container').data('id');
        var name = $(this).closest('.media-container').data('name');
        var size = $(this).closest('.media-container').data('size');
        var dimensions = $(this).closest('.media-container').data('dimensions');
        var src = $(this).attr('src');
        var mediaType = $(this).prop('tagName');
        var fileLimit = parseInt($('#limitIndicator').data('fileLimit'));

        // Check if the media is a video or image
        if ($(this).prop('tagName') === 'VIDEO') {
            src = $(this).find('source').attr('src'); // Extract src from source tag
        }

        if (fileLimit === 1 && addedFileCount === 1 && $(this).closest('.media-container').hasClass('selected')) {
            // Do not deselect the image if it's already selected
            var previousSelectionId = Object.keys(selectedImages)[0];
            deselectMedia(previousSelectionId);
            return;
        } else if (fileLimit === 1 && addedFileCount === 1) {
            // Deselect the previously selected image
            var previousSelectionId = Object.keys(selectedImages)[0];
            deselectMedia(previousSelectionId);
        }
        // Create an object with image details
        var mediaDetails = {
            id: id,
            name: name,
            size: size,
            dimensions: dimensions,
            src: src,
            mediaType: mediaType
        };

        // Toggle visibility of checkbox when image is clicked
        if ($('.image-checkbox').eq(index).css('display') === 'block') {
            // If already selected, deselect the image
            deselectMedia(id);
            checkIfImageSelected();
        } else {

            // Call the function to add the image preview
            if (isNaN(fileLimit)) {
                appendMediaPreviewAndStore(mediaDetails, index);
                checkIfImageSelected();
                return;
            }
            if (addedFileCount < fileLimit) {
                addedFileCount++;
                appendMediaPreviewAndStore(mediaDetails, index);
                checkIfImageSelected();

            } else {
                // Apply thunder animation to indicate limit exceeded
                $(this).closest('.media-container').addClass('thunder-animation');
                setTimeout(() => {
                    $(this).closest('.media-container').removeClass('thunder-animation');
                }, 500);

                // Display limit exceeded error message
                $('#mediaAlert').html(`<div class="alert alert-danger" role="alert">
                    <span class="icon fa-solid fa-circle-exclamation"></span>
                    You can select up to ${fileLimit} files.
                </div>`);
                // Remove the error message after 3 seconds
                setTimeout(() => {
                    $('#mediaAlert').html('');
                }, 3000);
            }
        }

    });
});

// Function to check if any image is selected
function checkIfImageSelected() {
    var anyImageSelected = $('#galleryModal .media-container.selected').length > 0;
    if (anyImageSelected) {
        $('.add-selected-media-btn').prop('disabled', false); // Enable submit button
    } else {
        $('.add-selected-media-btn').prop('disabled', true); // Disable submit button
    }
}
// Click event handler for deselect button
$('#selectedMediaPreviews').on('click', '.deselect-btn', function () {
    // Find the parent media-preview element
    var parentMediaPreview = $(this).closest('.media-preview');
    // Get the data-id attribute of the parent media-preview element
    var mediaPreviewId = parentMediaPreview.attr('id');

    // Call the deselectMedia function
    deselectMedia(mediaPreviewId);
});

// Click event handler for deselecting images from the gallery
$('.gallery-media ').on('click', '.image-checkbox', function () {
    // Get the parent container of .image-checkbox
    var parentContainer = $(this).closest('.media-container');
    var mediaPreviewId = parentContainer.data('id');

    // Deselect the image
    deselectMedia(mediaPreviewId);
});


// Function to add image preview
function appendMediaPreviewAndStore(mediaDetails, index) {
    // Extract image details
    var id = mediaDetails.id;
    var name = mediaDetails.name;
    var size = mediaDetails.size;
    var dimensions = mediaDetails.dimensions;
    var src = mediaDetails.src;
    var mediaType = mediaDetails.mediaType;

    // Create HTML for the media preview
    var mediaPreviewHTML = `<div class="media-preview" id="${id}"> <div class="media-preview-body">`;
    mediaPreviewHTML += ` <button class="deselect-btn borderless-btn p-0 m-0"><i class="fa-solid fa-circle-xmark "></i></button>`;

    // Check if the media is a video or image
    if (mediaType === 'VIDEO') {
        mediaPreviewHTML += `<video controls><source src="${src}" type="video/mp4">Your browser does not support the video tag.</video>`;
    } else {
        mediaPreviewHTML += `<img src="${src}" alt="${name}">`;
    }

    // Add name and size information
    mediaPreviewHTML += `<p class="name mt-2">${name}</p>
                         <p class="size mb-0">${size}</p>
                         <p class="size image-dimensions mb-1 mt-0">${dimensions}</p> </div>`;

    // Add buttons for additional actions (e.g., crop, delete)
    mediaPreviewHTML += `<div class="media-preview-footer"><button class="edit-image borderless-btn text-black " onclick="editMedia(this);"><i class="fa-regular fa-pen-to-square edit-icon"></i>Edit</button>
                         <button class="delete-image borderless-btn deleteMedia text-black " onclick="deleteMedia(this);"><i class="fa-regular fa-trash-can delete-icon"></i>Delete </button> </div>
                        </div>`;

    // Append the media preview to the selectedMediaPreviews container
    $('#selectedMediaPreviews').prepend(mediaPreviewHTML);

    // Add data to the selectedImages object
    selectedImages[id] = { id: id, name: name, size: size, src: src };

    // Access the parent container of the deselected image using data-id attribute
    var parentImageContainer = $('.media-container[data-id="' + id + '"]');

    // Display the checkbox for the corresponding image
    parentImageContainer.find('.image-checkbox').css('display', 'block')
    // $('.image-checkbox').eq(index).css('display', 'block');



    // Add 'selected' class to indicate that the image is selected
    parentImageContainer.addClass('selected');

    // Count the number of selected images and update the display
    var numberOfSelectedImages = Object.keys(selectedImages).length;
    $('.noOfSelectedMediaFiles').text(numberOfSelectedImages);

}


/**
Deletes a media file from the frontend and backend.
@param {HTMLElement} element - The element triggering the deletion (e.g., delete button).
*/
function deleteMedia(element) {
    // Comment for Dip (gallery): This function is responsible for permanently deleting a media file from the system.
    // It should be triggered when a user decides to delete a media file from the frontend interface.
    // The backend logic to handle the deletion should be implemented here.

    // Extract the ID of the media file to be deleted from the frontend
    var id = $(element).closest('.media-preview').attr('id');

    // Delete the media file from the gallery display on the frontend
    $('.gallery-media .media-container[data-id="' + id + '"]').closest('.media-item').remove();

    // Call the deselectMedia function to remove the deleted media file from the selection
    deselectMedia(id);

    // Display an success message if the deletion process succeed
    $('#mediaAlert').html(`
     <div class="alert alert-success" role="alert">
         <span class="icon fa-solid fa-circle-exclamation"></span>
         Successfully Deleted.
     </div>
 `);

    // Remove the success message  after 3 seconds
    setTimeout(() => {
        $('#mediaAlert').html('');
    }, 3000);

    // // Display an error message if the deletion process encounters an issue
    // $('#mediaAlert').html(`
    //     <div class="alert alert-danger" role="alert">
    //         <span class="icon fa-solid fa-circle-exclamation"></span>
    //         Error occurred, please try again.
    //     </div>
    // `);

    // // Remove the error message after 3 seconds
    // setTimeout(() => {
    //     $('#mediaAlert').html('');
    // }, 3000);
}


function editMedia(element) {
    $('#mediaGalleryContent ').hide();
    $('#editMedia').show();
    $('#AddMediaButtonContainer').hide();
    var id = $(element).closest('.media-preview').attr('id');

}


// upload file

var dropArea = document.getElementById('dropArea');
if (dropArea) {
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        dropArea.addEventListener(eventName, preventDefaults, false)
    });

    ['dragenter', 'dragover'].forEach(eventName => {
        dropArea.addEventListener(eventName, highlight, false)
    });

    ['dragleave', 'drop'].forEach(eventName => {
        dropArea.addEventListener(eventName, unhighlight, false)
    });

    dropArea.addEventListener('drop', handleDrop, false);

}

// Check if the fileInput element exists before adding change event listener
var fileInput = $('#fileInput');
if (fileInput.length > 0) {
    fileInput.change(function (event) {
        var files = event.target.files; // Access files from the event object
        handleFiles(files);
    });
}

// Function to prevent default drag and drop behavior
function preventDefaults(e) {
    e.preventDefault();
    e.stopPropagation();
}
// Function to highlight dropArea when file dragged over
function highlight() {
    dropArea.classList.add('highlight');
}
// Function to remove highlight from dropArea when file dragged away
function unhighlight() {
    dropArea.classList.remove('highlight');
}
// Function to handle file drop
function handleDrop(e) {
    var dt = e.dataTransfer;
    var files = dt.files;
    handleFiles(files);
}
// Function to handle selected files
function handleFiles(files) {
    if (files instanceof Event) {
        files = files.target.files; // Access files from the event object
    }
    files = Array.from(files); // Convert files to an array
    files.forEach(uploadFile);
}
// Function to simulate file upload
function uploadFile(file) {
    simulateUpload(file);
}


// Simulate file upload completion
function simulateUpload(file) {
    var fileName = file.name;
    var truncatedFileName = fileName.length > 25 ? fileName.substring(0, 25) + '...' + fileName.slice(-1) + fileName.slice(fileName.lastIndexOf('.')) : fileName;
    var fileSrc = URL.createObjectURL(file); // Set src to file's data URL
    // Convert file size to a human-readable format
    var fileSize = formatFileSize(file.size);
    var uploadedMediaItem = `     <div class="uploaded-media-item d-flex align-items-center">
    <div class="uploaded-media-image">`;
    if (file.type.startsWith('image/')) {
        uploadedMediaItem += `<img src="${fileSrc}" alt="Uploaded Image">`
    } else if (file.type.startsWith('video/')) {
        uploadedMediaItem += `<div class="video-thumbnail">
        <video  autoplay="false"><source src="${fileSrc}" type="video/mp4">Your browser does not support the video tag.</video>
        <div class="play-icon  d-flex justify-content-between align-items-center"><i class="fa-solid fa-play"></i></div> <!-- Play icon -->

            </div>`;

        // previewElement.controls = true; // Add controls for playback
    }

    uploadedMediaItem += `</div>
    <div class="uploaded-media-details">
        <div>
            <p class="uploaded-media-name"> ${truncatedFileName}
            </p>
            <p class="uploaded-media-size">
                ${fileSize}
            </p>
        </div>
        <div class="d-flex justify-content-between align-items-center upload-progress">
            <div class="progress-Bar" style="flex-grow: 1;">
                <div class="progress-bar-item grid-x">

                    <div class="item-bar cell">
                        <div class="progress"
                            data-progress="100"></div>
                    </div>
                </div>
            </div>
            <div class="item_value cell shrink " style="width: 35px;">0% </div>
        </div>
       
    
    </div>
   
    <button class="borderless-btn p-0 m-0 delete-uploaded-media"><i class="fa-solid fa-circle-xmark "></i></button>



</div>`;

    $('#uploadedMediaPreviews').append(uploadedMediaItem);


    // Find the progress bar of the uploaded media item that was just added
    var $progressBar = $('#uploadedMediaPreviews').find('.uploaded-media-item:last-child .progress');
    var $itemValue = $('#uploadedMediaPreviews').find('.uploaded-media-item:last-child .item_value');

    var progress = 0;
    var interval = setInterval(function () {
        progress += 1; // Increment progress
        $progressBar.css('width', progress + '%'); // Update the width of the progress bar
        $itemValue.text(progress + '%'); // Update the progress text
        if (progress >= 100) {
            clearInterval(interval); // Stop the interval when upload is complete
        }
    }, 100); // Change interval duration as needed


}

// Function to format file size to human-readable format
function formatFileSize(size) {
    if (size >= 1e9) {
        return (size / 1e9).toFixed(2) + ' GB';
    } else if (size >= 1e6) {
        return (size / 1e6).toFixed(2) + ' MB';
    } else if (size >= 1e3) {
        return (size / 1e3).toFixed(2) + ' KB';
    } else {
        return size + ' bytes';
    }
}
// function to delete preview of uplaoded file
$('#uploadedMediaPreviews').on('click', '.delete-uploaded-media', function () {
    $(this).closest('.uploaded-media-item').remove();
})

$('video').each(function () {
    $(this).prop('autoplay', false);
});

// Function to deselect current selections
function deselectCurrentSelections() {
    // Remove active selection classes or perform any other actions to deselect
    $('.media-container.selected').find('.image-checkbox').css('display', 'none');
    $('.media-container.selected').removeClass('selected');
    $('#selectedMediaPreviews .media-preview').remove();
    selectedImages = {};
    $('.noOfSelectedMediaFiles').text('0');

}
// +++++++++\
function selectAllFiles() {
    // Get all media containers
    let mediaContainers = $('.gallery-media .media-container');

    // Iterate through each media container
    mediaContainers.each(function (index, container) {
        // Extract image details from the container
        var id = $(container).data('id');
        var name = $(container).data('name');
        var size = $(container).data('size');
        var src = $(container).find('img').attr('src');

        // Create image details object
        var mediaDetails = {
            id: id,
            name: name,
            size: size,
            src: src
        };

        // Call the function to append the media preview and store the image details
        appendMediaPreviewAndStore(mediaDetails, index);
    });
}
$('#selectedMediaDetails').click(function () {
    $('.previews').show();
});
$('.previews').on('click', '.btn-close', function () {
    $('.previews').hide();
})

// logo uplaoding
$('#uploaded-logo').on('load', function () {
    // If image is loaded, hide the plus icon and show the pencil icon

    // Check if an image is uploaded
    var uploadedImageSrc = $('#uploaded-logo').attr('src');
    if (uploadedImageSrc !== 'images/icons/placeholder-user.jpeg') {
        // Show the pencil icon if an image is uploaded
        $('#profilePicture .placeholder-icon').hide();
        $('#profilePicture .controls').show();
    } else {
        // Show the plus icon if no image is uploaded

        $('#profilePicture .placeholder-icon').show();
    }

});

$('#deleteLogoModal #deleteLogoButton').on('click', function () {
    // Hide the controls
    $('#profilePicture .controls').hide();

    // Reset the src attribute of the image back to the placeholder image
    $('#uploaded-logo').attr('src', 'images/icons/placeholder-user.jpeg');
    $('#deleteLogoModal').modal('hide');
});



// -----------
// Function to set star ratings based on the given value
// -------------------
function setStarRating(rating) {
    const stars = document.querySelectorAll('.star-rating .star'); // Get all stars

    // Loop through each star and determine whether to fill it
    stars.forEach((star, index) => {
        if (index < Math.floor(rating)) {
            star.classList.add('filled'); // Fully fill the star if the index is less than the integer part of the rating
        } else if (index < rating && index + 1 > rating) {
            // Fill partially if there's a decimal part
            star.style.background = `linear-gradient(to right, #FFA41C ${100 * (rating - index)}%, rgb(231, 231, 231) 0%)`;
        } else {
            star.classList.remove('filled'); // Leave the star unfilled
            star.style.background = ''; // Reset any linear gradients
        }
    });
}

// Function to set the progress bar widths based on rating counts
function setRatingProgress(ratingCounts, totalRatings) {
    // Calculate the percentage for each star rating
    const percentage = (count) => (count / totalRatings) * 100;

    const progressBars = {
        'five-star-progress': percentage(ratingCounts['five-star']),
        'four-star-progress': percentage(ratingCounts['four-star']),
        'three-star-progress': percentage(ratingCounts['three-star']),
        'two-star-progress': percentage(ratingCounts['two-star']),
        'one-star-progress': percentage(ratingCounts['one-star']),
    };
    const starCounts = {
        'five-star-count': ratingCounts['five-star'],
        'four-star-count': ratingCounts['four-star'],
        'three-star-count': ratingCounts['three-star'],
        'two-star-count': ratingCounts['two-star'],
        'one-star-count': ratingCounts['one-star'],
    };
    // Update each progress bar's width
    Object.keys(progressBars).forEach((id) => {
        const progressBar = document.getElementById(id);
        if (progressBar) {
            progressBar.style.width = `${progressBars[id]}%`; // Set width according to the percentage
        }
    });
    Object.keys(starCounts).forEach((id) => {
        const countElement = document.getElementById(id);
        if (countElement) {
            countElement.textContent = `${starCounts[id]}`; // Display the count
        }
    });
}



function createReview(review, index) {
    const reviewDiv = document.createElement("div");
    reviewDiv.className = "review";

    // Create the star rating
    const starsDiv = document.createElement("div");
    starsDiv.className = "stars";

    // Add full stars and check for half star
    const filledStars = Math.floor(review.rating);
    const hasHalfStar = review.rating % 1 !== 0;

    for (let i = 0; i < filledStars; i++) {
        const star = document.createElement("span");
        star.className = "star filled";
        star.textContent = "\u2605"; // Unicode for filled star
        starsDiv.appendChild(star);
    }

    if (hasHalfStar) {
        const star = document.createElement("span");
        star.className = "star half"; // Class for half star
        star.textContent = "\u2605"; // Unicode for half star
        starsDiv.appendChild(star);
    }

    // Add empty stars to complete 5 stars
    for (let i = filledStars + (hasHalfStar ? 1 : 0); i < 5; i++) {
        const star = document.createElement("span");
        star.className = "star";
        star.textContent = "\u2605"; // Unicode for empty star
        starsDiv.appendChild(star);
    }

    reviewDiv.appendChild(starsDiv); // Add star ratings to the review

    // Truncated text with "Show More/Show Less" functionality
    const reviewTextDiv = document.createElement("div");
    reviewTextDiv.className = "truncated-text";

    const wordLimit = 35; // Word limit for truncation
    const fullText = review.content; // Full text of the review
    const words = fullText.split(" "); // Split into words
    const truncatedText = words.slice(0, wordLimit).join(" ") + (words.length > wordLimit ? "..." : "");

    const paragraph = document.createElement("p");
    paragraph.textContent = truncatedText; // Set the initial text
  
    const toggleButton = document.createElement("button");
    toggleButton.classList.add("borderless-btn", "show-more-link");
    toggleButton.textContent = "Show More"; // Default text for the button
    toggleButton.classList.add("toggle-btn");

    if (words.length > wordLimit) { // Only show the toggle button if text exceeds the limit
        paragraph.appendChild(toggleButton);
    }

    // Toggle between full and truncated text
    toggleButton.addEventListener("click", function () {
        if (toggleButton.textContent === "Show More") {
            paragraph.textContent = fullText; // Show full text
            paragraph.appendChild(toggleButton); // Re-append the toggle button
            toggleButton.textContent = "Show Less"; // Change to "Show Less"
        } else {
            paragraph.textContent = truncatedText; // Show truncated text
            paragraph.appendChild(toggleButton); // Re-append the toggle button
            toggleButton.textContent = "Show More"; // Change to "Show More"
        }
    });

    reviewTextDiv.appendChild(paragraph); // Add paragraph to the text div
    reviewDiv.appendChild(reviewTextDiv); // Add truncated text to the review div

  // Add product link with heading
  let purchasedProductLink = review.productLink.trim();;
  if(purchasedProductLink !== "" && /^(ftp|http|https):\/\/[^ "]+$/.test(purchasedProductLink)){
    const productLinkDiv = document.createElement("div");
    productLinkDiv.className = "product-link";
    
    const heading = document.createElement("span"); // Create a strong element for the heading
    heading.textContent = "Purchased Product/Service: "; // Heading text
    
    const productLink = document.createElement("a");
    productLink.href = review.productLink; // Product link from the review data
    productLink.textContent = review.productLink; // Display the link text itself
    
    productLinkDiv.appendChild(heading); // Append the heading to the product link div
    productLinkDiv.appendChild(productLink); // Append the link to the product link div
    
    reviewDiv.appendChild(productLinkDiv); // Add product link div to the review
    
  }


    // Profile information (image, name, and date)
    const profileDiv = document.createElement("div");
    profileDiv.className = "user-info";

    const profileImage = document.createElement("img");
    profileImage.className = "user-image";
    profileImage.src = review.profileImage;
    profileDiv.appendChild(profileImage);

    const profileText = document.createElement("span");
    profileText.textContent = `${review.userName} - ${review.date}`;
    profileDiv.appendChild(profileText);
  
    reviewDiv.appendChild(profileDiv); // Add profile information

    return reviewDiv; // Return the complete review element
}

 
  // Function to apply a transition effect to reviews
function applyTransition(element) {
    setTimeout(() => {
      element.classList.add("show"); // Apply the "show" class to trigger the transition
    }, 100); // Delay to ensure the element is in the DOM before applying the transition
  }
  // Function to render reviews based on the current page
  function renderReviews(page, reviews) {
    const reviewsContainer = document.getElementById("reviews-container");
    reviewsContainer.innerHTML = ""; // Clear existing reviews
  
    const start = (page - 1) * reviewsPerPage; // Start index
    const end = Math.min(start + reviewsPerPage, reviews.length); // End index
  
    for (let i = start; i < end; i++) {
      const review = reviews[i];
      const reviewElement = createReview(review, i); // Create a review element
      reviewsContainer.appendChild(reviewElement);
      applyTransition(reviewElement); // Apply the transition to the review
    }
  }
  


  function renderPagination() {
    const pagination = document.querySelector(".pagination");
    pagination.innerHTML = ""; // Clear existing pagination controls
  
    const totalPages = Math.ceil(reviews.length / reviewsPerPage); // Total number of pages
    const maxVisiblePages = 2; // Number of pages shown on either side of the current page

    const pageNumbersContainer = document.createElement("div");
    pageNumbersContainer.className = "page-numbers-container"; // Wrapper for page numbers
  
    // Helper function to create a page button
    const createPageButton = (pageNumber) => {
        const pageButton = document.createElement("button");
        pageButton.className = `page ${currentPage === pageNumber ? "active" : ""}`; // Highlight the current page
        pageButton.textContent = pageNumber;
        pageButton.disabled = currentPage === pageNumber; // Disable if it's the current page
        pageButton.addEventListener("click", () => {
            if (currentPage !== pageNumber) {
                currentPage = pageNumber; // Update the current page
                renderReviews(currentPage, reviews); // Re-render reviews
                renderPagination(); // Re-render pagination
            }
        });
        return pageButton;
    };

    // Previous button with consistent styling
    const prevButton = document.createElement("button");
    prevButton.className = `navigation-button ${currentPage === 1 ? "disabled" : ""}`;
    prevButton.innerHTML = `<i class="fa-solid fa-chevron-left"></i>`; // FontAwesome left arrow
    prevButton.disabled = currentPage === 1; // Disable if on the first page
    prevButton.addEventListener("click", () => {
        if (currentPage > 1) {
            currentPage--; // Go to the previous page
            renderReviews(currentPage, reviews);
            renderPagination();
        }
    });
  
    pagination.appendChild(prevButton); // Add to pagination

    // If there are few pages, show all page numbers
    if (totalPages <= 7) {
        for (let i = 1; i <= totalPages; i++) {
            pageNumbersContainer.appendChild(createPageButton(i));
        }
    } else {
        pageNumbersContainer.appendChild(createPageButton(1)); // First page

        if (currentPage > maxVisiblePages + 2) {
            pageNumbersContainer.appendChild(document.createTextNode("...")); // Ellipsis
        }

        const startPage = Math.max(2, currentPage - maxVisiblePages); // Starting page
        const endPage = Math.min(totalPages - 1, currentPage + maxVisiblePages); // Ending page

        for (let i = startPage; i <= endPage; i++) {
            pageNumbersContainer.appendChild(createPageButton(i));
        }

        if (currentPage < totalPages - maxVisiblePages - 1) {
            pageNumbersContainer.appendChild(document.createTextNode("...")); // Ellipsis if needed
        }

        pageNumbersContainer.appendChild(createPageButton(totalPages)); // Last page
    }

    pagination.appendChild(pageNumbersContainer); // Add all page buttons to the wrapper
  
    // Next button with consistent styling
    const nextButton = document.createElement("button");
    nextButton.className = `navigation-button ${currentPage === totalPages ? "disabled" : ""}`;
    nextButton.innerHTML = `<i class="fa-solid fa-chevron-right"></i>`; // FontAwesome right arrow
    nextButton.disabled = currentPage === totalPages; // Disable if on the last page
    nextButton.addEventListener("click", () => {
        if (currentPage < totalPages) {
            currentPage++; // Go to the next page
            renderReviews(currentPage, reviews);
            renderPagination();
        }
    });

    pagination.appendChild(nextButton); // Add to pagination
}

/**
 * Validates whether a given URL is correctly formatted.
 * @param {string} url - The URL to be validated.
 * @returns {boolean} - Returns `true` if the URL is valid, `false` otherwise.
 */
function isValidURL(url) {
    const urlPattern = new RegExp('^(https?:\\/\\/)?' + // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
        '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
    return !!urlPattern.test(url);
}

$(document).ready(function () {
    // Show overlay when dropdown is opened
    $('.dropdown').on('show.bs.dropdown', function () {
      $('#overlay').fadeIn();
    });
  
    // Hide overlay when dropdown is closed
    $('.dropdown').on('hide.bs.dropdown', function () {
      $('#overlay').fadeOut();
    });
  
    // Hide overlay if clicked outside the dropdown
    $('#overlay').on('click', function () {
      $('.dropdown').dropdown('toggle');
      $(this).fadeOut();
    });
  });
  



  
 
  
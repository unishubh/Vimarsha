// popup.js

// This function will be called when the popup is opened
function onPopupOpen() {
    // Get the save link form element
    let saveLinkForm = document.getElementById('save-link-form');

    // Add an event listener to the form submit button
    saveLinkForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the form from submitting normally

        // Get the input values
        let linkUrl = document.getElementById('link-url').value;
        let linkCategory = document.getElementById('link-category').value;

        // Save the link to local storage
        chrome.storage.local.get('savedLinks', function(result) {
            let savedLinks = result.savedLinks || []; // If there are no saved links yet, create an empty array
            savedLinks.push({url: linkUrl, category: linkCategory}); // Add the new link to the array
            chrome.storage.local.set({savedLinks: savedLinks}); // Save the updated array to local storage

            // Clear the form inputs
            document.getElementById('link-url').value = '';
            document.getElementById('link-category').value = '';

            // Display a success message
            let saveLinkMessage = document.getElementById('save-link-message');
            saveLinkMessage.textContent = 'Link saved!';
            setTimeout(function() {
                saveLinkMessage.textContent = '';
            }, 3000); // Clear the message after 3 seconds
        });
    });
}

// Call the onPopupOpen function when the popup is opened
document.addEventListener('DOMContentLoaded', onPopupOpen);

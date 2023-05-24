/* eslint-disable prettier/prettier */
const fileInput = document.getElementById('fileID');
const chooseVideoBtn = document.getElementById('chooseVideoBtn');

// Add an event listener to the choose video button
chooseVideoBtn.addEventListener('click', () => {
    fileInput.click(); // Trigger the file input click event
});

// Add an event listener to the file input element
fileInput.addEventListener('change', () => {
    const file = fileInput.files[0]; // Get the selected file
    if (file) {
        // Create a new FormData object
        const formData = new FormData();

        // Append the file to the FormData object
        formData.append('video', file);

        // Make an AJAX request to upload the file
        fetch('/api/v1/deepfake/', {
            method: 'POST',
            body: formData,
        })
            .then((response) => response.json())
            .then((data) => {
                // Handle the response from the server
                console.log('Upload response:', data);
                // Your code here to handle the response
                // ...
            })
            .catch((error) => {
                // Handle any errors that occurred during the request
                console.error('Upload error:', error);
                // Your code here to handle the error
                // ...
            });
    }
});

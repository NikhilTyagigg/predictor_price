// Inside script.js

// Dummy data for the marketplace
const datasetList = [
    { id: 1, name: 'Dataset 1', price: 10 },
    { id: 2, name: 'Dataset 2', price: 20 },
    { id: 3, name: 'Dataset 3', price: 15 },
];

// Function to dynamically load the login form with role selection
function loadLoginFormWithRoleSelection() {
    const userPanel = document.getElementById('userPanel');

    const loginForm = document.createElement('form');
    loginForm.innerHTML = `<h2>Login</h2>
                           <label for="username">Username:</label>
                           <input type="text" id="username" required>
                           <label for="password">Password:</label>
                           <input type="password" id="password" required>
                           <label>Choose your role:</label>
                           <input type="radio" id="buyer" name="role" value="buyer" checked>
                           <label for="buyer">Buyer</label>
                           <input type="radio" id="seller" name="role" value="seller">
                           <label for="seller">Seller</label>
                           <button type="button" onclick="authenticateUser()">Login</button>
                           <p>Don't have an account? <span onclick="loadSignupForm()">Sign up</span></p>`;

    userPanel.innerHTML = '';
    userPanel.appendChild(loginForm);
}

// Function to dynamically load the signup form
function loadSignupForm() {
    const userPanel = document.getElementById('userPanel');

    const signupForm = document.createElement('form');
    signupForm.innerHTML = `<h2>Sign Up</h2>
                            <label for="newUsername">Username:</label>
                            <input type="text" id="newUsername" required>
                            <label for="newPassword">Password:</label>
                            <input type="password" id="newPassword" required>
                            <button type="button" onclick="showMarketplace()">Sign Up</button>
                            <p>Already have an account? <span onclick="loadLoginFormWithRoleSelection()">Login</span></p>`;

    userPanel.innerHTML = '';
    userPanel.appendChild(signupForm);
}

// Function to authenticate user and redirect based on the selected role
function authenticateUser() {
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const roleRadio = document.querySelector('input[name="role"]:checked');

    const username = usernameInput.value;
    const password = passwordInput.value;
    const role = roleRadio ? roleRadio.value : '';

    // Basic authentication logic (replace this with your actual authentication logic)
    if (username === 'demo' && password === 'password') {
        if (role === 'buyer') {
            loadBuyerMarketplace();
        } else if (role === 'seller') {
            console.log('Redirecting to the seller page...');
            loadSellerPage(); // Fix: Redirect to the seller page
        }
    } else {
        // Authentication failed, you can show an error message or handle it accordingly
        alert('Invalid username or password');
    }
}

// Function to dynamically load the seller page
function loadSellerPage() {
    const marketplaceDiv = document.getElementById('marketplace');
    const sellerPageDiv = document.getElementById('sellerPage');

    // Hide other elements
    //marketplaceDiv.style.display = 'none';

    // Show the seller page content

    // Show the seller page div
    sellerPageDiv.style.display = 'block';
}

// Function to dynamically load the marketplace content for buyers
function loadBuyerMarketplace() {
    loadMarketplaceContent();
}

// Function to dynamically load the marketplace content
function loadMarketplaceContent() {
    const marketplaceDiv = document.getElementById('marketplace');

    // Reset the inner HTML to clear previous content
    marketplaceDiv.innerHTML = '<h2>Marketplace</h2>';

    // Display each dataset as a card
    datasetList.forEach(dataset => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `<h3>${dataset.name}</h3>
                          <p>Price: $${dataset.price}</p>
                          <button onclick="buyDataset(${dataset.id})">Buy</button>`;
        marketplaceDiv.appendChild(card);
    });

    // Show the marketplace div
    marketplaceDiv.style.display = 'block';
}

// Dummy function for buying a dataset
function buyDataset(datasetId) {
    // Perform blockchain transaction logic here
    alert(`Transaction successful! You bought dataset ${datasetId}.`);
}

// Dummy function for selling a dataset
function sellDataset() {
    loadSellerPage();
    const datasetName = document.getElementById('datasetName').value;
    const datasetDescription = document.getElementById('datasetDescription').value;
    const datasetPrice = document.getElementById('datasetPrice').value;
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];

    // Validate input
    if (!datasetName || !datasetDescription || !datasetPrice || !file) {
        alert('Please fill in all fields and upload a CSV file.');
        return;
    }

    // Use FormData to send the dataset information to the server
    var formData = new FormData();
    formData.append('datasetName', datasetName);
    formData.append('datasetDescription', datasetDescription);
    formData.append('datasetPrice', datasetPrice);
    formData.append('file', file);

    // Use Fetch API to send the dataset to the server
    fetch('/sell_dataset', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        // Handle the selling result
        alert(`Dataset sold successfully! Prediction: ${data.prediction}`);
        
        // Reset input fields after selling
        document.getElementById('datasetName').value = '';
        document.getElementById('datasetDescription').value = '';
        document.getElementById('datasetPrice').value = '';
        document.getElementById('fileInput').value = '';

        // Optionally, show a success message or redirect
        // ...
    })
    .catch(error => {
        // Handle errors
        console.error('Error:', error);
        alert('Error occurred during dataset selling.');
    });
}

// Function to show the login form initially
function showLogin() {
    loadLoginFormWithRoleSelection();
}

// Call the function to show the login form initially
document.addEventListener("DOMContentLoaded", showLogin);

// Function to handle file uploads and prediction
function handleFileUpload() {
    // Assuming you have a function to handle file uploads
    var fileInput = document.getElementById('fileInput');
    var file = fileInput.files[0];

    // Use FormData to send the file to the server
    var formData = new FormData();
    formData.append('file', file);

    // Use Fetch API to send the file to the server
    fetch('/predict_price', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        // Handle the prediction result (update your UI accordingly)
        console.log('Prediction:', data.prediction);

        // Show the seller page after successful prediction
        loadSellerPage();
    })
    .catch(error => console.error('Error:', error));
}

// ... (other functions)

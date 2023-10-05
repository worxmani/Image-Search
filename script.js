// Get references to HTML elements
const searchForm = document.getElementById("search-form"); // Search form
const searchBox = document.getElementById("search-box"); // Input for search keyword
const searchResult = document.getElementById("search-result"); // Container for displaying search results
const showMoreBtn = document.getElementById("show-more-button"); // "Show More" button

// Initialize variables
let keyword = ""; // Stores the search keyword
let page = 1; // Tracks the current page number for results
const apiKey = ""; // Your Unsplash API key

// Function to search for images based on the user's input
async function searchImages() {
  keyword = searchBox.value; // Get the search keyword from the input box
  const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${apiKey}&per_page=12`; // Construct the API URL
  const response = await fetch(url); // Fetch data from the API
  const data = await response.json(); // Parse the response as JSON

  const results = data.results; // Extract the search results from the API response

  if (page === 1) searchResult.innerHTML = ""; // Clear previous results if it's the first page

  // Loop through the results and create HTML elements to display images
  results.map((result) => {
    const image = document.createElement("img"); // Create an image element
    image.src = result.urls.small; // Set the image source
    const imageLink = document.createElement("a"); // Create a link element
    imageLink.href = result.links.html; // Set the link URL to the image's Unsplash page
    imageLink.target = "_blank"; // Open the link in a new tab
    imageLink.appendChild(image); // Append the image to the link
    searchResult.appendChild(imageLink); // Append the link to the search results container
  });

  showMoreBtn.style.display = "block"; // Display the "Show More" button
}

// Event listener for form submission
searchForm.addEventListener("submit", (e) => {
  e.preventDefault(); // Prevent the default form submission behavior
  page = 1; // Reset the page number to 1
  searchImages(); // Call the searchImages function to perform the search
});

// Event listener for "Show More" button click
showMoreBtn.addEventListener("click", (e) => {
  e.preventDefault(); // Prevent the default link behavior
  page++; // Increment the page number for pagination
  searchImages(); // Call the searchImages function to load more results
});

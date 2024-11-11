const artworkImage = document.getElementById('artwork-image');
const artworkTitle = document.getElementById('artwork-title');
const artworkArtist = document.getElementById('artwork-artist');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const errorMessage = document.getElementById('error-message');

let currentPage = 1;
const apiUrl = 'https://api.artic.edu/api/v1/artworks';

async function fetchArtwork(page) {
  try {
    const response = await fetch(`${apiUrl}?page=${page}&limit=1&fields=id,title,artist_title,image_id`);
    if (!response.ok) throw new Error(`Error: ${response.status}`);
    
    const data = await response.json();
    const artwork = data.data[0];

    if (!artwork) {
      artworkTitle.textContent = "No more artworks!";
      artworkArtist.textContent = "";
      artworkImage.classList.add('hidden');
      return;
    }

    const imageUrl = `https://www.artic.edu/iiif/2/${artwork.image_id}/full/843,/0/default.jpg`;
    artworkImage.src = imageUrl;
    artworkImage.alt = artwork.title;
    artworkImage.classList.remove('hidden');
    artworkTitle.textContent = artwork.title || "Untitled";
    artworkArtist.textContent = `Artist: ${artwork.artist_title || "Unknown"}`;
    errorMessage.classList.add('hidden');
  } catch (error) {
    errorMessage.textContent = error.message;
    errorMessage.classList.remove('hidden');
    artworkImage.classList.add('hidden');
    artworkTitle.textContent = "Error loading artwork";
    artworkArtist.textContent = "";
  }
}

prevBtn.addEventListener('click', () => {
  if (currentPage > 1) {
    currentPage--;
    fetchArtwork(currentPage);
  }
});

nextBtn.addEventListener('click', () => {
  currentPage++;
  fetchArtwork(currentPage);
});

fetchArtwork(currentPage);

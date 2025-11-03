// modal.js
document.addEventListener("DOMContentLoaded", () => {
  const modalOverlay = document.getElementById("modalOverlay");
  const closeModal = document.getElementById("closeModal");
  const videoPlayer = document.getElementById("videoPlayer");
  const videoDescription = document.getElementById("videoDescription");
  const photoItems = document.querySelectorAll(".photo-item");

  // Open Modal
  photoItems.forEach(item => {
    item.addEventListener("click", () => {
      const videoURL = item.getAttribute("data-video");
      const description = item.getAttribute("data-description");
      
      // Convert video URL to embed format
      let embedURL = videoURL;
      
      // Handle Vimeo URLs
      if (videoURL.includes("vimeo.com")) {
        embedURL = videoURL.replace("vimeo.com", "player.vimeo.com/video");
      }
      // Handle YouTube URLs
      else if (videoURL.includes("youtube.com") || videoURL.includes("youtu.be")) {
        let videoId = "";
        
        // Extract video ID from different YouTube URL formats
        if (videoURL.includes("youtu.be/")) {
          // Format: https://youtu.be/VIDEO_ID
          videoId = videoURL.split("youtu.be/")[1].split("?")[0].split("&")[0];
        } else if (videoURL.includes("youtube.com/watch?v=")) {
          // Format: https://www.youtube.com/watch?v=VIDEO_ID
          videoId = videoURL.split("v=")[1].split("&")[0];
        } else if (videoURL.includes("youtube.com/embed/")) {
          // Already in embed format
          videoId = videoURL.split("embed/")[1].split("?")[0].split("&")[0];
        }
        
        // Convert to YouTube embed URL with autoplay and loop
        embedURL = `https://www.youtube.com/embed/${videoId}?autoplay=1&loop=1&playlist=${videoId}`;
      }
      
      // Set video and description
      videoPlayer.src = embedURL;
      videoDescription.textContent = description;

      // Show modal
      modalOverlay.style.display = "flex";
    });
  });

  // Close Modal
  closeModal.addEventListener("click", () => {
    modalOverlay.style.display = "none";
    videoPlayer.src = ""; // Stop video
  });

  // Close Modal when clicking outside content
  modalOverlay.addEventListener("click", (e) => {
    if (e.target === modalOverlay) {
      modalOverlay.style.display = "none";
      videoPlayer.src = ""; // Stop video
    }
  });
});

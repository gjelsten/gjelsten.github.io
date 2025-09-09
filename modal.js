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
      
      // Set video and description
      videoPlayer.src = videoURL.replace("vimeo.com", "player.vimeo.com/video");
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

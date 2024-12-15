// JavaScript to toggle the hamburger menu
document.querySelector('.hamburger-menu').addEventListener('click', () => {
  const menuLinks = document.querySelector('.menu-links');
  menuLinks.classList.toggle('show');
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
  const menuContainer = document.querySelector('.menu-container');
  if (!menuContainer.contains(e.target)) {
    document.querySelector('.menu-links').classList.remove('show');
  }
});
// JavaScript Document
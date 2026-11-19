document.addEventListener('DOMContentLoaded', function () {
  const filterBar = document.querySelector('.films-filter');
  const grid = document.querySelector('.portfolio-grid');
  const hero = document.querySelector('.portfolio-hero');
  const gridItems = document.querySelectorAll('.portfolio-grid .film-item');
  const filterButtons = document.querySelectorAll('.films-filter-btn');
  const defaultHeroHTML = hero ? hero.innerHTML : '';
  let activeGridHero = null;

  if (!filterBar || !grid || !hero) return;

  // Hero is now a background video, not a duplicated grid film,
  // so no grid item should be hidden as a "hero duplicate".
  const defaultHeroGridItem = null;

  function itemMatchesFilter(item, category) {
    if (!item) return false;
    const categories = item.dataset.category.split(' ');
    return category === 'all' || categories.includes(category);
  }

  function getMatchingItems(category) {
    const matches = [];
    if (defaultHeroItem && itemMatchesFilter(defaultHeroItem, category)) {
      matches.push({ type: 'hero' });
    }
    gridItems.forEach(function (item) {
      if (itemMatchesFilter(item, category)) {
        matches.push({ type: 'grid', el: item });
      }
    });
    return matches;
  }

  function restoreDefaultHero() {
    hero.innerHTML = defaultHeroHTML;
  }

  function setHeroFromGridItem(item) {
    hero.innerHTML =
      '<div class="photo-item portfolio-item film-item" data-category="' +
      item.dataset.category +
      '" data-video="' + (item.dataset.video || '') +
      '" data-description="' + (item.dataset.description || '') + '">' +
      item.innerHTML +
      '</div>';
    const newHeroItem = hero.querySelector('.film-item');
    if (newHeroItem) {
      newHeroItem.addEventListener('click', function () {
        const videoURL = newHeroItem.getAttribute('data-video');
        const description = newHeroItem.getAttribute('data-description');
        if (!videoURL) return;
        const modalOverlay = document.getElementById('modalOverlay');
        const videoPlayer = document.getElementById('videoPlayer');
        const videoDescription = document.getElementById('videoDescription');
        let embedURL = videoURL;
        if (videoURL.includes('vimeo.com') && !videoURL.includes('player.vimeo.com')) {
          const vimeoId = videoURL.split('vimeo.com/')[1].split('?')[0];
          embedURL = 'https://player.vimeo.com/video/' + vimeoId + '?autoplay=1&loop=1';
        } else if (videoURL.includes('youtube.com') || videoURL.includes('youtu.be')) {
          let videoId = '';
          if (videoURL.includes('youtu.be/')) {
            videoId = videoURL.split('youtu.be/')[1].split('?')[0];
          } else if (videoURL.includes('v=')) {
            videoId = videoURL.split('v=')[1].split('&')[0];
          }
          embedURL = 'https://www.youtube.com/embed/' + videoId + '?autoplay=1&loop=1&playlist=' + videoId;
        }
        if (videoPlayer) videoPlayer.src = embedURL;
        if (videoDescription) videoDescription.textContent = description;
        if (modalOverlay) modalOverlay.style.display = 'flex';
      });
    }
  }

  function applyFilter(category) {
    grid.classList.add('is-filtering');

    if (category === 'all') {
      hero.classList.remove('is-hidden');
      restoreDefaultHero();
    } else {
      hero.classList.add('is-hidden');
    }

    gridItems.forEach(function (item) {
      item.classList.remove('is-visible');
      item.classList.add('is-hidden');
    });

    setTimeout(function () {
      gridItems.forEach(function (item) {
        const isDefaultHero = item === defaultHeroGridItem && category === 'all';
        if (itemMatchesFilter(item, category) && !isDefaultHero) {
          item.classList.remove('is-hidden');
          requestAnimationFrame(function () {
            item.classList.add('is-visible');
          });
        }
      });
      grid.classList.remove('is-filtering');
    }, 200);
  }

  filterButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      const category = btn.dataset.filter;
      filterButtons.forEach(function (b) {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');
      applyFilter(category);
    });
  });

  applyFilter('all');
});

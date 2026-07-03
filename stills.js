document.addEventListener('DOMContentLoaded', function () {
  const filterBar = document.querySelector('.stills-filter');
  const grid = document.querySelector('.portfolio-grid');
  const hero = document.querySelector('.portfolio-hero');
  const gridItems = document.querySelectorAll('.portfolio-grid .stills-item');
  const filterButtons = document.querySelectorAll('.stills-filter-btn');
  const defaultHeroHTML = hero ? hero.innerHTML : '';
  let defaultHeroItem = null;
  let activeGridHero = null;
  let lightbox = null;

  if (!filterBar || !grid || !hero) return;

  const temp = document.createElement('div');
  temp.innerHTML = defaultHeroHTML;
  defaultHeroItem = temp.querySelector('.stills-item');

  function itemMatchesFilter(item, category) {
    if (!item) return false;
    const categories = item.dataset.category.split(' ');
    return category === 'all' || categories.includes(category);
  }

  function getMatchingItems(category) {
    const matches = [];

    if (category === 'all') {
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
      '<div class="stills-item portfolio-item" data-category="' +
      item.dataset.category +
      '">' +
      item.innerHTML +
      '</div>';
  }

  function initLightbox() {
    if (typeof GLightbox === 'undefined') return;
    if (lightbox) lightbox.destroy();
    lightbox = GLightbox({
      selector: '.stills-item:not(.is-hidden) .glightbox',
      touchNavigation: true,
      loop: true,
      openEffect: 'fade',
      closeEffect: 'fade'
    });
  }

  function applyFilter(category) {
    grid.classList.add('is-filtering');

    if (activeGridHero) {
      activeGridHero.classList.remove('is-hidden');
      activeGridHero = null;
    }

    const matches = getMatchingItems(category);

    if (matches.length === 0) {
      hero.classList.add('is-hidden');
    } else {
      hero.classList.remove('is-hidden');

      if (matches[0].type === 'hero') {
        restoreDefaultHero();
      } else {
        setHeroFromGridItem(matches[0].el);
        matches[0].el.classList.add('is-hidden');
        activeGridHero = matches[0].el;
      }
    }

    gridItems.forEach(function (item) {
      item.classList.remove('is-visible');
      item.classList.add('is-hidden');
    });

    setTimeout(function () {
      gridItems.forEach(function (item) {
        const isHeroSource = item === activeGridHero;
        const shouldShow = itemMatchesFilter(item, category) && !isHeroSource;

        if (shouldShow) {
          item.classList.remove('is-hidden');
          requestAnimationFrame(function () {
            item.classList.add('is-visible');
          });
        }
      });

      grid.classList.remove('is-filtering');
      initLightbox();
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

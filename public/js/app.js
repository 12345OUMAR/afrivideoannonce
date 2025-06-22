const translations = {
  en: 'translations/en.json',
  fr: 'translations/fr.json',
  ar: 'translations/ar.json'
};

let currentLang = 'en';

function loadLang(lang) {
  fetch(translations[lang])
    .then(res => res.json())
    .then(data => {
      document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        el.textContent = data[key] || key;
      });
    });
}

function renderCategories() {
  const categories = [
    { name: 'Tech', videos: 6 },
    { name: 'Music', videos: 6 },
    { name: 'Sports', videos: 6 }
  ];
  const container = document.getElementById('categories');
  categories.forEach(cat => {
    const section = document.createElement('section');
    section.className = 'category';
    const title = document.createElement('h2');
    title.textContent = cat.name;
    section.appendChild(title);
    const list = document.createElement('div');
    list.className = 'cards';
    for (let i = 0; i < cat.videos; i++) {
      const card = document.createElement('div');
      card.className = 'card';
      card.textContent = cat.name + ' video ' + (i + 1);
      list.appendChild(card);
    }
    section.appendChild(list);
    container.appendChild(section);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  renderCategories();
  loadLang(currentLang);
  document.getElementById('lang-select').addEventListener('change', e => {
    currentLang = e.target.value;
    loadLang(currentLang);
  });
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('public/js/sw.js');
  }
});

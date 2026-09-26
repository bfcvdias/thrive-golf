'use strict';
const quotes = document.querySelector('#quotes');
prototypeContent.quotes.forEach(item => {
  const article = document.createElement('article'); article.className = 'quote-card';
  const mark = document.createElement('span'); mark.className = 'quote-mark'; mark.textContent = '“'; mark.setAttribute('aria-hidden', 'true');
  const quote = document.createElement('blockquote'); quote.textContent = item.quote;
  const person = document.createElement('div'); person.className = 'quote-person';
  const image = document.createElement('span'); image.className = 'portrait'; image.setAttribute('aria-hidden', 'true'); image.style.backgroundImage = `url(assets/concept/${item.image}.webp)`; image.style.backgroundPosition = item.position;
  const text = document.createElement('div'); const name = document.createElement('b'); name.textContent = item.name; const role = document.createElement('span'); role.textContent = item.role;
  text.append(name, role); person.append(image, text); article.append(mark, quote, person); quotes.append(article);
});
const audiences = document.querySelector('#audiences');
prototypeContent.audiences.forEach(item => {
  const card = document.createElement('a'); card.className = 'audience-card'; card.href = '#book'; if (item.id) card.id = item.id;
  const image = document.createElement('img'); image.className = 'cover'; image.src = `assets/concept/${item.image}.webp`; image.alt = item.alt; image.loading = 'lazy'; image.width = 1536; image.height = 1024;
  const content = document.createElement('div'); content.className = 'audience-content';
  const kicker = document.createElement('span'); kicker.textContent = item.kicker; const title = document.createElement('h3'); title.textContent = item.title; const copy = document.createElement('p'); copy.textContent = item.copy;
  const action = document.createElement('span'); action.className = 'text-link'; action.textContent = item.action; const arrow = document.createElement('span'); arrow.textContent = '↗'; arrow.setAttribute('aria-hidden', 'true'); action.append(arrow);
  content.append(kicker, title, copy, action); card.append(image, content); audiences.append(card);
});
const menu = document.querySelector('.menu-toggle');
const links = document.querySelector('#nav-links');
function closeMenu() { links.classList.remove('is-open'); menu.setAttribute('aria-expanded', 'false'); menu.setAttribute('aria-label', 'Open navigation'); }
menu.addEventListener('click', () => { const open = menu.getAttribute('aria-expanded') !== 'true'; links.classList.toggle('is-open', open); menu.setAttribute('aria-expanded', String(open)); menu.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation'); });
links.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => { if (event.key === 'Escape' && menu.getAttribute('aria-expanded') === 'true') { closeMenu(); menu.focus(); } });
matchMedia('(min-width: 761px)').addEventListener('change', event => { if (event.matches) closeMenu(); });
const dialog = document.querySelector('#story-dialog');
const storyButton = document.querySelector('#open-story');
storyButton.addEventListener('click', () => dialog.showModal());
document.querySelector('.close-dialog').addEventListener('click', () => dialog.close());
document.querySelector('#dialog-book').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => { const box = dialog.getBoundingClientRect(); if (event.target === dialog && (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom)) dialog.close(); });



const nav = document.querySelector('nav[aria-label="Navigasi utama"]');
const menuButton = document.querySelector('button[aria-label="Buka menu"]');
const navLinks = nav.querySelectorAll('a');
const sections = document.querySelectorAll('main section');
const revealItems = document.querySelectorAll('[data-reveal]');
const typingItems = document.querySelectorAll('[data-teks]');

function setMenuOpen(isOpen) {
  nav.dataset.open = String(isOpen);
  menuButton.setAttribute('aria-expanded', String(isOpen));
}

menuButton.addEventListener('click', () => {
  setMenuOpen(nav.dataset.open !== 'true');
});

navLinks.forEach((link) => {
  link.addEventListener('click', (event) => {
    const target = document.querySelector(link.getAttribute('href'));

    if (target) {
      event.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    setMenuOpen(false);
  });
});

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(({ isIntersecting, target }) => {
    if (!isIntersecting) {
      return;
    }

    navLinks.forEach((link) => {
      const isActive = link.getAttribute('href') === `#${target.id}`;
      link.classList.toggle('after:right-0', isActive);
      link.classList.toggle('after:right-full', !isActive);
    });
  });
}, { threshold: 0.45 });

sections.forEach((section) => sectionObserver.observe(section));

const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(({ isIntersecting, target }) => {
    if (!isIntersecting) {
      return;
    }

    target.classList.add('translate-y-0', 'opacity-100');
    observer.unobserve(target);
  });
}, { threshold: 0.15 });

revealItems.forEach((item) => revealObserver.observe(item));

typingItems.forEach((item, lineIndex) => {
  const text = item.dataset.teks;

  if (!text) {
    return;
  }

  let index = 0;

  const typeNextCharacter = () => {
    item.textContent = text.slice(0, index);
    index += 1;

    if (index <= text.length) {
      window.setTimeout(typeNextCharacter, 105);
    }
  };

  window.setTimeout(typeNextCharacter, lineIndex * 850 + 300);
});

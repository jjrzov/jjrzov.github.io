// Footer year
document.getElementById('year').textContent = new Date().getFullYear();

// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const mobileNav = document.getElementById('mobileNav');

navToggle.addEventListener('click', () => {
  const isOpen = mobileNav.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  navToggle.textContent = isOpen ? 'CLOSE' : 'MENU';
});

mobileNav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    mobileNav.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
    navToggle.textContent = 'MENU';
  });
});

// Active section highlighting (desktop nav + signal rail nodes)
const sections = ['hero', 'work', 'about', 'contact']
  .map(id => document.getElementById(id))
  .filter(Boolean);

const navLinks = document.querySelectorAll('.nav-links a[data-nav]');
const railNodes = document.querySelectorAll('.rail-node');

if ('IntersectionObserver' in window && sections.length) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;

        navLinks.forEach(link => {
          link.classList.toggle('active', link.dataset.nav === id);
        });

        railNodes.forEach(node => {
          node.classList.toggle('active', node.dataset.node === id);
        });
      }
    });
  }, { rootMargin: '-40% 0px -50% 0px', threshold: 0 });

  sections.forEach(section => observer.observe(section));
}

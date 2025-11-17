// Fetch and inject the shared navbar into pages
(function(){
  function loadNavbar(){
    const header = document.getElementById('site-header');
    if(!header) return;
    fetch('/html/navbar.html')
      .then(r => { if(!r.ok) throw new Error('Navbar fetch failed'); return r.text() })
      .then(html => {
        header.innerHTML = html;
        attachNavBehavior();
        highlightActiveLink();
      })
      .catch(err => {
        console.error('Could not load navbar:', err);
      });
  }

  function attachNavBehavior(){
    const toggle = document.getElementById('nav-toggle');
    const nav = document.getElementById('main-nav');
    if(!toggle || !nav) return;
    toggle.addEventListener('click', ()=> nav.classList.toggle('open'));
    // Close menu when a link is clicked
    const links = nav.querySelectorAll('a');
    links.forEach(link => {
      link.addEventListener('click', () => nav.classList.remove('open'));
    });
  }

  function highlightActiveLink(){
    const links = document.querySelectorAll('#main-nav a');
    const currentPage = window.location.pathname.toLowerCase();
    links.forEach(a => {
      const href = a.getAttribute('href') || '';
      const hrefLower = href.toLowerCase();
      // Highlight if current page matches link
      if(currentPage.includes(hrefLower.replace(/\//g, '')) || currentPage.endsWith(hrefLower)){
        a.classList.add('active');
      } else {
        a.classList.remove('active');
      }
    });
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', loadNavbar);
  } else {
    loadNavbar();
  }
})();


(function(){
  // Load common header/footer from common.html and inject into pages
  function loadCommon(){
    const header = document.getElementById('site-header');
    const footer = document.getElementById('site-footer');
    if(!header && !footer) return;
    fetch('/html/common.html').then(r => {
      if(!r.ok) throw new Error('common.html fetch failed');
      return r.text();
    }).then(html => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');
      const nav = doc.querySelector('.navbar-inner');
      const f = doc.querySelector('footer');
      if(nav && header) header.innerHTML = nav.outerHTML;
      if(f && footer) footer.innerHTML = f.outerHTML;
      attachNavBehavior();
      highlightActiveLink();
    }).catch(err => console.error('Could not load common parts:', err));
  }

  function attachNavBehavior(){
    const toggle = document.getElementById('nav-toggle');
    const nav = document.getElementById('main-nav');
    if(!toggle || !nav) return;
    toggle.addEventListener('click', ()=> nav.classList.toggle('open'));
    const links = nav.querySelectorAll('a');
    links.forEach(link => link.addEventListener('click', ()=> nav.classList.remove('open')));
  }

  function highlightActiveLink(){
    const links = document.querySelectorAll('#main-nav a');
    const currentPage = window.location.pathname.toLowerCase();
    links.forEach(a => {
      const href = a.getAttribute('href') || '';
      const hrefLower = href.toLowerCase();
      if(currentPage.includes(hrefLower.replace(/\//g, '')) || currentPage.endsWith(hrefLower)){
        a.classList.add('active');
      } else {
        a.classList.remove('active');
      }
    });
  }

  // showTopic moved to common to keep navigation behavior centralized
  window.showTopic = function(topic){
    try{
      const sections = document.querySelectorAll('.topic-section');
      sections.forEach(section => { section.style.display = 'none'; section.classList.remove('fadeInUp'); });
      const selected = document.getElementById(topic);
      if(selected){ selected.style.display = 'block'; selected.classList.add('fadeInUp'); }

      // Update active state for buttons: find button which has onclick calling showTopic with same topic
      const buttons = document.querySelectorAll('.topic-btn');
      buttons.forEach(b => b.classList.remove('active'));
      // Try to find matching button by data attribute or onclick
      let matching = Array.from(buttons).find(b => {
        const on = b.getAttribute('onclick') || '';
        return on.includes("showTopic('" + topic + "')") || on.includes('showTopic(\"' + topic + '\"') ;
      });
      if(matching) matching.classList.add('active');

      window.scrollTo({ top: 0, behavior: 'smooth' });
    }catch(e){ console.error('showTopic error', e); }
  };

  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', loadCommon);
  else loadCommon();
})();

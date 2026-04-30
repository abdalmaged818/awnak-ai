/* صحيفة إرث الإلكترونية — script.js */
(function () {
  'use strict';

  try {
    var el = document.getElementById('topDate');
    if (el) {
      var now = new Date();
      var days = ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'];
      var months = ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'];
      var dayName = days[now.getDay()];
      var date = now.getDate();
      var monthName = months[now.getMonth()];
      var year = now.getFullYear();
      el.textContent = dayName + '، ' + date + ' ' + monthName + ' ' + year;
    }
    }
  } catch(e){}

  var toggle=document.getElementById('navToggle');
  var panel=document.getElementById('mobileNav');
  var closeBtn=document.getElementById('mobileNavClose');
  var bd=document.getElementById('overlayBackdrop');

  function openNav(){
    if(!panel)return;
    panel.classList.add('is-open');panel.setAttribute('aria-hidden','false');
    if(toggle)toggle.setAttribute('aria-expanded','true');
    if(bd)bd.classList.add('is-visible');
    document.body.style.overflow='hidden';
  }
  function closeNav(){
    if(!panel)return;
    panel.classList.remove('is-open');panel.setAttribute('aria-hidden','true');
    if(toggle)toggle.setAttribute('aria-expanded','false');
    if(bd)bd.classList.remove('is-visible');
    document.body.style.overflow='';
  }
  if(toggle)toggle.addEventListener('click',function(){panel&&panel.classList.contains('is-open')?closeNav():openNav();});
  if(closeBtn)closeBtn.addEventListener('click',closeNav);
  if(bd)bd.addEventListener('click',closeNav);
  if(panel)panel.querySelectorAll('a').forEach(function(a){a.addEventListener('click',closeNav);});
  document.addEventListener('keydown',function(e){if(e.key==='Escape'&&panel&&panel.classList.contains('is-open'))closeNav();});

  var header=document.getElementById('masthead');
  if(header){
    window.addEventListener('scroll',function(){header.classList.toggle('is-scrolled',window.scrollY>12);},{passive:true});
  }

  if('IntersectionObserver' in window){
    var observer=new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if(entry.isIntersecting){
          entry.target.style.opacity='1';
          entry.target.style.transform='translateY(0)';
          observer.unobserve(entry.target);
        }
      });
    },{threshold:0.1,rootMargin:'0px 0px -40px 0px'});
    document.querySelectorAll('.ncard,.rcard--feature,.icard,.acard,.about-card,.staff-card').forEach(function(card){
      card.style.opacity='0';
      card.style.transform='translateY(20px)';
      card.style.transition='opacity 0.5s ease,transform 0.5s ease';
      observer.observe(card);
    });
  }

  document.querySelectorAll('a[href^="#"]').forEach(function(anchor){
    anchor.addEventListener('click',function(e){
      var target=document.querySelector(this.getAttribute('href'));
      if(target){
        e.preventDefault();
        var top=target.getBoundingClientRect().top+window.pageYOffset;
        var hh=header?header.offsetHeight:0;
        window.scrollTo({top:top-hh-16,behavior:'smooth'});
      }
    });
  });
})();

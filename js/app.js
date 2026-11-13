'use strict';
const profile = document.getElementById('profile-screen');
const browse = document.getElementById('browse-screen');
const openLetter = () => { profile.hidden = true; browse.hidden = false; window.scrollTo(0, 0); };
document.getElementById('open-letter').addEventListener('click', openLetter);
document.getElementById('switch-profile').addEventListener('click', () => { browse.hidden = true; profile.hidden = false; window.scrollTo(0, 0); });
document.getElementById('top-button').addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
const dialog = document.getElementById('memory-dialog');
const dialogVideo = document.getElementById('dialog-video');
document.querySelectorAll('.memory-card').forEach((card) => {
  const video = card.querySelector('video');
  const startPreview = () => { if (!video) return; card.classList.add('previewing'); video.currentTime = 0; video.play().catch(() => card.classList.remove('previewing')); };
  const stopPreview = () => { if (!video) return; video.pause(); video.currentTime = 0; card.classList.remove('previewing'); };
  card.addEventListener('pointerenter', startPreview);
  card.addEventListener('pointerleave', stopPreview);
  card.addEventListener('focusin', startPreview);
  card.addEventListener('focusout', stopPreview);
  card.addEventListener('click', () => {
    if (!video) return;
    dialogVideo.src = video.currentSrc || video.querySelector('source').src;
    document.getElementById('dialog-caption').textContent = card.dataset.memory;
    dialog.showModal();
    dialogVideo.currentTime = 0;
    dialogVideo.play().catch(() => {});
  });
});
document.getElementById('close-dialog').addEventListener('click', () => dialog.close());
dialog.addEventListener('close', () => { dialogVideo.pause(); dialogVideo.removeAttribute('src'); dialogVideo.load(); });
window.addEventListener('scroll', () => document.getElementById('site-header').classList.toggle('scrolled', scrollY > 24));

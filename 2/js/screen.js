const btn = document.querySelector('.j-btn-test');
btn.addEventListener('click', () => {
  alert("Screen size: " + window.screen.width + "x" + window.screen.height);
});
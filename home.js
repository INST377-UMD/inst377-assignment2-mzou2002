document.addEventListener('DOMContentLoaded', () => {
  fetch('https://zenquotes.io/')
    .then(r => r.json())
    .then(data => {
      document.getElementById('quote').textContent =
        `“${data.content}” — ${data.author}`;
    })
    .catch(() => {
      document.getElementById('quote').textContent =
        'Could not load a quote.';
    });
});

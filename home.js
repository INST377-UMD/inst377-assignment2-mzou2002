// On load, fetch a random quote
fetch('https://api.quotable.io/random')
  .then(r => r.json())
  .then(data => {
    document.getElementById('quote').textContent = `"${data.content}" — ${data.author}`;
  })
  .catch(() => {
    document.getElementById('quote').textContent = 'Could not load a quote.';
  });

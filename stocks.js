const POLY_KEY = 'YOUR_POLYGON_API_KEY';  // ← replace this
const ctx = document.getElementById('stock-chart').getContext('2d');
let chart;

// Helper: build date string YYYY-MM-DD
function formatDate(d) {
  const mm = String(d.getMonth()+1).padStart(2,'0');
  const dd = String(d.getDate()).padStart(2,'0');
  return `${d.getFullYear()}-${mm}-${dd}`;
}

document.getElementById('get-data').addEventListener('click', () => {
  const ticker = document.getElementById('ticker').value.trim().toUpperCase();
  const days = parseInt(document.getElementById('range').value,10);
  if (!ticker) return alert('Enter a ticker.');
  const end = new Date(), start = new Date(end.getTime() - days*24*60*60*1000);
  const url = `https://api.polygon.io/v2/aggs/ticker/${ticker}/range/1/day/${formatDate(start)}/${formatDate(end)}?apiKey=${POLY_KEY}`;

  fetch(url)
    .then(r => r.json())
    .then(data => {
      const labels = data.results.map(r => new Date(r.t).toLocaleDateString());
      const prices = data.results.map(r => r.c);
      if (chart) chart.destroy();
      chart = new Chart(ctx, {
        type: 'line',
        data: { labels, datasets: [{ label: ticker, data: prices }] }
      });
    })
    .catch(() => alert('Error fetching stock data.'));
});

// Load Reddit table
const redditDate = formatDate(new Date());
fetch(`https://tradestie.com/api/v1/apps/reddit?date=${redditDate}`)
  .then(r => r.json())
  .then(list => {
    const top5 = list.slice(0,5);
    const tbody = document.querySelector('#reddit-table tbody');
    top5.forEach(row => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td><a href="https://finance.yahoo.com/quote/${row.ticker}" target="_blank">${row.ticker}</a></td>
        <td>${row.comment_count}</td>
        <td>${row.sentiment === 'Bullish' ? '📈' : '📉'}</td>
      `;
      tbody.appendChild(tr);
    });
  })
  .catch(() => console.warn('Could not load Reddit data.'));

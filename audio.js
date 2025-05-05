<script src="//cdnjs.cloudflare.com/ajax/libs/annyang/2.6.1/annyang.min.js"></script>
if (annyang) {
    const cmds = {
      'hello': () => alert('Hello World'),
      'change the color to *color': (color) => document.body.style.backgroundColor = color,
      'navigate to *page': (page) => {
        const p = page.toLowerCase();
        if (['home','stocks','dogs'].includes(p)) {
          window.location.href = `${p}.html`;
        }
      },
      'lookup *ticker': (tk) => {
        if (window.location.pathname.endsWith('stocks.html')) {
          document.getElementById('ticker').value = tk.toUpperCase();
          document.getElementById('range').value = '30';
          document.getElementById('get-data').click();
        }
      },
      'load dog breed *breed': (b) => {
        if (window.location.pathname.endsWith('dogs.html')) {
          const btns = Array.from(document.querySelectorAll('#breed-buttons button'));
          const match = btns.find(btn => btn.textContent.toLowerCase() === b.toLowerCase());
          if (match) match.click();
        }
      }
    };
    annyang.addCommands(cmds);
  }
  
  document.getElementById('start-audio').addEventListener('click', () => annyang && annyang.start());
  document.getElementById('stop-audio').addEventListener('click', () => annyang && annyang.abort());
  
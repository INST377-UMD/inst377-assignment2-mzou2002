// 1) Random images carousel
fetch('https://dog.ceo/api/breeds/image/random/10')
  .then(r => r.json())
  .then(data => {
    const slider = document.getElementById('dog-slider');
    data.message.forEach(src => {
      const img = document.createElement('img');
      img.src = src;
      slider.appendChild(img);
    });
    new Slider('#dog-slider');
  });

// 2) Load breeds list
fetch('https://dog.ceo/api/breeds/list/all')
  .then(r => r.json())
  .then(data => {
    const container = document.getElementById('breed-buttons');
    Object.keys(data.message).forEach(breed => {
      const btn = document.createElement('button');
      btn.textContent = breed;
      btn.className = 'btn';
      btn.setAttribute('data-breed', breed);
      btn.onclick = () => loadBreedInfo(breed);
      container.appendChild(btn);
    });
  });

// 3) On‑demand breed info
function loadBreedInfo(breed) {
  fetch(`https://api.thedogapi.com/v1/breeds/search?q=${breed}`)
    .then(r => r.json())
    .then(arr => {
      if (!arr.length) throw new Error();
      const info = arr[0];
      // parse life span "10 - 12 years"
      const [min, max] = info.life_span.replace(' years','').split(' - ').map(n=>n.trim());
      document.getElementById('breed-info').innerHTML = `
        <h2>${info.name}</h2>
        <p><strong>Description:</strong> ${info.temperament || 'n/a'}</p>
        <p><strong>Min Life:</strong> ${min}</p>
        <p><strong>Max Life:</strong> ${max}</p>
      `;
    })
    .catch(() => {
      document.getElementById('breed-info').textContent = 'Could not load info.';
    });
}

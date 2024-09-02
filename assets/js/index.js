document.body.addEventListener('mouseover', mostrarCarta);

function mostrarCarta(e) {
  const t = e.target;
  if (t.classList.contains('uno')) {
    const category = e.target.dataset.categoria
    const tarjeta = document.getElementById(category)
    const howMany = tarjeta.children.length;
    if (howMany < 5) {
      
      const urls = Array.from({ length: 5 }, (_, i) => `https://swapi.dev/api/people/${i + 1}/`);
      const renderedData = [];                  // un arreglo donde se podria almacenar toda la data necesaria.
      const fetchAllData = async () => {
        try {
          const responses = await Promise.all(urls.map(url => fetch(url)));
          const data = await Promise.all(responses.map(response => response.json()));
          
          const filteredData = data.map(person => ({
            name: person.name,
            height: person.height + ' cms.',
            mass: person.mass + ' kgs.'
          }));
          
          renderedData.push(...filteredData);     // arreglo con la misma data para otros usos.
          renderData(filteredData);
          
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
      
      fetchAllData();
      console.log(renderedData);
      console.log(e.name);
      
      function renderData(data) {
        data.forEach((e, i) => {
          const p = document.createElement('p');
          p.textContent = `${i+1}. ${e.name} - Estatura: ${e.height} Peso: ${e.mass}`;
          document.body.appendChild(p)
        })
      }

      let cardUno = `
        <div class=" uno single-timeline-content d-flex wow fadeInLeft" data-wow-delay="0.3s" style="visibility: visible; animation-delay: 0.3s; animation-name: fadeInLeft;">
          <div class="timeline-icon" style="background-color: rgb${category==="vip"? "(190, 13, 13)":category==="sec"? "(48, 185, 48)":"(0, 255, 255)"};"></div>
          <div class="timeline-text">
            <h6>${e.name}</h6>
            <p>Estatura: ${e.height} Peso: ${e.mass}</p>
          </div>
        </div>
      `;
      tarjeta.innerHTML += cardUno;
  }
 }
}


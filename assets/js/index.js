const urls = Array.from({ length: 15 }, (_, i) => `https://swapi.dev/api/people/${i + 1}/`);
const personajes = [];                 // un arreglo donde se podria almacenar toda la data necesaria (los 15.)
const inicios = {
    vip:0,
    sec:5,
    otros:10
}

const solicitarPersonajes = async () => {
  try {
    const respuesta = await Promise.all(urls.map(url => fetch(url)));
    const data = await Promise.all(respuesta.map(response => response.json()));
    
    const filteredData = data.map(person => ({ // crea un arreglo con los 3 datos obtenidos de la url swapi
      nombre: person.name,
      altura: person.height + ' cms.',
      peso: person.mass + ' kgs.'
    }));
    
    personajes.push(...filteredData);     // arreglo con la misma data para otros usos.
    
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

solicitarPersonajes();
console.log(personajes);


document.body.addEventListener('mouseover', mostrarCarta);

function mostrarCarta(e) {
  const t = e.target;
  if (t.classList.contains('uno')) {
    const category = e.target.dataset.categoria          // <p class="uno" data-categoria="vip">1 - 5</p>
    const tarjeta = document.getElementById(category)
    const howMany = tarjeta.children.length;
    if (howMany < 5) {
    

      let cardUno = `
        <div class=" uno single-timeline-content d-flex wow fadeInLeft" data-wow-delay="0.3s" style="visibility: visible; animation-delay: 0.3s; animation-name: fadeInLeft;">
          <div class="timeline-icon" style="background-color: rgb${category==="vip"? "(190, 13, 13)":category==="sec"? "(48, 185, 48)":"(0, 255, 255)"};"></div>
          <div class="timeline-text">
            <h6>${personajes[inicios[category] + howMany].nombre}</h6>
            <p>Estatura: ${personajes[inicios[category]+howMany].altura} Peso: ${personajes[inicios[category]+howMany].peso}</p>
          </div>
        </div>
      `;
      tarjeta.innerHTML += cardUno;
  }
 }
}


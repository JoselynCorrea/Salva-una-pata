let patas;
let filtro;

document.addEventListener('DOMContentLoaded', () => {
  setup();

  const inputBuscador = document.querySelector('.buscar');
  inputBuscador.addEventListener('input', handleBuscador);
});

function setup() {
  fetch('./mascotas.json')
    .then(resp => resp.json())
    .then(json => {
      patas = json;
      filtro = patas;
      renderMascotas(filtro);
    });
}

function handleBuscador(event) {
  const cadena = event.target.value.toLowerCase();
  let tmpArray = [];

  patas.forEach(mascota => {
    const descripcion = mascota.descripcion.toLowerCase();
    if (descripcion.includes(cadena)) {
      tmpArray.push(mascota);
    }
  });

  filtro = tmpArray;
  renderMascotas(filtro);
}

function renderMascotas(mascotas) {
  const contenedorMascotas = document.querySelector('.mascotas');
  contenedorMascotas.innerHTML = '';

  mascotas.forEach((item, i) => {
    const divMascota = document.createElement('div');
    divMascota.className = 'mascota';

    const img = document.createElement('img');
    img.className = 'imgprod';
    img.src = `./img/${item.url}`;
    divMascota.appendChild(img);

    const nombre = document.createElement('div');
    nombre.className = 'negritas';
    nombre.textContent = item.nombre;
    divMascota.appendChild(nombre);

    const edad = document.createElement('div');
    edad.textContent = `${item.edad} año(s)`;
    divMascota.appendChild(edad);

    const descripcion = document.createElement('div');
    descripcion.textContent = item.descripcion;
    divMascota.appendChild(descripcion);

    contenedorMascotas.appendChild(divMascota);
  });
}

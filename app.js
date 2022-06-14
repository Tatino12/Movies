

let pagina = 1;
const btnAnterior = document.getElementById('btnAnterior');
const btnSiguiente = document.getElementById('btnSiguiente');

btnSiguiente.addEventListener('click', () => { //con esto le digo que cuando clickea el usuario avance una pagina
	if(pagina < 1000) { //en la documentacion de la api dice que tiene un total de 1000 paginas, por eso si llega a la 1000 no queremos que siga cargando peliculas, ni avanzando a una pagina inexistente.
	pagina += 1; //o pagina = pagina + 1;
	cargarPeliculas(); //para que me carguen todas las paginas siguientes. 
	}
})


btnAnterior.addEventListener('click', () => {  
	if(pagina > 1) { 
	pagina -= 1; 
	cargarPeliculas(); 
	}
})

const cargarPeliculas = async () => { // me conecto con la API
	try {

		const respuesta = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=633a6e435fa383755f12ac9d223c9bb8&language=es-ES&page=${pagina}`);
	
		//si la respuesta es correcta
		if(respuesta.status === 200){

			//accedo a la info
			const datos = await respuesta.json(); //la peticion nos devuelve un json y la guardo en la variable datos
			
			let peliculas = '';
			datos.results.forEach(pelicula => {
				peliculas += `
				<div class="pelicula">
					<img class="poster" src="https://image.tmdb.org/t/p/w500/${pelicula.poster_path}">
					<h3 class="titulo">${pelicula.title}</h3>
				</div>
				`;
			});


			document.getElementById('contenedor').innerHTML = peliculas;

		} else if(respuesta.status === 401) {
			console.log("Has puesto equivocadamente tu pelicula")
		} else if(respuesta.status === 404) {
			console.log("Tu pelicula que buscas no existe")
		} else {
			console.log("Estamos en problemas Houston")
		}


	} catch(error) {
		console.log(error);
	}
}

cargarPeliculas(); // al cargar mi pagina quiero ejecutar esta funcion para que me carguen las peliculas

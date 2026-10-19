/**************************************************
 * DATOS INICIALES
 **************************************************/

const films = [
    {
        title: "Interstellar",
        date: 2014,
        director: "Christopher Nolan",
        genre: "Ciencia Ficcion"
    },
    {
        title: "The Truman Show",
        date: 1998,
        director: "Peter Weir",
        genre: "Comedia"
    },
    {
        title: "Alien",
        date: 1979,
        director: "Ridley Scott",
        genre: "Terror"
    },
    {
        title: "Gladiator",
        date: 2000,
        director: "Ridley Scott",
        genre: "Accion"
    },
    {
        title: "Oppenheimer",
        date: 2023,
        director: "Christopher Nolan",
        genre: "Drama"
    }
];


/**************************************************
 * PINTAR TABLA PRINCIPAL
 **************************************************/

function renderFilmList(filmData) {
    const filmList = document.getElementById("films");

    filmList.innerHTML = "";

    filmData.forEach((film) => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${film.title}</td>
            <td>${film.date}</td>
            <td>${film.director}</td>
            <td>${film.genre}</td>
            
        `;

        filmList.appendChild(row);
    });
}


/**************************************************
 * AÑADIR PELÍCULA
 **************************************************/

document.getElementById("film-form").addEventListener("submit", (event) => {
    event.preventDefault();

    const title = document.getElementById("title").value.trim();
    const date = parseInt(document.getElementById("date").value, 10);
    const director = document.getElementById("director").value.trim();
    const genre = document.getElementById("genre").value;

    if (
        title &&
        !Number.isNaN(date) &&
        director &&
        genre
    ) {
        const newFilm = {
            title,
            date,
            director,
            genre
        };

        films.push(newFilm);

        applyFilters();

        event.target.reset();
    }
});


/**************************************************
 * BUSCAR POR TÍTULO
 **************************************************/

function filterByTitle(title) {
    return films.filter((film) =>
        film.title
            .toLowerCase()
            .includes(title.toLowerCase())
    );
}


/**************************************************
 * PINTAR RESULTADOS DE BÚSQUEDA EN UNA TABLA
 **************************************************/

function renderSearchResults(filmData) {
    const filteredFilm = document.getElementById("filtered-film");

    filteredFilm.innerHTML = "";

    if (filmData.length === 0) {
        const message = document.createElement("p");
        message.textContent = "No se han encontrado películas.";

        filteredFilm.appendChild(message);

        return;
    }

    const table = document.createElement("table");

    const thead = document.createElement("thead");

    thead.innerHTML = `
        <tr>
            <th>Título</th>
            <th>Fecha</th>
            <th>Director/a</th>
            <th>Género</th>
        </tr>
    `;

    const tbody = document.createElement("tbody");

    filmData.forEach((film) => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${film.title}</td>
            <td>${film.date}</td>
            <td>${film.director}</td>
            <td>${film.genre}</td>
        `;

        tbody.appendChild(row);
    });

    table.appendChild(thead);
    table.appendChild(tbody);

    filteredFilm.appendChild(table);
}


/**************************************************
 * BOTÓN BUSCAR POR TÍTULO
 **************************************************/

document
    .getElementById("title-search-button")
    .addEventListener("click", () => {
        const title = document
            .getElementById("title-filter")
            .value
            .trim();

        const filteredFilms = filterByTitle(title);

        renderSearchResults(filteredFilms);
    });


/**************************************************
 * BOTÓN LIMPIAR BÚSQUEDA
 **************************************************/

document
    .getElementById("title-clear-button")
    .addEventListener("click", () => {
        document.getElementById("title-filter").value = "";
        document.getElementById("filtered-film").innerHTML = "";
    });


/**************************************************
 * FILTROS COMBINADOS
 **************************************************/

function filterFilms(filterDate, filterGenre, searchDirector) {
    return films.filter((film) => {
        const dateMatches =
            filterDate === "all" ||
            film.date === parseInt(filterDate, 10);

        const genreMatches =
            filterGenre === "all" ||
            film.genre === filterGenre;

        const directorMatches =
            searchDirector === "" ||
            film.director
                .toLowerCase()
                .includes(searchDirector.toLowerCase());

        return (
            dateMatches &&
            genreMatches &&
            directorMatches
        );
    });
}


/**************************************************
 * APLICAR FILTROS COMBINADOS
 **************************************************/

function applyFilters() {
    const dateFilter = document.getElementById("date-filter").value;
    const genreFilter = document.getElementById("genre-filter").value;

    const directorSearch = document
        .getElementById("director-search")
        .value
        .trim();

    const filteredFilms = filterFilms(
        dateFilter,
        genreFilter,
        directorSearch
    );

    renderFilmList(filteredFilms);
}


/**************************************************
 * EVENTOS DE LOS FILTROS
 **************************************************/

document
    .getElementById("date-filter")
    .addEventListener("change", applyFilters);

document
    .getElementById("genre-filter")
    .addEventListener("change", applyFilters);

document
    .getElementById("director-search")
    .addEventListener("input", applyFilters);


/**************************************************
 * CARGA INICIAL
 **************************************************/

document.addEventListener("DOMContentLoaded", () => {
    renderFilmList(films);
});
<td>
                <button class="delete-button">Eliminar</button>
                <button class="edit-button">Editar</button>
            </td>

        /******************************************
         * ELIMINAR PELÍCULA
         ******************************************/

        const deleteButton = row.querySelector(".delete-button");

        deleteButton.addEventListener("click", () => {
            const filmIndex = films.indexOf(film);

            if (filmIndex !== -1) {
                films.splice(filmIndex, 1);
            }

            applyFilters();
        });


        /******************************************
         * EDITAR PELÍCULA
         ******************************************/

        const editButton = row.querySelector(".edit-button");

        editButton.addEventListener("click", () => {
            row.innerHTML = `
                <td>
                    <input
                        type="text"
                        name="title"
                        value="${film.title}"
                        required
                    >
                </td>

                <td>
                    <input
                        type="number"
                        name="date"
                        value="${film.date}"
                        required
                    >
                </td>

                <td>
                    <input
                        type="text"
                        name="director"
                        value="${film.director}"
                        required
                    >
                </td>

                <td>
                    <select name="genre">
                        <option value="Comedia">Comedia</option>
                        <option value="Ciencia Ficcion">Ciencia Ficcion</option>
                        <option value="Terror">Terror</option>
                        <option value="Drama">Drama</option>
                        <option value="Accion">Accion</option>
                    </select>
                </td>

                <td>
                    <button class="save-button">Guardar</button>
                </td>
            `;

            const titleInput = row.querySelector('[name="title"]');
            const dateInput = row.querySelector('[name="date"]');
            const directorInput = row.querySelector('[name="director"]');
            const genreSelect = row.querySelector('[name="genre"]');
            const saveButton = row.querySelector(".save-button");

            genreSelect.value = film.genre;

            saveButton.addEventListener("click", () => {
                const newTitle = titleInput.value.trim();
                const newDate = parseInt(dateInput.value, 10);
                const newDirector = directorInput.value.trim();
                const newGenre = genreSelect.value;

                if (
                    newTitle &&
                    !Number.isNaN(newDate) &&
                    newDirector &&
                    newGenre
                ) {
                    film.title = newTitle;
                    film.date = newDate;
                    film.director = newDirector;
                    film.genre = newGenre;

                    applyFilters();
                }
            });
        });
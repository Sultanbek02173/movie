import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { Link } from 'react-router-dom';

const MovieApp = () => {
    const [movies, setMovies] = useState([]);
    const [editMovieId, setEditMovieId] = useState(null);
    const [newMovie, setNewMovie] = useState({ title: '', year: '' });
    const [editedMovie, setEditedMovie] = useState({ title: '', year: '' });

    useEffect(() => {
        fetchMovies();
    }, []);

    const fetchMovies = () => {
        axios.get('http://localhost:5000/movies')
        .then(response => setMovies(response.data))
        .catch(error => console.error(error));
    };

    const handleAddMovie = () => {
        addMovie(newMovie);
    };

    const addMovie = (movie) => {
        axios.post('http://localhost:5000/movies', movie)
        .then(() => {
            fetchMovies();
            setNewMovie({ title: '', year: '' });
        })
        .catch(error => console.error(error));
    };

    const handleEditClick = (movie) => {
        setEditMovieId(movie.id);
        setEditedMovie({ title: movie.title, year: movie.year });
    };

    const handleUpdateMovie = (id) => {
        updateMovie(id, editedMovie);
    };

    const updateMovie = (id, updatedData) => {
        axios.patch(`http://localhost:5000/movies/${id}`, updatedData)
        .then(() => {
            fetchMovies();
            setEditMovieId(null);
        })
        .catch(error => console.error(error));
    };

    const handleDeleteMovie = (id) => {
        deleteMovie(id);
    };

    const deleteMovie = (id) => {
        axios.delete(`http://localhost:5000/movies/${id}`)
        .then(() => fetchMovies())
        .catch(error => console.error(error));
    };
    return (
        <div className="container">
            <h1>Movies</h1>
                <ul>
                    {movies.map(movie => (
                    <li key={movie.id}>
                        {editMovieId === movie.id ? (
                        <div>
                            <input
                            type="text"
                            value={editedMovie.title}
                            onChange={(e) => setEditedMovie({ ...editedMovie, title: e.target.value })}
                            />
                            <input
                            type="text"
                            value={editedMovie.year}
                            onChange={(e) => setEditedMovie({ ...editedMovie, year: e.target.value })}
                            />
                            <button onClick={() => handleUpdateMovie(movie.id)}>Save</button>
                            <button onClick={() => setEditMovieId(null)}>Cancel</button>
                        </div>
                        ) : (
                        <div>
                            <Link to={`/description/${movie.id}`}>
                                {movie.title} ({movie.year})
                            </Link>
                            <div>
                                <button onClick={() => handleEditClick(movie)}>Edit</button>
                                <button onClick={() => handleDeleteMovie(movie.id)}>Delete</button>
                            </div>
                        </div>
                        )}
                    </li>
                    ))}
                </ul>

                <h2>Add a new movie</h2>
                <div className="add-movie">
                    <input
                    type="text"
                    placeholder="Title"
                    value={newMovie.title}
                    onChange={(e) => setNewMovie({ ...newMovie, title: e.target.value })}
                    />
                    <input
                    type="text"
                    placeholder="Year"
                    value={newMovie.year}
                    onChange={(e) => setNewMovie({ ...newMovie, year: e.target.value })}
                    />
                    <button onClick={handleAddMovie}>Add Movie</button>
                </div>
        </div>
    );
}

export default MovieApp;

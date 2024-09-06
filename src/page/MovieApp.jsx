import React, { useEffect, useState } from 'react';
import axios from 'axios'

const MovieApp = () => {
    const [movie, setMovie] = useState([]);

    useEffect(() => {
        fetchAPI();
    }, []);
    const fetchAPI = () => {
        axios.get('http://localhost:5000/movie')
        .then((res) => {
            setMovie(res.data);
        })
        .catch((err) => {
            console.log(err);
        })
    }

    const addMovie = () => {
        
    }

    const hundlerAddedMovie = () => {

    }
    return (
        <div>
            <h1>Movies</h1>
            {
                movie && 
                movie.map((item) => (
                    <div key={item.id}>
                        <h1>{item.title}</h1>
                        <p>{item.year}</p>
                    </div>
                ))
            }
            <input type="text" />
            <input type="text" />
            <button onClick={hundlerAddedMovie}>Added movie</button>
        </div>
    );
}

export default MovieApp;

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

const MovieDescription = () => {
    const { id } = useParams();
    const [movies, setMovies] = useState(null);
    const [loading, setLoading] = useState(true);
    console.log(id);

    useEffect(() => {
        getAPI();
    })

    const getAPI = () => {
        axios.get(`http://localhost:5000/movies/${id}`)
        .then((data) => {
            setMovies(data.data);
            setLoading(false);            
        })
        .catch((err) => {
            console.log(err);
            setLoading(false);
        })
    }

    if(loading) {
        return <div>Loading...</div>
    }

    if(!movies){
        return <div>Movies not find</div>
    }
    
    return (
        <div>
            <h1>Вторая страница</h1>
            <div>
                <p><b>Название фильма: </b>{movies.title}</p>
                <p><b>Год выпуска: </b>{movies.year}</p>
            </div>
            <Link to={'/'}>Go home</Link>
        </div>
    );
}

export default MovieDescription;

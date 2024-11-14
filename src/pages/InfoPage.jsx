import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const apiKey = 'bc5cd60f55c078094358844a2b84851f';

export const InfoPage = () => {
    const { movieId } = useParams();
    const [movieDetails, setMovieDetails] = useState(null);

    useEffect(() => {
        const fetchMovieDetails = async () => {
            const movieDetailsUrl = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&language=en-US`;
            try {
                const response = await fetch(movieDetailsUrl);
                const data = await response.json();
                setMovieDetails(data);
            } catch (error) {
                console.error("Error fetching movie details:", error);
            }
        };

        if (movieId) {
            fetchMovieDetails();
        }
    }, [movieId]);

    if (!movieDetails) return <p>Loading movie details...</p>;

    return (
        <div>
            {/* Bouton Home en haut de la page */}
            <Link to="/">
                <button style={{ marginBottom: "20px", padding: "10px 20px", fontSize: "16px" }}>
                    Home
                </button>
            </Link>

            {/* Affichage des détails du film */}
            <h1>{movieDetails.title}</h1>
            <p>{movieDetails.overview}</p>
            <p>Release Date: {movieDetails.release_date}</p>
            <p>Runtime: {movieDetails.runtime} minutes</p>
            <p>Rating: {movieDetails.vote_average}/10</p>
            <img src={`https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`} alt={movieDetails.title} />
        </div>
    );
};

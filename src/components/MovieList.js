import React from 'react'
import MovieCard from './MovieCard'

const MovieList = ({ title, movies }) => {
    if (!movies) return null;
    return (
        <div className='px-6'>
            <h1 className='text-3xl py-4 text-white'>{title}</h1>
            <div>
                <div className='flex overflow-x-auto no-scrollbar space-x-4'>
                    {movies.map((movie) => (
                        <MovieCard key={movie.id} posterPath={movie.poster_path} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default MovieList

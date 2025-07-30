import React, { useRef } from 'react'
import lang from '../utils/languageConstants'
import { useDispatch, useSelector } from 'react-redux'
import openai from '../utils/openai'
import geminiai from '../utils/geminiai'
import { API_OPTIONS } from '../utils/constants'
import { addGptMovieResult } from '../utils/gptSlice'


const GptSearchBar = () => {

    const dispatch = useDispatch();

    const langKey = useSelector(store => store.config.lang);
    const searchText = useRef(null);

    const searchMovieTMDB = async (movie) => {
        const data = await fetch('https://api.themoviedb.org/3/search/movie?query=' + movie + '&include_adult=false&language=en-US&page=1', API_OPTIONS);
        const json = await data.json();
        return json.results;
    }

    const handleGeminiSearchClick = async () => {
        const geminiQuery = "Act as a Movie Recommendation System and suggest som emovies for the query : " + searchText.current.value + "only give me names of 5 movies, comma separated like the example result given ahead. Example Result: Gadar, Sholay, Main Khiladi Tu Anari, Don 2, Chennai Express"

        try {
            const response = await geminiai.models.generateContent({
                model: "gemini-2.5-flash",
                contents: [{ role: "user", parts: [{ text: geminiQuery }] }],
            });

            const resultText = response?.candidates?.[0]?.content?.parts?.[0]?.text;
            if (!resultText) {
                console.error("No text found in Gemini response");
                return;
            }

            console.log("Gemini raw output:", resultText);
            const geminiMovies = resultText.split(", ").map(movie => movie.trim());
            const promiseArray = geminiMovies.map(movie => searchMovieTMDB(movie));
            const tmdbResults = await Promise.all(promiseArray);
            console.log("TMDB Results:", tmdbResults);
            dispatch(addGptMovieResult({movieNames: geminiMovies, movieResults: tmdbResults}));
            

        } catch (error) {
            console.error("Error during Gemini search:", error);
        }
    }

    // const handleGptSearchClick = async () => {

    //     const gptQuery = "Act as a Movie Recommendation System and suggest som emovies for the query : " + searchText.current.value + "only give me names of 5 movies, comma separated like the example result given ahead. Example Result: Gadar, Sholay, Main Khiladi Tu Anari, Don 2, Chennai Express"

    //     const gptResults = await openai.chat.completions.create({
    //         model: 'gpt-3.5-turbo',
    //         messages: [{ role: 'user', content: gptQuery }],
    //     });
    //     console.log(gptResults.choices);
    // }

    return (
        <div className='pt-[5%] flex justify-center'>
            <form className='w-1/2 bg-black grid grid-cols-12' onSubmit={(e) => e.preventDefault()}>
                <input ref={searchText} type='text' className='p-4 m-4 col-span-9' placeholder={lang[langKey].GptSearchPlaceHolder} />
                <button className='col-span-3 py-2 px-4 m-4 bg-red-700 text-white rounded-lg'
                    onClick={handleGeminiSearchClick}>{lang[langKey].search}
                </button>
            </form>
        </div>
    )
}

export default GptSearchBar

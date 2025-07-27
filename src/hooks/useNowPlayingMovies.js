import { useEffect } from "react";
import { API_OPTIONS, url } from "../utils/constants";
import { addNowPlayingMovies } from "../utils/moviesSlice";
import { useDispatch } from "react-redux";

const useNowPlayingMovies = () => {

    const dispatch = useDispatch();

    const getNowPLayingMovies = async () => {
        const data = await fetch(url, API_OPTIONS)
        const json = await data.json();
        dispatch(addNowPlayingMovies(json.results));
    }

    useEffect(() => {
        getNowPLayingMovies();
    }, [])
}

export default useNowPlayingMovies;
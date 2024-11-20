import { useState, useEffect } from "react";

export function useMovies(query, callback) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const key = "198730f3";

  useEffect(
    function () {
      callback?.();
      const controller = new AbortController();

      setIsLoading(true);
      async function fetchMovieData() {
        try {
          const res = await fetch(
            `http://www.omdbapi.com/?apikey=${key}&s=${query}`,
            { signal: controller.signal }
          );
          if (!res.ok) {
            throw new Error("Something Went wrong ehile Wetching Movie Data");
          }
          const data = await res.json();
          if (data.response === "false") {
            throw new Error("Movie not Found");
          }
          setMovies(data.Search);
        } catch (err) {
          if (err.name !== "AbortError") setError(err.message);
        } finally {
          setIsLoading(false);
        }
      }
      //   handleCloseMovie();
      fetchMovieData();
      return function () {
        controller.abort();
      };
    },
    [query]
  );
  return { movies, isLoading, error };
}

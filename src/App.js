import { useEffect, useRef, useState } from "react";
import StarRaring from "./StarRating";
import { useMovies } from "./useMovies";
const tempMovieData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
  },
  {
    imdbID: "tt0133093",
    Title: "The Matrix",
    Year: "1999",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
  },
  {
    imdbID: "tt6751668",
    Title: "Parasite",
    Year: "2019",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
  },
];

const tempWatchedData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
    runtime: 148,
    imdbRating: 8.8,
    userRating: 10,
  },
  {
    imdbID: "tt0088763",
    Title: "Back to the Future",
    Year: "1985",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
    runtime: 116,
    imdbRating: 8.5,
    userRating: 9,
  },
];

const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

function Logo() {
  return (
    <div className="logo">
      <span role="img">🍿</span>
      <h1>usePopcorn</h1>
    </div>
  );
}

function Searchbar({ setQuery, query }) {
  const inputel = useRef(null);

  useEffect(
    function () {
      function callback(e) {
        if (document.activeElement === inputel.current) return;
        if (e.code === "Enter") {
          inputel.current.focus();
          setQuery("");
        }
      }
      document.addEventListener("keydown", callback);

      return () => document.addEventListener("keydown", callback);
    },
    [setQuery]
  );

  const handleChangeEvent = (e) => {
    e.preventDefault();
    setQuery(e.target.value);
  };

  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => handleChangeEvent(e)}
      ref={inputel}
    />
  );
}

function NumResult({ movies }) {
  return (
    <p className="num-results">
      Found <strong>{movies?.length}</strong> results
    </p>
  );
}

function NavBar({ children }) {
  return <nav className="nav-bar">{children}</nav>;
}

function Movie({ movie, handleSelectedMovie }) {
  return (
    <li
      className="list list-movies"
      onClick={() => handleSelectedMovie(movie.imdbID)}
    >
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>🗓</span>
          <span>{movie.Year}</span>
        </p>
      </div>
    </li>
  );
}
function MovieList({ movies, handleSelectedMovie }) {
  return (
    <ul className="list">
      {movies?.map((movie) => (
        <Movie
          movie={movie}
          key={movie.imdbID}
          handleSelectedMovie={handleSelectedMovie}
        />
      ))}
    </ul>
  );
}

function Box({ children }) {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div className="box">
      <button className="btn-toggle" onClick={() => setIsOpen((open) => !open)}>
        {isOpen ? "–" : "+"}
      </button>
      {isOpen && children}
    </div>
  );
}

function WatchMovieSummary({ watched }) {
  const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
  const avgUserRating = average(watched.map((movie) => movie.userRating));
  const avgRuntime = average(watched.map((movie) => movie.runtime));

  return (
    <div className="summary">
      <h2>Movies you watched</h2>
      <div>
        <p>
          <span>#️⃣</span>
          <span>{watched.length} movies</span>
        </p>
        <p>
          <span>⭐️</span>
          <span>{avgImdbRating.toFixed(2)}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{avgUserRating.toFixed(2)}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{avgRuntime} min</span>
        </p>
      </div>
    </div>
  );
}

function WatchedMovie({ movie, handleDeleteWatchMovie }) {
  return (
    <li>
      <img src={movie.poster} alt={`${movie.title} poster`} />
      <h3>{movie.title}</h3>
      <div>
        <p>
          <span>⭐️</span>
          <span>{movie.imdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{movie.userRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{movie.runtime} min</span>
        </p>
      </div>
      <button
        className="btn-delete"
        onClick={() => handleDeleteWatchMovie(movie.imdbid)}
      >
        X
      </button>
    </li>
  );
}
function WatchMovieList({ watched, handleDeleteWatchMovie }) {
  return (
    <ul className="list">
      {watched.map((movie) => (
        <WatchedMovie
          movie={movie}
          key={movie.imdbID}
          handleDeleteWatchMovie={handleDeleteWatchMovie}
        />
      ))}
    </ul>
  );
}

function WatchedMovieBox() {
  const [isOpen2, setIsOpen2] = useState(true);

  return (
    <div className="box">
      <button
        className="btn-toggle"
        onClick={() => setIsOpen2((open) => !open)}
      >
        {isOpen2 ? "–" : "+"}
      </button>
      {isOpen2 && <></>}
    </div>
  );
}

function Main({ children }) {
  return <main className="main">{children}</main>;
}

function Loader() {
  return <p className="laoder">Loading...</p>;
}
function Showerror({ message }) {
  return (
    <p className="error">
      <span>🛑</span>
      {message}
    </p>
  );
}

function MovieDetails({
  selectedID,
  handleCloseMovie,
  handleAddWatchMovie,
  watched,
}) {
  const [movie, setMovie] = useState({});
  const [isMovieLoading, setIsMovieLoading] = useState(false);
  const [userRating, setUserRating] = useState("");

  const countRef = useRef(0);

  useEffect(
    function () {
      if (userRating) countRef.current++;
    },
    [userRating]
  );

  const isWatched = watched.map((movie) => movie.imdbid).includes(selectedID);
  const watchedRating = watched.find(
    (movie) => movie.imdbid === selectedID
  )?.userRating;

  console.log(isWatched);
  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
  } = movie;

  function handleAdd() {
    const newWatchedMovie = {
      imdbid: selectedID,
      title,
      year,
      poster,
      imdbRating: Number(imdbRating),
      runtime: Number(runtime.split(" ").at(0)),
      userRating,
      CountRatngDicision: countRef.current,
    };
    handleAddWatchMovie(newWatchedMovie);
    handleCloseMovie();
  }

  const key = "198730f3";
  useEffect(
    function () {
      async function getMovieData() {
        setIsMovieLoading(true);
        try {
          const res = await fetch(
            `http://www.omdbapi.com/?apikey=${key}&i=${selectedID}`
          );
          const data = await res.json();
          // setMovie(data);
          console.log(data);
          setMovie(data);
          setIsMovieLoading(false);

          if (!res.ok) {
            throw new Error("Something Went wrong while Wetching Movie Data");
          }
        } catch (err) {}
      }
      getMovieData();
    },
    [selectedID]
  );

  useEffect(
    function () {
      if (!title) return;
      document.title = `Movie | ${title}`;

      return function () {
        document.title = "usePopCorn";
      };
    },
    [title]
  );

  useEffect(
    function () {
      function callback(e) {
        if (e.code === "Escape") {
          handleCloseMovie();
        }
      }
      document.addEventListener("keydown", callback);

      return function () {
        document.removeEventListener("keydown", callback);
      };
    },
    [handleCloseMovie]
  );
  return (
    <div className="details">
      {isMovieLoading ? (
        <Loader />
      ) : (
        <>
          {" "}
          <header>
            <button
              className="btn-back"
              onClick={() => handleCloseMovie(movie)}
            >
              &larr;
            </button>
            <img src={poster} alt={`poster of ${movie} movie`} />
            <div className="details-overview">
              <h2>{title}</h2>
              <p>
                {released} &bull; {runtime}
              </p>
              <p>{genre}</p>
              <p>
                <span>⭐</span>
                {imdbRating} IMDB Rating
              </p>
            </div>
          </header>
          <section className="section">
            <div className="rating">
              {!isWatched ? (
                <>
                  <StarRaring
                    maxRating={10}
                    size={24}
                    onSetRating={setUserRating}
                  />
                  {userRating > 0 ? (
                    <button className="btn-add" onClick={() => handleAdd()}>
                      + add to WatchList
                    </button>
                  ) : (
                    <></>
                  )}{" "}
                </>
              ) : (
                <p> you rated this movie {watchedRating}</p>
              )}
            </div>
            <p>
              <em>{plot}</em>{" "}
            </p>

            <p>starring {actors}</p>

            <p>Directed By : {director}</p>
          </section>
        </>
      )}
    </div>
  );
}

export default function App() {
  const [query, setQuery] = useState("");
  const [selectedMovieID, setSelectedMovie] = useState(null);
  // const [watched, setWatched] = useState([]);
  const [watched, setWatched] = useState(() => {
    const storedvalue = localStorage.getItem("WatchedMovie");
    return JSON.parse(storedvalue);
  });

  function handleSelectedMovie(id) {
    setSelectedMovie(id === selectedMovieID ? null : id);
  }

  function handleCloseMovie() {
    setSelectedMovie(null);
  }

  function handleAddWatchMovie(movie) {
    setWatched((watched) => [...watched, movie]);
  }

  function handleDeleteWatchMovie(id) {
    setWatched((watched) => watched.filter((movie) => movie.imdbid !== id));
  }

  const key = "198730f3";
  // useEffect(() => {
  //   fetch(`http://www.omdbapi.com/?apikey=${key}&s=interstellar`)
  //     .then((res) => res.json())
  //     .then((data) => setMovies(data.Search));
  // }, []);

  const { movies, isLoading, error } = useMovies(query, handleCloseMovie);

  useEffect(
    function () {
      localStorage.setItem("WatchedMovie", JSON.stringify(watched));
    },
    [watched]
  );
  return (
    <>
      <NavBar>
        <Logo />
        <Searchbar setQuery={setQuery} query={query} />
        <NumResult movies={movies} />
      </NavBar>
      <Main>
        <Box>
          {isLoading && <Loader />}
          {!isLoading && !error && (
            <MovieList
              movies={movies}
              handleSelectedMovie={handleSelectedMovie}
            />
          )}
          {error && <Showerror message={error} />}
        </Box>
        <Box>
          {selectedMovieID ? (
            <MovieDetails
              selectedID={selectedMovieID}
              handleCloseMovie={handleCloseMovie}
              handleAddWatchMovie={handleAddWatchMovie}
              watched={watched}
            />
          ) : (
            <>
              <WatchMovieSummary watched={watched} />
              <WatchMovieList
                watched={watched}
                handleDeleteWatchMovie={handleDeleteWatchMovie}
              />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}

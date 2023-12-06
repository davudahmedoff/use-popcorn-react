import Navbar from "./components/Navbar";
import Main from "./components/Main";
import Logo from "./components/Logo";
import Search from "./components/Search";
import NumResult from "./components/NumResult";
import Box from "./components/Box";
import WatchedSummary from "./components/WatchedSummary";
import WatchedMovieList from "./components/WatchedMovieList";

import { useEffect, useState } from "react";
import MovieList from "./components/MovieList";
import Loader from "./components/Loader";
import { ErrorMesage } from "./components/ErrorMessage";
import MovieDetails from "./components/MovieDetails";



const KEY = "f84fc31d";

export default function App() {
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [query, setQuery] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  // const queryTemp = "interstellar";

  const handleSelectMovie = (id) => {
    setSelectedId((selectedId) => (id === selectedId ? null : id));
  };
  const onCloseMovie = () => {
    setSelectedId(null);
  };

  const handleAddWathed = (movie) => {
    setWatched((watched) => [...watched, movie]);

    localStorage.setItem("watched", JSON.stringify([...watched,movie]));
  };

  const handleDeleteWatched = (id) => {
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
  };

  useEffect(() => {
    const controller = new AbortController();
    async function fetcMovies() {
      try {
        setIsLoading(true);
        setError("");
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
          { signal: controller.signal }
        );
        if (!res.ok)
          throw new Error("Something went wrong with fetching movies");

        const data = await res.json();
        if (data.Response === "False") {
          throw new Error("Movie not found");
        }

        setMovies(data.Search);
        setError("");
      } catch (error) {
        if (error.name !== "AbortError") {
          setError(error.message);
        }
      } finally {
        setIsLoading(false);
      }

      if (query.length < 3) {
        setMovies([]);
        setError("");
        return;
      }
    }
    fetcMovies();
    return function () {
      controller.abort();
    };
  }, [query]);

  return (
    <>
      <Navbar>
        <Logo />
        <Search query={query} setQuery={setQuery} />
        <NumResult movies={movies} />
      </Navbar>
      <Main>
        {/* <Box>{isLoading ? <Loader /> : <MovieList movies={movies} />}</Box> */}
        <Box>
          {isLoading && <Loader />}
          {!isLoading && !error && (
            <MovieList movies={movies} handleSelectMovie={handleSelectMovie} />
          )}
          {error && <ErrorMesage message={error} />}
        </Box>
        <Box>
          <>
            {selectedId ? (
              <MovieDetails
                selectedId={selectedId}
                watched={watched}
                handleAddWathed={handleAddWathed}
                onCloseMovie={onCloseMovie}
              />
            ) : (
              <>
                <WatchedSummary watched={watched} />
                <WatchedMovieList
                  watched={watched}
                  onDeleteWatched={handleDeleteWatched}
                />
              </>
            )}
          </>
        </Box>
      </Main>
    </>
  );
}

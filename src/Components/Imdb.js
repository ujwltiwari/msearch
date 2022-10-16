import { useState, useEffect } from "react";
import axios from "axios";

const Imdb = () => {
  const [movie, setMovie] = useState([]);
  const [searchKey, setSearchKey] = useState("");
  const [searchBtn, setSearchBtn] = useState(false);

  useEffect(() => {
    const handleApi = async () => {
      let data = await axios.get(
        searchBtn === true
          ? `http://www.omdbapi.com/?i=${searchKey}&apikey=695a8435&plot=full`
          : `http://www.omdbapi.com/?t=${searchKey}&apikey=695a8435&plot=full`
      );
      setMovie([data.data]);
    };

    handleApi();
  }, [searchKey, searchBtn]);

  useEffect(() => {
    const fetchData = async () => {
      let data = await axios.get(
        `http://www.omdbapi.com/?i=${searchKey}&apikey=695a8435&plot=full`
      );
      setMovie([data.data]);
    };
    fetchData();
  }, []);

  let movieData = movie[0];
  return (
    <>
      <nav className="navbar bg-dark">
        <div className="container-fluid">
          <span className="navbar-brand mb-0 h1 text-light lead text-center">
            <a className="text-light" href="/">
              Movie Data Generator
            </a>
          </span>
        </div>
      </nav>
      <div className="container">
        <div className="input-group mb-3 mt-4">
          <input
            type="text"
            className="form-control inputbox searchBox"
            placeholder="Enter Movie Name to Search ..."
            aria-label="Recipient's username"
            aria-describedby="button-addon2"
            onChange={(e) => setSearchKey(e.target.value)}
          />
        </div>
        <div class="d-grid gap-2">
          <button
            type="button"
            className="btn btn-outline-danger text-center btn-lg"
            data-mdb-ripple-color="dark"
            onClick={() => setSearchBtn(!searchBtn)}
          >
            Enter IMDB ID to Search By ID
          </button>
        </div>{" "}
        <br />
        {movie.length === 0 ? (
          <>
            <h1 className="display-4 text-center">
              Enter IMDB ID to Get Started
            </h1>
          </>
        ) : movie[0].Response !== "False" ? (
          <div className="card mx-auto w-75" style={{ width: "18rem" }}>
            <div className="card-body">
              <p className="card-title lead">{movieData.Title}</p>
              <hr />
              <p className="lead">
                [imdb]https://imdb.com/title/{movieData.imdbID}[/imdb]
              </p>
              <hr />
              <p className="lead">{movieData.Genre}</p>
              <hr />
              <p className="lead">{movieData.Actors}</p>
              <hr />
              <p className="lead">{movieData.Year}</p>
              <hr />
              {/* {let run = movieData.Runtime} */}
              <p className="lead">{movieData.Runtime}</p>
              <hr />
              <p className="lead">{movieData.Plot}</p>
              <hr />
              <h1 className="text-center display-6">Poster</h1>
              <hr />
              <img
                className="mx-auto d-block"
                src={movieData.Poster}
                style={{ width: "auto", height: "auto", textAlign: "center" }}
              />
            </div>
          </div>
        ) : (
          <h1 className="display-4 text-center">
            {searchKey.length > 0
              ? `Enter Correct IMDB ID or Search Keyword`
              : `Enter IMDB ID to Get Started`}
          </h1>
        )}
      </div>
    </>
  );
};

export default Imdb;

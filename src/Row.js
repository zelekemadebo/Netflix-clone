import React, { useEffect, useState } from "react";
import "./Row.css";
import axios from "./axios";
import YouTube from 'react-youtube'
import movieTrailer from 'movie-trailer'
const base_url = "https://image.tmdb.org/t/p/original";
// const base_url="http://image.tmdb.org/t/p/w500/"

function Row({ title, fetchUrl, isLargeRow }) {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      // console.log(request);
      setMovies(request.data.results);
      return request;
    }
    fetchData();
  }, [fetchUrl]);

  // console.log(movies);
  

  const opts = {
    height:"390",
    width:"100%",
    playerVars:{autoplay:1,
    },
  }

  const handleClick = (movie) => {
	  if (trailerUrl) {
		setTrailerUrl("");
	  } else {
		movieTrailer(movie?.title || movie?.name || movie.original_name)
		  .then((url) => {
			const urlParams = new URLSearchParams(new URL(url).search);
			setTrailerUrl(urlParams.get("v"));
		  })
		  .catch((error) => console.log(error));
	  }
	};

  return (
    <div className="row">
      <h1>{title}</h1>
      <div className="row__posters">
        {movies.map((movie) => (
          <img key={movie.id} onClick={()=>handleClick(movie)}
            className={`row__poster ${isLargeRow && "row__posterLarge"}`}
            src={`${base_url}${
              isLargeRow ? movie.poster_path : movie.backdrop_path
            }`}
            alt={movie.name}
          />
        ))}
		<div style={{padding:"40px"}}>
        {trailerUrl&&<YouTube videoId={trailerUrl} opts={opts}/>}
      </div>
      </div>
    </div>
  );
}

export default Row;





































// import React, { useState, useEffect } from "react";
// import "./Row.css";
// import axios from "axios";
// // const base_url = 'https://api.themoviedb.org/t/p/original';

// function Row({ title, fetchUrl }) {
//   const [movies, setMovies] = useState([]);
//   useEffect(() => {
//     async function fetchData() {
//       const request = await axios.get(fetchUrl);
//       //   console.log(request);
//       setMovies(request.data.results);
//       return request;
//     }
//     fetchData();
//   }, [fetchUrl]);
//   //  console.log(movies);

//   return (
//     <div className="row">
//       <h1>{title}</h1>
//       <div className="row_posters">
//         {movies.map((movie) => {
//           // <img
//           //   className="row_poster"
//           //   src={`${base_url}${movie.poster_path}`}
//           //   alt={movie.name}
//           // />;
//         })}
//       </div>
//     </div>
//   );
// }

// export default Row;


import React, { useEffect, useState } from 'react'
import './Banner.css'
import axios from './axios';
import requests from './requests';
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";

function Banner1() {
    const [ movie, setMovie ] = useState([]); 
    const [ trailerUrl, setTrailerUrl ] = useState("");
	const [ status, setStatus ] = useState("play");


    useEffect(() => {
		async function fetchData() {
			const request = await axios.get(requests.fetchActionMovies);
			// console.log(request.data.results);
			setMovie(request.data.results[
					Math.floor(Math.random() * request.data.results.length)]);
			return request;
		}
		fetchData();
	}, []);
    // console.log(movie);
	function truncate(str, n) {
		return str?.length > n ? str.substr(0, n - 1) + "..." : str;
	};
	const opts = {
		height: "390",
		width: "100%",
		playerVars: {
		  autoplay: 1,
		},
	  };
	  const handleClick = (movie) => {
		if (trailerUrl) {
		  setTrailerUrl("");
		  setStatus("play")
		} else {
		  movieTrailer(movie?.original_name || movie?.title || "")
			.then((url) => {
			  const urlParams = new URLSearchParams(new URL(url).search);
			  setTrailerUrl(urlParams.get("v"));
		      setStatus("stop")

			})
			.catch((error) => console.log(error));
		}
	  };
	  console.log(trailerUrl)
  return (
    <header className="banner"
			style={{
				backgroundSize: "cover",
				backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
				backgroundPosition: "center center",
                }}>
				
			<div className="wrap">
			<div className="banner__contents">
				<h1 className="banner__title">
					{movie?.title || movie?.name || movie.original_name}
				</h1>
				<div className="banner__buttons">
					<button className="banner__button" onClick={() => handleClick(movie)} >{status}</button>
					<button className="banner__button">My List</button>
				</div>
				
				<h1 className="banner__description">
					{truncate(movie?.overview, 150)}
				</h1>
			</div>
			<div className="row__youtube">
				{trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
			</div>
			</div>
			<div className="banner__fadeBottom" />
			
		</header>
  )
}

export default Banner1
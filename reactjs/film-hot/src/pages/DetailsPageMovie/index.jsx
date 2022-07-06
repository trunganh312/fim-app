import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import moviesApi from "../../Api/moviesApi";
import Details from "../../features/Details";
function DetailsPageMovie(props) {
  let { movieId } = useParams();
  const [data, setData] = useState({});
  const [similar, setSimilar] = useState();
  const [cast, setCast] = useState([]);
  useEffect(() => {
    (async () => {
      const detailsMovie = await moviesApi.getDetail(movieId);
      const { results } = await moviesApi.getSimilar(movieId);
      const { cast } = await moviesApi.getCast(movieId);
      setData(detailsMovie);
      setSimilar(results);
      setCast(cast);
      console.log(detailsMovie);
    })();
  }, [movieId]);
  useEffect(() => {
    document.title = data.original_title;
  });
  console.log(data);
  return (
    <>
      <Details data={data} similar={similar} cast={cast} />
    </>
  );
}

export default DetailsPageMovie;

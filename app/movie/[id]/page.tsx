interface Id {
  id: string;
}

interface Genre {
  id: number;
  name: string;
}

interface MovieData {
  poster_path: string;
  genres: Genre[];
  title: string;
  overview: string;
  vote_average: number;
  runtime: number;
  release_date: string;
}

const Movie = async ({ params }: { params: Id }) => {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${params.id}?api_key=${process.env.API_KEY}`
  );
  const data: MovieData = await res.json();

  return (
    <div className="flex flex-col lg:flex-row items-center lg:mt-10 lg:justify-center">
      <img
        className="w-[70%] lg:w-[20%]"
        src={`https://image.tmdb.org/t/p/w500/${data.poster_path}`}
      />
      <div className="flex flex-col items-center lg:w-[50%]">
        <h1 className="font-bold text-2xl mb-1">{data.title}</h1>
        <p className="text-[#7c828f] mb-2">{data.vote_average.toFixed(1)}/10</p>
        <ul className="text-[#7c828f] flex justify-center space-x-3 flex-wrap w-[90%] mb-3">
          {data.genres.map((genre) => (
            <li className="hover:text-white" key={genre.id}>
              {genre.name}
            </li>
          ))}
        </ul>
        <p className="w-[80%] text-center mb-4">{data.overview}</p>
        <div className="flex space-x-32 text-[#7c828f]">
          <p>{data.release_date}</p>
          <p>{data.runtime} mins</p>
        </div>
      </div>
    </div>
  );
};

export default Movie;

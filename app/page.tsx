import Result from "./components/Results";

interface SearchResult {
  title: string;
  poster_path: string;
  id: number;
}

interface SearchResponse {
  results: SearchResult[];
}

const Home = async () => {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.API_KEY}`
  );
  const data: SearchResponse = await res.json();
  const movies = data.results;
  return (
    <div>
      <Result movies={movies} />
    </div>
  );
};

export default Home;

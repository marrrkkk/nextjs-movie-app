import Result from "@/app/components/Results";

  interface SearchResult {
    title: string;
    poster_path: string;
    id: number;
  }

  interface SearchResponse {
    results: SearchResult[];
  }

  interface Params {
    query: string;
  }

const SearchPage = async ({ params }: {params: Params}) => {
  const query = params.query;
  const res = await fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=${process.env.API_KEY}&query=` +
      encodeURIComponent(query)
  );
  const data: SearchResponse = await res.json();
  const movies = data.results;
  return (
    <div>
      {movies.length ? <Result movies={movies} /> : <p>No results found</p>}
    </div>
  );
};

export default SearchPage;

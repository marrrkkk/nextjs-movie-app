import Card from "./Card";
interface Movie {
  id: number;
  title: string;
  poster_path: string;
}

const Result = ({ movies }: { movies : Movie[]}) => {
  return (
    <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-5 lg:grid-cols-4 lg:gap-10">
      {movies && movies.map((movie) => (
        <Card key={movie.id} title={movie.title} image={movie.poster_path} id={movie.id} />
      ))}
    </div>
  );
};

export default Result;

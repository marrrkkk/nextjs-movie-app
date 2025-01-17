export interface Movie {
  id: number;
  title: string;
  poster_path: string | null;
  release_date: string;
  vote_average: number;
  overview: string;
}

export interface MovieResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export interface FilterState {
  year: number[];
  rating: number;
  genres: string[];
  sortBy: string;
  page: number;
  search: string;
}

export interface MovieDetails extends Movie {
  backdrop_path: string;
  runtime: number;
  genres: { id: number; name: string }[];
  tagline: string;
  status: string;
  budget: number;
  revenue: number;
  production_companies: { id: number; name: string; logo_path: string | null }[];
}

export interface CastMember {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
}

export interface MovieCredits {
  cast: CastMember[];
}

export interface SimilarMovie {
  id: number;
  title: string;
  poster_path: string | null;
  release_date: string;
}

export interface SimilarMoviesResponse {
  results: SimilarMovie[];
}


"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { Star, Clock, Calendar, DollarSign } from 'lucide-react';

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { BackButton } from "@/components/back-button";
import { MovieCard } from "@/components/movie-card";
import {
  MovieDetails,
  MovieCredits,
  SimilarMoviesResponse,
  CastMember,
  SimilarMovie,
} from "@/types/movie";

const TMDB_API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;

export default function MovieDetailsPage() {
  const { id } = useParams();
  const [movie, setMovie] = useState<MovieDetails | null>(null);
  const [credits, setCredits] = useState<MovieCredits | null>(null);
  const [similarMovies, setSimilarMovies] = useState<SimilarMovie[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovieData = async () => {
      try {
        setLoading(true);
        const [movieResponse, creditsResponse, similarResponse] =
          await Promise.all([
            fetch(
              `https://api.themoviedb.org/3/movie/${id}?api_key=${TMDB_API_KEY}&language=en-US`
            ),
            fetch(
              `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${TMDB_API_KEY}&language=en-US`
            ),
            fetch(
              `https://api.themoviedb.org/3/movie/${id}/similar?api_key=${TMDB_API_KEY}&language=en-US&page=1`
            ),
          ]);

        if (!movieResponse.ok || !creditsResponse.ok || !similarResponse.ok) {
          throw new Error("Failed to fetch movie data");
        }

        const movieData: MovieDetails = await movieResponse.json();
        const creditsData: MovieCredits = await creditsResponse.json();
        const similarData: SimilarMoviesResponse = await similarResponse.json();

        setMovie(movieData);
        setCredits(creditsData);
        setSimilarMovies(similarData.results.slice(0, 10));
      } catch (error) {
        console.error("Error fetching movie data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieData();
  }, [id]);

  if (loading) {
    return <MovieDetailsSkeleton />;
  }

  if (!movie || !credits) {
    return <div className="container mx-auto px-4 py-8">Movie not found</div>;
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <BackButton />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <Image
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            width={500}
            height={750}
            className="rounded-lg shadow-lg w-full h-auto"
          />
        </div>
        <div className="lg:col-span-2">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2">
            {movie.title}
          </h1>
          {movie.tagline && (
            <p className="text-lg sm:text-xl text-muted-foreground mb-4 italic">
              {movie.tagline}
            </p>
          )}
          <div className="flex flex-wrap items-center gap-2 mb-4 text-xs sm:text-sm text-muted-foreground">
            <div className="flex items-center mr-2">
              <Star className="w-4 h-4 sm:w-5 sm:h-5 fill-yellow-400 mr-1" />
              {movie.vote_average.toFixed(1)}
            </div>
            <div className="flex items-center mr-2">
              <Clock className="w-4 h-4 sm:w-5 sm:h-5 mr-1" />
              {movie.runtime} min
            </div>
            <div className="flex items-center mr-2">
              <Calendar className="w-4 h-4 sm:w-5 sm:h-5 mr-1" />
              {new Date(movie.release_date).getFullYear()}
            </div>
            <div>{movie.status}</div>
          </div>
          <div className="mb-4">
            {movie.genres.map((genre) => (
              <Button
                key={genre.id}
                variant="outline"
                className="mr-2 mb-2 text-xs sm:text-sm"
              >
                {genre.name}
              </Button>
            ))}
          </div>
          <p className="text-lg mb-6">{movie.overview}</p>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <h3 className="font-semibold">Budget</h3>
              <p>
                {movie.budget > 0 ? `$${movie.budget.toLocaleString()}` : "N/A"}
              </p>
            </div>
            <div>
              <h3 className="font-semibold">Revenue</h3>
              <p>
                {movie.revenue > 0
                  ? `$${movie.revenue.toLocaleString()}`
                  : "N/A"}
              </p>
            </div>
          </div>
          <h3 className="font-semibold mb-2 text-sm sm:text-base">Production Companies</h3>
          <div className="flex flex-wrap gap-2 sm:gap-4 mb-6">
            {movie.production_companies.map((company) => (
              <div key={company.id} className="flex items-center bg-muted rounded-md p-1 sm:p-2">
                {company.logo_path ? (
                  <Image
                    src={`https://image.tmdb.org/t/p/w200${company.logo_path}`}
                    alt={company.name}
                    width={50}
                    height={25}
                    className="mr-2 w-6 sm:w-8 h-auto"
                  />
                ) : (
                  <DollarSign className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                )}
                <span className="text-xs sm:text-sm">{company.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Separator className="my-8" />

      <h2 className="text-2xl font-bold mb-4">Cast</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {credits.cast.slice(0, 12).map((actor: CastMember) => (
          <div key={actor.id} className="space-y-2">
            <div className="overflow-hidden rounded-md aspect-[3/4]">
              <Image
                src={
                  actor.profile_path
                    ? `https://image.tmdb.org/t/p/w200${actor.profile_path}`
                    : "/placeholder.svg?height=300&width=200"
                }
                alt={actor.name}
                width={200}
                height={300}
                className="object-cover w-full h-full"
              />
            </div>
            <div className="space-y-1">
              <h3 className="font-medium text-sm leading-none truncate" title={actor.name}>
                {actor.name}
              </h3>
              <p className="text-xs text-muted-foreground truncate" title={actor.character}>
                {actor.character}
              </p>
            </div>
          </div>
        ))}
      </div>

      <Separator className="my-8" />

      <h2 className="text-2xl font-bold mb-4">Similar Movies</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-4">
        {similarMovies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}

function MovieDetailsSkeleton() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-1/3">
          <Skeleton className="w-full aspect-[2/3] rounded-lg" />
        </div>
        <div className="lg:w-2/3">
          <Skeleton className="h-10 w-3/4 mb-2" />
          <Skeleton className="h-6 w-1/2 mb-4" />
          <div className="flex gap-2 mb-4">
            <Skeleton className="h-8 w-20" />
            <Skeleton className="h-8 w-20" />
            <Skeleton className="h-8 w-20" />
          </div>
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-3/4 mb-6" />
          <div className="grid grid-cols-2 gap-4 mb-6">
            <Skeleton className="h-16 w-full" />
            <Skeleton className="h-16 w-full" />
          </div>
          <Skeleton className="h-8 w-40 mb-2" />
          <div className="flex flex-wrap gap-4 mb-6">
            <Skeleton className="h-10 w-32" />
            <Skeleton className="h-10 w-32" />
            <Skeleton className="h-10 w-32" />
          </div>
        </div>
      </div>
      <Skeleton className="h-8 w-40 my-8" />
      <div className="flex gap-4 overflow-x-auto pb-4">
        {[...Array(5)].map((_, i) => (
          <Skeleton key={i} className="w-[150px] h-[225px]" />
        ))}
      </div>
      <Skeleton className="h-8 w-40 my-8" />
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {[...Array(10)].map((_, i) => (
          <Skeleton key={i} className="w-full aspect-[2/3]" />
        ))}
      </div>
    </div>
  );
}


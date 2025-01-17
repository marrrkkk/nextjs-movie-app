import Image from "next/image"
import Link from "next/link"
import { Star } from 'lucide-react'
import { Movie, SimilarMovie } from "@/types/movie"
import { Card, CardContent } from "@/components/ui/card"

interface MovieCardProps {
  movie: Movie | SimilarMovie
}

export function MovieCard({ movie }: MovieCardProps) {
  return (
    <Link href={`/movies/${movie.id}`}>
      <Card className="overflow-hidden group cursor-pointer transition-transform hover:scale-105">
        <div className="relative aspect-[2/3]">
          <Image
            src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : "/placeholder.svg?height=300&width=200"}
            alt={movie.title}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
        <CardContent className="p-3">
          <h3 className="font-semibold text-sm truncate text-gray-100">{movie.title}</h3>
          <div className="flex items-center gap-2 mt-1 text-xs text-gray-300">
            {'vote_average' in movie && (
              <div className="flex items-center">
                <Star className="w-3 h-3 fill-yellow-500 mr-1" />
                {movie.vote_average.toFixed(1)}
              </div>
            )}
            {movie.release_date && (
              <div>{new Date(movie.release_date).getFullYear()}</div>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}


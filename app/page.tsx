'use client'

import { useCallback, useEffect, useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Search } from 'lucide-react'

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { MovieCard } from "@/components/movie-card"
import { Filters } from "@/components/filters"
import type { Movie, MovieResponse, FilterState } from "@/types/movie"

const TMDB_API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY || 'fallback_key'
const currentYear = new Date().getFullYear()

export default function MoviesPage() {
  const [movies, setMovies] = useState<Movie[]>([])
  const [filters, setFilters] = useState<FilterState>({
    year: [1900, currentYear],
    rating: 0,
    genres: [],
    sortBy: "popularity.desc",
    page: 1,
    search: "",
  })
  const [loading, setLoading] = useState(false)
  const [totalPages, setTotalPages] = useState(1)
  const searchParams = useSearchParams()
  const router = useRouter()

  const getMovies = useCallback(async () => {
    setLoading(true)
    const params = new URLSearchParams({
      api_key: TMDB_API_KEY,
      language: 'en-US',
      sort_by: filters.sortBy,
      'vote_average.gte': filters.rating.toString(),
      'primary_release_date.gte': `${filters.year[0]}-01-01`,
      'primary_release_date.lte': `${filters.year[1]}-12-31`,
      with_genres: filters.genres.join(','),
      page: filters.page.toString(),
      include_adult: 'false'
    })

    const searchQuery = filters.search
      ? `/search/movie?query=${encodeURIComponent(filters.search)}&`
      : '/discover/movie?'

    try {
      const res = await fetch(`https://api.themoviedb.org/3${searchQuery}${params}`)
      const data: MovieResponse = await res.json()
      setMovies(data.results)
      setTotalPages(Math.min(data.total_pages, 500)) // TMDB limits to 500 pages
    } catch (error) {
      console.error("Error fetching movies:", error)
    } finally {
      setLoading(false)
    }
  }, [filters, TMDB_API_KEY])

  useEffect(() => {
    getMovies()
  }, [getMovies])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setFilters(prev => ({ ...prev, search: prev.search, page: 1 }))
    router.push(`/?search=${encodeURIComponent(filters.search)}`)
  }

  const handleFilterChange = useCallback((updates: Partial<FilterState>) => {
    setFilters(prev => ({ ...prev, ...updates, page: 1 }))
    const searchParams = new URLSearchParams({
      search: filters.search,
      genres: filters.genres.join(','),
      sortBy: filters.sortBy,
      year: `${filters.year[0]},${filters.year[1]}`,
      rating: filters.rating.toString(),
    })
    router.push(`/?${searchParams.toString()}`)
  }, [router, filters])

  const handleClearFilters = () => {
    setFilters({
      year: [1900, currentYear],
      rating: 0,
      genres: [],
      sortBy: "popularity.desc",
      page: 1,
      search: "",
    })
    router.push("/")
  }

  return (
    <div className="flex flex-col md:flex-row gap-8">
      {/* Filters Sidebar */}
      <aside className="w-full md:w-64 md:sticky md:top-8 md:h-[calc(100vh-4rem)]">
        <Filters
          filters={filters}
          onFilterChange={handleFilterChange}
          onClearFilters={handleClearFilters}
        />
      </aside>

      {/* Main Content */}
      <main className="flex-1">
        {/* Search Bar */}
        <form onSubmit={handleSearch} className="flex gap-2 mb-8">
          <Input
            type="search"
            placeholder="Search movies..."
            value={filters.search}
            onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
            className="flex-grow"
          />
          <Button type="submit" className="shrink-0">
            <Search className="w-4 h-4 mr-2" />
            Search
          </Button>
        </form>

        {/* Results Count */}
        <div className="mb-6 text-gray-400">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <p>{movies.length} results</p>
          )}
        </div>

        {/* Movies Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center gap-4 mt-12">
          <Button
            variant="outline"
            disabled={filters.page === 1}
            onClick={() => setFilters(prev => ({ ...prev, page: prev.page - 1 }))}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            disabled={filters.page === totalPages}
            onClick={() => setFilters(prev => ({ ...prev, page: prev.page + 1 }))}
          >
            Next
          </Button>
        </div>
      </main>
    </div>
  )
}


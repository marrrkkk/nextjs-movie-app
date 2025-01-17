import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import type { FilterState } from "@/types/movie"

interface FiltersProps {
  filters: FilterState
  onFilterChange: (filters: Partial<FilterState>) => void
  onClearFilters: () => void
}

const genreOptions = [
  { id: 28, name: "Action" },
  { id: 18, name: "Drama" },
  { id: 35, name: "Comedy" },
  { id: 27, name: "Horror" },
  { id: 878, name: "Science Fiction" },
]

export function Filters({ filters, onFilterChange, onClearFilters }: FiltersProps) {
  const currentYear = new Date().getFullYear()

  return (
    <div className="space-y-8">
      <div>
        <h3 className="font-semibold mb-4 text-gray-200">Release Year</h3>
        <Slider
          min={1900}
          max={currentYear}
          step={1}
          value={filters.year}
          onValueChange={(value: number[]) => onFilterChange({ year: value })}
          className="mt-2"
        />
        <div className="flex justify-between mt-2 text-sm text-gray-400">
          <span>{filters.year[0]}</span>
          <span>{filters.year[1]}</span>
        </div>
      </div>

      <div>
        <h3 className="font-semibold mb-4 text-gray-200">Minimum Rating</h3>
        <Slider
          min={0}
          max={10}
          step={0.5}
          value={[filters.rating]}
          onValueChange={(value: number[]) => onFilterChange({ rating: value[0] })}
        />
        <div className="mt-2 text-sm text-gray-400">{filters.rating} stars</div>
      </div>

      <div>
        <h3 className="font-semibold mb-4 text-gray-200">Genres</h3>
        <div className="space-y-2">
          {genreOptions.map((genre) => (
            <div key={genre.id} className="flex items-center space-x-2">
              <Checkbox
                id={genre.id.toString()}
                checked={filters.genres.includes(genre.id.toString())}
                onCheckedChange={(checked: boolean) => {
                  if (checked) {
                    onFilterChange({ genres: [...filters.genres, genre.id.toString()] })
                  } else {
                    onFilterChange({
                      genres: filters.genres.filter((g: string) => g !== genre.id.toString()),
                    })
                  }
                }}
              />
              <Label htmlFor={genre.id.toString()} className="text-gray-300">{genre.name}</Label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-semibold mb-4 text-gray-200">Sort By</h3>
        <Select
          value={filters.sortBy}
          onValueChange={(value: string) => onFilterChange({ sortBy: value })}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select sort order" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="popularity.desc">Most Popular</SelectItem>
            <SelectItem value="vote_average.desc">Highest Rated</SelectItem>
            <SelectItem value="release_date.desc">Newest First</SelectItem>
            <SelectItem value="release_date.asc">Oldest First</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Button
        variant="outline"
        className="w-full text-gray-200 border-gray-700 hover:bg-gray-700"
        onClick={onClearFilters}
      >
        Clear all filters
      </Button>
    </div>
  )
}


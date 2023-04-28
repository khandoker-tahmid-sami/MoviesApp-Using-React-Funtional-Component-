import React, {useState, useEffect} from 'react'

import Pagination from './common/pagination'
import { paginate } from '../utils/paginate'
import ListGroup from './common/listgroup'
import MoviesTable from './moviesTable'
import { getMovies } from '../services/fakeMovieService'
import { getGenres } from '../services/fakeGenreService'
import lodash from "lodash"
import { Link } from 'react-router-dom'
import SearchBox from './common/searchBox'
const Movies = () => {
    const [moviesData, setMoviesData] = useState([])
    const [genres, setGenres] = useState([])
    const [selectedGenre, setSelectedGenre] = useState([])
    const [pageSize, setPageSize] = useState(4)
    const [currentPage, setCurrentPage] = useState(1)
    const [sortColumn, setSortColumn] = useState({path: "title", order: "asc"})
    const [searchQuery, setSearchQuery] = useState("")
  // console.log(moviesData)
    useEffect(()=>{
      setMoviesData(getMovies())
      const genres = [{name: "All Genres", _id: ""},...getGenres()]
      setGenres(genres)
    },[])

    const handleDelete = (id) =>{
      const movie = moviesData.filter(movie => movie._id !== id)
      setMoviesData(movie)
    }

    const handleLike = (movie) =>{
      const movies = [...moviesData]
      const index = movies.indexOf(movie)
      movies[index] = {...movies[index]}
      // console.log(movies[index])
      movies[index].liked = !movies[index].liked 
      setMoviesData(movies)
      // console.log(index)
      }

    const handlePageChange = (page) =>{
      // console.log(page)
      setCurrentPage(page)
    }

    const handleGenreSelect = (genre) =>{
      setSelectedGenre(genre)
      setCurrentPage(1)
      setSearchQuery("")
      // console.log(genre)
    }
    const handleSort = (sortColumn) =>{
      setSortColumn(sortColumn)
    }

    const handleSearch = (query) =>{
      setSearchQuery(query)
      setSelectedGenre(null)
      setCurrentPage(1)
    }
    // create localMovies using paginate function
    //first filter, then sort, then paginate the data. this way you should work
    let filtered = moviesData;
    if(searchQuery)
      filtered = moviesData.filter(m=>
        m.title.toLowerCase().startsWith(searchQuery.toLowerCase()))
    else if(selectedGenre && selectedGenre._id)
        filtered = moviesData.filter(m => m.genre._id === selectedGenre._id)
    // const filtered =  selectedGenre && selectedGenre._id? moviesData.filter(m => m.genre._id === selectedGenre._id) : moviesData
    const sorted = lodash.orderBy(filtered, [sortColumn.path], [sortColumn.order])
    const localMovies = paginate(sorted, currentPage, pageSize)
    const zeroMovies = <h6 className='text-danger'>Oop! sorry there are no movies in the database</h6>
    const countMovies = <h6 className='text-primary'>There are {filtered.length} movies in the database</h6>
    // console.log(filtered)
  return (
    <div className='row'>
     <div className='col-2'>
    <ListGroup 
      items={genres} 
      onItemSelect={handleGenreSelect}
      selectedItem = {selectedGenre}/>
     </div>
     <div className='col'>
      <Link 
      to={"/movies/new"}
      className='btn btn-primary mb-3'>
        New Movie
      </Link>
     {filtered.length === 0 ? zeroMovies : countMovies}
     <SearchBox value={searchQuery} onChange={handleSearch}/>
    <MoviesTable 
     localMovies={localMovies} 
     onLike={handleLike} 
     onDelete={handleDelete}
     onSort={handleSort}
     sortColumn={sortColumn}/>
    <Pagination 
      totalItems={filtered.length} 
      pageSize={pageSize} 
      onPageChange={handlePageChange} 
      currentPage={currentPage}/>
     </div>
    </div>
  )
}

export default Movies
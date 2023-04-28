import React from 'react'
import { Link } from 'react-router-dom'
import Table from './common/table'
import Like from './common/like'
const MoviesTable = (props) => {
    const {localMovies, onLike, onDelete, onSort, sortColumn} = props
    const columns = [
        {path: "title", label: "Title", content: localMovies => <Link to={`/movies/${localMovies._id}`}>{localMovies.title}</Link>},
        {path: "genre.name", label: "Genre"},
        {path: "numberInStock", label: "Stock"},
        {path: "dailyRentalRate", label: "Rate"},
        {key: "like", content: localMovies => <Like liked={localMovies.liked} onClick={()=> onLike(localMovies)}/>},
        {key: "delete", content: localMovies => <button onClick={() => onDelete(localMovies._id)} className='btn btn-danger'>Delete</button> }
    ]
    
  return (
    <Table 
    columns={columns} 
    data={localMovies} 
    sortColumn={sortColumn} 
    onSort={onSort}/>
  )
}

export default MoviesTable
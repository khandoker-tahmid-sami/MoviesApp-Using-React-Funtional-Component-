import React, {useEffect, useState} from 'react'
import Input from './common/input'
import Select from './common/select'
import { getGenres } from '../services/fakeGenreService'
import { getMovie, saveMovie } from '../services/fakeMovieService'
import { useParams, useNavigate } from 'react-router-dom'
import Joi from 'joi-browser'
const MovieForm = () => {
    const [user, setUser] = useState({title : "" , genreId: "", numberInStock:"", dailyRentalRate:""})
    const {title,genreId,numberInStock,dailyRentalRate} = user
    const [genres, setGenres] = useState([])
    const [errors, setErrors] = useState({})

    const navigate = useNavigate(); // // Hook to access the navigate function
    const {id} = useParams(); // Hook to access URL parameters

    const schema = {
        _id : Joi.string(),
        title : Joi.string()
        .required()
        .label("Title"),
        genreId : Joi.string()
        .required()
        .label("Genre"),
        numberInStock : Joi.number()
        .required()
        .min(0)
        .max(100)
        .label("Number in stock"),
        dailyRentalRate : Joi.number()
        .required()
        .min(0)
        .max(10)
        .label("Daily rental rate")
    }

    useEffect(()=>{
        const genres = getGenres()
        setGenres(genres)
        console.log(genres)

        if(id === "new") return

        const movie = getMovie(id)
        if(!movie) return navigate("/not-found")

        setUser(mapToViewModel(movie))
    },[])

    const mapToViewModel = (movie) =>{
        return {
            _id: movie.id,
            title: movie.title,
            genreId: movie.genre_id,
            numberInStock: movie.numberInStock,
            dailyRentalRate: movie.dailyRentalRate
        }
    }

    const handleChange = ({target: input}) =>{
        setUser({...user, [input.name]: input.value})

        const newErrors = {...errors};
        const errorMessage = validateProperty(input)
        if(errorMessage) newErrors[input.name] = errorMessage
        else delete newErrors[input.name]
        setErrors(newErrors)
    }

    const validateProperty = ({name, value}) =>{
        const obj = {[name]: value}
        const newSchema = {[name]: schema[name]}
        const {error} = Joi.validate(obj, newSchema)
        return error ? error.details[0].message : null
    }

    const validate = () =>{
        const option = {abortEarly: false}
        const {error} = Joi.validate(user, schema, option )
        if(!error) return null

        const errors = {}
        // for(let item of result.error.details)
        //     errors[item.path[0]] = item.message
        // return errors; 

        //map an array into object
        error.details.map(err =>{
            errors[err.path[0]] = err.message
        })
        return errors;


    }

   const handleSubmit = (e) =>{
        e.preventDefault();

        const errors = validate()
        // console.log(errors)
        setErrors(errors || {})
        if(errors) return;
        //call the server
        console.log("submitted", user)
        //reset the input fields
        setUser({title:"", genreId:"", numberInStock:"", dailyRentalRate:""})
        handleSave()

   }


    const handleSave = () =>{
        saveMovie(user)
        navigate("/")
    }
  return (
    <div className='container'>
        <h1 className='text-center'>Add {id} movie  </h1>
        <form  onSubmit={handleSubmit}>
            <Input name="title" type="text" label="Title:" value={title} error={errors.title} onChange={handleChange}/>
            <Select 
            name="genreId"
            label="Genre"
            value={genreId}
            options={genres}
            onChange={handleChange}
            error={errors.genreId}
            />
            <Input name="numberInStock" type="text" label="Number In Stock:" value={numberInStock} error={errors.numberInStock} onChange={handleChange}/>
            <Input name="dailyRentalRate" type="text" label="Rate:" value={dailyRentalRate } error={errors.dailyRentalRate} onChange={handleChange} />
             <button type='submit' className='btn btn-primary'>Save</button>
        </form>
    </div>
  )
}

export default MovieForm
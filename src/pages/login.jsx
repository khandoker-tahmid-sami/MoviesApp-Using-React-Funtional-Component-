import React, {useState} from 'react'
import Joi from "joi-browser"

import Input from '../components/common/input'

const Login= () => {
    const [user, setUser] = useState({username : "" , password: ""})
    const {username, password} = user

    const [errors, setErrors] = useState({})
    // console.log(errors)

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

    const schema = {
        username : Joi.string()
        .required()
        .label("Username"),
        password : Joi.string()
        .required()
        .label("Password")
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
        setUser({username:"", password:""})

    }
  return (
    <div className='container'>
        <h1 className='text-center'>Login</h1>
        <form onSubmit={handleSubmit}>
            <Input name="username" type="text" label="Username:" value={username} error={errors.username} onChange={handleChange}/>
            <Input name="password"  type="password" label="Password:" value={password} error={errors.password} onChange={handleChange}/>
            <button type='submit' className='btn btn-primary'>Submit</button>
        </form>
    </div>
  )
}

export default Login
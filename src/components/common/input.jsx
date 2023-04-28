import React from 'react'

const Input = ({name, label, value, error, onChange, type}) => {
  return (
    <div className='form-group'>
        <label htmlFor={name} className='mb-3'>{label}</label>
        <input 
            value={value}  
            name={name}
            type={type} 
            id={name}
            className='form-control mb-3' 
            onChange={onChange}/>
        {error && <div className='alert alert-danger'>{error}</div>}
    </div>
  )
}

export default Input

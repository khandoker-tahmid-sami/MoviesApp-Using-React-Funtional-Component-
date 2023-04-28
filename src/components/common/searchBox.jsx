import React from 'react'

const SearchBox = ({value, onChange}) => {
  return (
    <div>
        <input 
        type="text"
        name='query'
        value={value}
        className='form-control m-3' 
        placeholder='search...'
        onChange={e => onChange(e.currentTarget.value)}/>
    </div>
  )
}

export default SearchBox
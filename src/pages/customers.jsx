import React, {useEffect, useState} from 'react'
import {data} from "../services/data"
const Customers = () => {
  const [customers, setCustomers] = useState([])
  const [search, setSearch] = useState('')
  console.log(customers)
  useEffect(()=>{
    setCustomers(data)
  },[])
  return (
    <div className='container'>
      <h1 className='text-center mb-3 text-primary'>Customer List</h1>
      <input onChange={(e) => setSearch(e.target.value)} value={search} className='form-control mb-3' type="text" placeholder='Search' />
        <table className='table container'>
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Phone Number</th>
            </tr>
          </thead>
          <tbody>
            {customers.filter((item) =>{
            return search.toLowerCase() === "" ? item :  item.first_name.toLowerCase().startsWith(search.toLowerCase()) + item.email.toLocaleLowerCase().startsWith(search.toLowerCase())
          }).map(customer=> 
            <tr key={customer.id}>
              <td>{customer.first_name}</td>
              <td>{customer.last_name}</td>
              <td>{customer.email}</td>
              <td>{customer.phone_number}</td>
            </tr>
            )}
          </tbody>
        </table>
    </div>
  )
}

export default Customers
import React from 'react'
import loadash from "lodash"
const TableBody = (props) => {
    const {data, onLike, onDelete, columns} = props
    const renderCell = (item, column) =>{
        if(column.content) return column.content(item)
        else return loadash.get(item, column.path)
    }
    const createKey = (item, column) =>{
        return item._id + (column.path || column.key)
    }
  return (
    <tbody>
          {data.map(item => {
            return <tr key={item._id}>
              {columns.map(column => <td key={createKey(item, column)}>{renderCell(item,column)}</td>)}
            </tr>
          })}
    </tbody>
  )
}

export default TableBody
import React from 'react'

// columns = array , sortcoumn = object, onsort = function
const TableHeader = (props) => {
    const {columns, sortColumn, onSort} = props
    const raiseSort = (path) =>{
        const newSortColumn = {...sortColumn}
        if(newSortColumn.path === path)
          newSortColumn.order = newSortColumn.order === "asc" ? "desc" : "asc"
        else{
          newSortColumn.path = path;
          newSortColumn.order = "asc"
        }
        onSort(newSortColumn)
    }
    const renderSortIcon = (column) =>{
      if(column.path !== sortColumn.path) return null
      // console.log(sortColumn.path)
      if(sortColumn.order === "asc") return <i className='fa fa-sort-asc'></i>
      return <i className='fa fa-sort-desc'></i>
    }
  return (
    <thead>
        <tr>
            {columns.map(column=> <th style={{cursor:"pointer"}} key={column.path || column.key} onClick={() => raiseSort(column.path)}>{column.label} {renderSortIcon(column)}</th>)}
        </tr>
    </thead>
  )
}

export default TableHeader
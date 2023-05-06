import React from 'react'

const ListGroup = ({items, onItemSelect, textProperty, valueProperty, selectedItem}) => {
  return (
    <ul className="list-group list-class">
        {items.map(genre => 
        <li style={{cursor: "pointer"}} 
        onClick={()=> onItemSelect(genre)} 
        key={genre[valueProperty]} 
        className={selectedItem===genre ? "list-group-item active" : "list-group-item"}>{genre[textProperty]}</li>
        )}
    </ul>
  )
}


ListGroup.defaultProps = {
    textProperty : "name",
    valueProperty : "_id"
}
export default ListGroup
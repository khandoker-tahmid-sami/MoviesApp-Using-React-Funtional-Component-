import React from 'react'

const Like = ({liked, onClick}) => {
    const classes = liked ? "fa fa-heart" : "fa fa-heart-o" 

  return (
    
    <div>
        <i onClick={onClick} className={classes} aria-hidden="true" style={{cursor: "pointer"}}></i>
    </div>
  )
}

export default Like
import React from 'react'
import lodash from "lodash"
import PropTypes from "prop-types"
const Pagination = ({totalItems, pageSize, onPageChange, currentPage}) => {
    // console.log(currentPage)
    const pagesCount = Math.ceil(totalItems/pageSize)
    // console.log(pagesCount)
    if(pagesCount === 1) return null
    const pages = lodash.range(1, pagesCount + 1)
    // console.log(pages)
  return (
    <div>
        <nav>
            <ul className="pagination">
               {pages.map(page=> <li key={page} className={page === currentPage ? "page-item active" : "page-item"}>
                <a onClick={() => onPageChange(page)} style={{cursor: "pointer"}} className="page-link">{page}</a></li>
               )}
            </ul>
        </nav>
    </div>
  )
}

Pagination.propTypes = {
    totalItems: PropTypes.number.isRequired, 
    pageSize : PropTypes.number.isRequired, 
    onPageChange : PropTypes.func.isRequired, 
    currentPage : PropTypes.number.isRequired
}

export default Pagination
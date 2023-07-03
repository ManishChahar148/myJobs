import React from 'react';
import './Pagination.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretLeft, faCaretRight } from '@fortawesome/free-solid-svg-icons';
import ReactPaginate from 'react-paginate';

function Pagination(props) {
    const { 
        onPageChange,
        pageCount,
    } = props;
    
    return (
        <ReactPaginate
        previousLabel={<div><FontAwesomeIcon icon={faCaretLeft} className='fa-lg'/></div>}
        nextLabel={<div><FontAwesomeIcon icon={faCaretRight} className='fa-lg'/></div>}
        pageCount={pageCount}
        onPageChange={onPageChange}
        containerClassName={"pagination"}
        previousLinkClassName={"pagination-prev-next"}
        nextLinkClassName={"pagination-prev-next"}
        disabledClassName={"pagination-prev-next-inactive"}
        // activeClassName={"pagination-prev-next-active"}
        pageClassName={'pagination-inactive-page'}
        activeClassName={'pagination-active-page'}
        breakClassName={'pagination-ellipsis'}
        marginPagesDisplayed={1}
    />
    )
}

export default Pagination;

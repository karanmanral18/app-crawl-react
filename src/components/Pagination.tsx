import React, { useState, useEffect, useMemo } from 'react';

const PaginationComponent = ({ totalRows, perPage = 10, currentPage = 1, onPageChanged }) => {
    const [current, setCurrent] = useState(currentPage);
    const visiblePageCount = 4;

    const totalPages = useMemo(() => Math.ceil(totalRows / perPage), [totalRows, perPage]);

    useEffect(() => {
        setCurrent(currentPage);
    }, [currentPage]);

    const visiblePages = useMemo(() => {
        let maxVisiblePages = Math.min(visiblePageCount, totalPages);
        let startPage;
        let endPage;

        if (current >= 4) {
            maxVisiblePages = 3;
            startPage = current - 1;
            endPage = current + 1;
        } else {
            startPage = 1;
            endPage = Math.min(maxVisiblePages, totalPages);
        }

        if (current === totalPages) {
            startPage = Math.max(current - maxVisiblePages, 1);
            endPage = current;
        }

        if (totalPages - current < 3) {
            startPage = Math.max(totalPages - 3, 1);
            endPage = totalPages;
        }

        if (current === 4 && totalPages === 4) {
            startPage = 1;
            endPage = totalPages;
        }

        if (totalPages === 0) {
            startPage = 1;
            endPage = 1;
        }

        return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
    }, [current, totalPages, visiblePageCount]);

    const pageOptions = useMemo(() => {
        return !(current === totalPages || totalPages <= 4 || totalPages - current < 3);
    }, [current, totalPages]);

    const goToPage = (pageNumber: number) => {
        if (pageNumber < 1 || pageNumber > totalPages) return;
        onPageChanged(pageNumber);
    };

    const previousPage = () => {
        if (current > 1) {
            onPageChanged(current - 1);
        }
    };

    const nextPage = () => {
        if (current < totalPages) {
            onPageChanged(current + 1);
        }
    };

    return (
        <ul className="pagination m-0 justify-content-center mt-3">
            <li className="page-item">
                <button className="page-link" onClick={() => goToPage(1)} disabled={current === 1}>
                    <span aria-hidden="true">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path d="M11.727 12L12.667 11.06L9.61366 8L12.667 4.94L11.727 4L7.72699 8L11.727 12Z" fill="#5F6D7E" />
                            <path d="M7.33344 12L8.27344 11.06L5.2201 8L8.27344 4.94L7.33344 4L3.33344 8L7.33344 12Z" fill="#5F6D7E" />
                        </svg>
                    </span>
                </button>
            </li>
            <li className="page-item">
                <button className="page-link" onClick={previousPage} disabled={current === 1} aria-label="Previous">
                    <span aria-hidden="true">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path d="M11.727 12L12.667 11.06L9.61366 8L12.667 4.94L11.727 4L7.72699 8L11.727 12Z" fill="#5F6D7E" />
                        </svg>
                    </span>
                </button>
            </li>

            <li className="page-item">
                {(current >= 4 && totalPages !== 4) || (current === 3 && totalPages === 5) ? (
                    <span className="page-link" aria-disabled>
                        &#8230;
                    </span>
                ) : null}
            </li>

            {visiblePages.map((pageNumber) => (
                <li className="page-item" key={pageNumber}>
                    <button className={`page-link ${current === pageNumber ? 'active' : ''}`} onClick={() => goToPage(pageNumber)}>
                        {pageNumber}
                    </button>
                </li>
            ))}

            <li className="page-item">
                {pageOptions ? (
                    <span className="page-link" aria-disabled>
                        &#8230;
                    </span>
                ) : null}
            </li>

            <li className="page-item">
                <button className="page-link" onClick={nextPage} disabled={current === totalPages || totalPages === 0} aria-label="Next">
                    <span aria-hidden="true">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path d="M4.27301 4L3.33301 4.94L6.38634 8L3.33301 11.06L4.27301 12L8.27301 8L4.27301 4Z" fill="#5F6D7E" />
                        </svg>
                    </span>
                </button>
            </li>
            <li className="page-item">
                <button className="page-link" onClick={() => goToPage(totalPages)} disabled={current === totalPages || totalPages === 0}>
                    <span aria-hidden="true">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path d="M4.27301 4L3.33301 4.94L6.38634 8L3.33301 11.06L4.27301 12L8.27301 8L4.27301 4Z" fill="#5F6D7E" />
                            <path d="M8.66656 4L7.72656 4.94L10.7799 8L7.72656 11.06L8.66656 12L12.6666 8L8.66656 4Z" fill="#5F6D7E" />
                        </svg>
                    </span>
                </button>
            </li>
        </ul>
    );
};

export default PaginationComponent;

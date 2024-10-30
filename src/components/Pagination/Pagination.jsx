import React from "react";
import styles from "./Experiences.module.scss";

export const Pagination = ({
  experiencePerPage,
  totalExperiences,
  currentPage,
  setCurrentPage,
}) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalExperiences / experiencePerPage); i++) {
    pageNumbers.push(i);
  }

  const onPreviousPage = () => {
    setCurrentPage(currentPage - 1);
  };
  const onNextPage = () => {
    setCurrentPage(currentPage + 1);
  };
  const onSpecificPage = (n) => {
    setCurrentPage(n);
  };
  return (
    <nav className="Pagination is-centered">
      <button
        className="pagination-previous"
        disabled={currentPage === 1 ? true : false}
        onClick={onPreviousPage}
      >
        Previous
      </button>
      <button
        className="pagination-next"
        disabled={currentPage >= pageNumbers.length ? true : false}
        onClick={onNextPage}
      >
        Next page
      </button>
      <ul className="PaginationList">
        {pageNumbers.map((noPage) => (
          <li key={noPage}>
            <button
              className={`pagination-link ${
                noPage === currentPage ? `${styles.colorbutton}` : ""
              }`}
              onClick={() => onSpecificPage(noPage)}
            >
              {noPage}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};
export default Pagination;

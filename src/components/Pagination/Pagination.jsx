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
    <nav className={styles.navbar}>
      <button
        className={styles.navbutton}
        disabled={currentPage === 1 ? true : false}
        onClick={onPreviousPage}
      >
        Previous
      </button>
      <ul className={styles.navlist}>
        {pageNumbers.map((noPage) => (
          <li key={noPage}>
            <button
              className={`${
                noPage === currentPage
                  ? `${styles.navlistbuttonSelected}`
                  : `${styles.navlistbutton}`
              }`}
              onClick={() => onSpecificPage(noPage)}
            >
              {noPage}
            </button>
          </li>
        ))}
      </ul>
      <button
        className={styles.navbutton}
        disabled={currentPage >= pageNumbers.length ? true : false}
        onClick={onNextPage}
      >
        Next page
      </button>
    </nav>
  );
};
export default Pagination;

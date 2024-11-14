import React, {useState} from "react";
import ProductCard from "../Cards/ProductCard";
import Pagination from './Pagination';

export const ExperiencesList = ({ experiences }) => {

  const totalExperiences = experiences.length;
  const [experiencePerPage, setExperiencePerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const lastIndex = currentPage * experiencePerPage;
  const firstIndex = lastIndex - experiencePerPage;

  function indexElements(index) {
    return (index % 10) + 1;
  }

  return (
    <>
      <div className="desktopCars">
        <div className="grid-container">
          {experiences.length > 0 ? (
            experiences
              .map((experience, index) => (
                <div
                  className={`item item-${indexElements(index)}`}
                  key={experience.id}
                >
                  <ProductCard data={experience} />
                </div>
              ))
              .slice(firstIndex, lastIndex)
          ) : (
            <p>No experiences found for the selected categories.</p>
          )}
        </div>
      </div>
      <Pagination
        experiencePerPage={experiencePerPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalExperiences={totalExperiences}
      />
    </>
  );
};

export default ExperiencesList;

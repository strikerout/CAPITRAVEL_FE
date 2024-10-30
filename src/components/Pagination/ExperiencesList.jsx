import React, { useEffect, useState } from "react";
import ProductCard from "../Cards/ProductCard";
import Pagination from './Pagination';
import useExperiences from '../../hooks/useExperience'

export const ExperiencesList = () => {

  const {experiences, loading, error } = useExperiences();
  // const [experiences, setExperiences] = useState([]);

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
          {/* <!-- Fila 1 --> */}
          {experiences
            .map((experience, index) => (
              <div
                className={`item item-${indexElements(index)}`}
                key={experience.id}
              >
                <ProductCard data={experience}/>
              </div>
            ))
            .slice(firstIndex, lastIndex)}
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

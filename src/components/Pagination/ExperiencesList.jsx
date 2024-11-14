import React, { useState, useEffect } from "react";
import ProductCard from "../Cards/ProductCard";
import Pagination from './Pagination';
import Message from "../Message/Message";

export const ExperiencesList = ({ experiences }) => {
  const [shuffledExperiences, setShuffledExperiences] = useState([]);
  const [experiencePerPage, setExperiencePerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const shuffled = [...experiences].sort(() => Math.random() - 0.5);
    setShuffledExperiences(shuffled);
  }, [experiences]);

  const totalExperiences = shuffledExperiences.length;
  const lastIndex = currentPage * experiencePerPage;
  const firstIndex = lastIndex - experiencePerPage;

  function indexElements(index) {
    return (index % 10) + 1;
  }

  return (
    <>
      <div className="desktopCars">
        <div className="grid-container">
          {shuffledExperiences.length > 0 ? (
            shuffledExperiences
              .slice(firstIndex, lastIndex)
              .map((experience, index) => (
                <div
                  className={`item item-${indexElements(index)}`}
                  key={experience.id}
                >
                  <ProductCard data={experience} />
                </div>
              ))
          ) : (
           <Message/>
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

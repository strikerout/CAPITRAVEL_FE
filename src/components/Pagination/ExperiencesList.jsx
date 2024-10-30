import React, { useEffect, useState } from "react";
import ProductCard from "../Cards/ProductCard";
import Pagination from "./pagination";
import { getExperiences } from "../../api/experiences";

export const ExperiencesList = () => {
  const [experiences, setExperiences] = useState([]);

  const totalExperiences = experiences.length;
  const [experiencePerPage, setExperiencePerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const lastIndex = currentPage * experiencePerPage;
  const firstIndex = lastIndex - experiencePerPage;

  
  const experiencesList = async () => {
    const experiences = await getExperiences();

    console.log(experiences);

    setExperiences(experiences);
  };

  useEffect(() => {
    experiencesList();
  }, []);



  return (
    <>
      <div className="desktopCars">
        <div className="grid-container">
          {/* <!-- Fila 1 --> */}
          {experiences
            .map((experiences) => (
              <div className={"item item-"+`${experiences.id}`} key={experiences.id}>
                <ProductCard {...experiences} />
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

import { useState, useEffect, useRef } from 'react';
import { getExperiences, getExperienceByID, createExperience, updateExperience, deleteExperience, createReviewApi, alreadyReviewed, getAllReviews, getExperiencesCountries } from '../api/experiences';

const useExperiences = () => {
    const [experiences, setExperiences] = useState([]);
    const [experience, setExperience] = useState([]);
    const [countries, setCountries] = useState([]);
    const [foundExperiences, setFoundExperiences] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [shufflingExperiences, setShufflingExperiences] = useState([]);

    const prevCategories = useRef([]);

    const fetchExperiences = async (categoryIds = []) => {
        setLoading(true);

        if (categoryIds.length === 0 || JSON.stringify(categoryIds) !== JSON.stringify(prevCategories.current)) {
            try {
                const data = await getExperiences(categoryIds);
                setExperiences(data);
                prevCategories.current = categoryIds;
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        } else {
            setLoading(false);
        }
    };

    const fetchCountries = async () =>{
        setLoading(true);
        try {
            const data = await getExperiencesCountries();
            setCountries(data);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    }

    const fetchExperienceByID = async (id) => {
        try {
            const experience = await getExperienceByID(id);
            return experience;
        } catch (err) {
            const error = err.response || "Unknown error";
            setError(error); 
            return error;
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchExperiences();
        fetchCountries();
    }, []);

    const addExperience = async (newExperience) => {
        try {
            const createdExperience = await createExperience(newExperience);
            setExperiences((prev) => [...prev, createdExperience]);
            return null;
        } catch (err) {
            const error = err.response || "Unknown error";
            setError(error); 
            return error;
        }
    };

    const findExperiences = async (country, keywords, startDate, endDate) =>{
        setLoading(true);
        try{
            const data = await searchExperiences(country, keywords, startDate, endDate)
            setFoundExperiences(data)
            return data;
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    }


    const editExperience = async (id, updatedExperience) => {
        try {
            const updated = await updateExperience(id, updatedExperience);
            setExperiences((prev) =>
                prev.map((exp) => (exp.id === id ? updated : exp))
            );
            return null;
        } catch (err) {
            const error = err.response || "Unknown error";
            setError(error); 
            return error;
        }
    };

    const removeExperience = async (id) => {
        try {
            await deleteExperience(id);
            setExperiences((prev) => prev.filter((exp) => exp.id !== id));
            return null;
        } catch (err) {
            const error = err.response || "Unknown error";
            setError(error); 
            return error;
        }
    };

    const createReview = async (experienceId, email, rating, message) => {
        try {
            await createReviewApi(experienceId, email, rating, message);
            return null;
        } catch (err) {
            const error = err.response || "Unknown error";
            setError(error); 
            return error;
        }
    };
    
    const isAlreadyReviewed = async (experienceId, email) => {
        try {
            const reviewed = await alreadyReviewed(experienceId, email);
            console.log(reviewed);
            return reviewed > 0.0;
        } catch (err) {
            const error = err.response || "Unknown error";
            setError(error); 
            return error;
        }
    };

    const getReviews = async (experienceId) => {
        try {
            const allReviewed = await getAllReviews(experienceId);
            console.log(allReviewed);
            return allReviewed;
        } catch (err) {
            const error = err.response || "Unknown error";
            setError(error); 
            return error;
        }
    };

    return {
        fetchExperiences,
        fetchExperienceByID,
        experiences,
        experience,
        foundExperiences,
        setFoundExperiences,
        countries,
        loading,
        error,
        addExperience,
        findExperiences,
        editExperience,
        removeExperience,
        shufflingExperiences,
        createReview,
        isAlreadyReviewed,
        getReviews,
    };
};

export default useExperiences;

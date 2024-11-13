import { useState, useEffect } from 'react';
import {getExperiences, getExperienceByID, getExperienceByCategories, createExperience, updateExperience, deleteExperience} from '../api/experiences';

const useExperiences = () => {
    const [experiences, setExperiences] = useState([]);
    const [experience, setExperience] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [shufflingExperiences, setShufflingExperiences] = useState([])

    const fetchExperiences = async () => {
        try {
            const data = await getExperiences();
            setShufflingExperiences(data.slice().sort(() => Math.random() - 0.5))
            setExperiences(data);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

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

    const fetchExperiencesByCategories = async (categoryIds) => {
        try {
            const data = await getExperienceByCategories(categoryIds);
            setShufflingExperiences(data.slice().sort(() => Math.random() - 0.5))
            setExperiences(data);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchExperiences();
        fetchExperiencesByCategories();
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

   

    return {
        fetchExperiences,
        fetchExperienceByID,
        experiences,
        experience,
        loading,
        error,
        addExperience,
        editExperience,
        removeExperience,
        shufflingExperiences,
    };
};

export default useExperiences;

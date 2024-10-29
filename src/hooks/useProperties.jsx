// useProperties.js

import { useState, useEffect } from 'react';
import { getProperties, getPropertyByID, createProperty, updateProperty, deleteProperty} from '../api/properties';

const useProperties = () => {
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchProperties = async () => {
        try {
            const data = await getProperties();
            setProperties(data);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    const fetchPropertyByID = async (id) => {
        try {
            const property = await getExperienceByID(id);
            return property;
        } catch (err) {
            setError(err);
        }
    };

    const addProperty = async (newProperty) => {
        try {
            const createdProperty = await createProperty(newProperty);
            setProperties((prev) => [...prev, createdProperty]);
        } catch (err) {
            setError(err);
        }
    };

    const updateExistingProperty = async (id, updatedProperty) => {
        try {
            const updated = await updateProperty(id, updatedProperty);
            setProperties((prev) =>
                prev.map((prop) => (prop.id === id ? updated : prop))
            );
        } catch (err) {
            setError(err);
        }
    };

    const removeProperty = async (id) => {
        try {
            await deleteProperty(id);
            setProperties((prev) => prev.filter((prop) => prop.id !== id));
        } catch (err) {
            setError(err);
        }
    };

    useEffect(() => {
        fetchProperties();
    }, []);

    return {
        fetchProperties,
        fetchPropertyByID,
        properties,
        loading,
        error,
        addProperty,
        updateExistingProperty,
        removeProperty,
    };
};

export default useProperties;

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
            const error = err.response || "Unknown error";
            setError(error); 
            return error;
        } finally {
            setLoading(false);
        }
    };

    const fetchPropertyByID = async (id) => {
        try {
            const property = await getPropertyByID(id);
            return property;
        } catch (err) {
            const error = err.response || "Unknown error";
            setError(error); 
            return error;
        }finally {
            setLoading(false);
        }
    };

    const addProperty = async (newProperty) => {
        try {
            const createdProperty = await createProperty(newProperty);
            setProperties((prev) => [...prev, createdProperty]);
            return null
        } catch (err) {
            const error = err.response || "Unknown error";
            setError(error); 
            return error;
        }
    };

    const updateExistingProperty = async (id, updatedProperty) => {
        try {
            const updated = await updateProperty(id, updatedProperty);
            setProperties((prev) =>
                prev.map((prop) => (prop.id === id ? updated : prop))
            );
            return null;
        } catch (err) {
            const error = err.response || "Unknown error";
            setError(error); 
            return error;
        }
    };

    const removeProperty = async (id) => {
        try {
            await deleteProperty(id);
            setProperties((prev) => prev.filter((prop) => prop.id !== id));
            return null;
        } catch (err) {
            const error = err.response || "Unknown error";
            setError(error); 
            return error;
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

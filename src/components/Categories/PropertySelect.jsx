import React, { useEffect } from 'react';
import useProperties from '../../hooks/useProperties';

const PropertySelect = ({ value, onChange }) => {
    const { fetchProperties, properties, loading, error } = useProperties();

    useEffect(() => {
        fetchProperties(); 
    }, []);

    if (loading) return <div>Loading properties...</div>;
    if (error) return <div>Error loading properties: {error.message}</div>;

    return (
        <select value={value} onChange={(e) => onChange(e.target.value)}>
            <option value="">Select a property</option>
            {properties.map((property) => (
                <option key={property.id} value={property.id}>
                    {property.name}
                </option>
            ))}
        </select>
    );
};

export default PropertySelect;

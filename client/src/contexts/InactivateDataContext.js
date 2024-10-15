// InactivateDataContext.js
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const InactivateDataContext = createContext();

export const InactivateDataProvider = ({ children }) => {
    const [inactivateData, setInactivateData] = useState([]);
    const [dropFilter, setDropFilter] = useState(null);

    useEffect(() => {
        // Fetch data for Inactivate Decision
        const fetchData = async () => {
            try {
                const response = await axios.get('/review/inactivatedecision/');
                setInactivateData(response.data);
            } catch (error) {
                console.error('Error fetching inactivate data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <InactivateDataContext.Provider value={{ inactivateData, dropFilter, setDropFilter }}>
            {children}
        </InactivateDataContext.Provider>
    );
};

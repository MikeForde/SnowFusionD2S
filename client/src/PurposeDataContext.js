// PurposeDataContext.js
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const PurposeDataContext = createContext();

export const PurposeDataProvider = ({ children }) => {
    const [purposeData, setPurposeData] = useState([]);

    useEffect(() => {
        // Fetch data only once when the provider mounts
        const fetchData = async () => {
            try {
                const response = await axios.get('/review/decision/DMSCreate');
                setPurposeData(response.data);
            } catch (error) {
                console.error('Error fetching purpose data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <PurposeDataContext.Provider value={{ purposeData }}>
            {children}
        </PurposeDataContext.Provider>
    );
};

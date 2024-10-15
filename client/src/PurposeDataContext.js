// PurposeDataContext.js
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const PurposeDataContext = createContext();

export const PurposeDataProvider = ({ children }) => {
    const [purposeData, setPurposeData] = useState([]);
    const [filterType, setFilterType] = useState('Children of INT or UK');
    const [subFilterType, setSubFilterType] = useState(null);
    const [dropFilter, setDropFilter] = useState(null);

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
        <PurposeDataContext.Provider value={{ 
            purposeData, 
            setPurposeData, 
            filterType, 
            setFilterType, 
            subFilterType, 
            setSubFilterType,
            dropFilter, 
            setDropFilter
        }}>
            {children}
        </PurposeDataContext.Provider>
    );
};

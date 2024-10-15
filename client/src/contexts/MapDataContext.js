// MapDataContext.js
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const MapDataContext = createContext();

export const MapDataProvider = ({ children }) => {
    const [mapData, setMapData] = useState([]);
    const [dropFilter, setDropFilter] = useState(null);
    const [filterType, setFilterType] = useState('All');

    useEffect(() => {
        // Fetch data for APIMap and ManualMap decisions
        const fetchData = async () => {
            try {
                const response = await axios.get('/review/mapdecision/');
                setMapData(response.data);
            } catch (error) {
                console.error('Error fetching map data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <MapDataContext.Provider value={{ 
            mapData, 
            setMapData,
            filterType, 
            setFilterType, 
            dropFilter, 
            setDropFilter 
        }}>
            {children}
        </MapDataContext.Provider>
    );
};

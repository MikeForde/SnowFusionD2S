// MapPage.js
import React, { useContext, useState, useEffect } from 'react';
import { Table, ButtonGroup, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faExclamationTriangle, faTools, faCogs } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { MapDataContext } from '../contexts/MapDataContext';

function MapPage() {
    const { mapData, dropFilter, setDropFilter } = useContext(MapDataContext);
    const [filteredData, setFilteredData] = useState([]);
    const [filterType, setFilterType] = useState('All');
    const [recordCount, setRecordCount] = useState(0);

    const navigate = useNavigate();

    const handleDMICPCodeClick = (dmicpCode) => {
        navigate(`/review/${dmicpCode}`);
    };

    useEffect(() => {
        applyFilter(filterType);
    }, [filterType, dropFilter, mapData]);

    const applyFilter = (filterType) => {
        let filtered = [];

        // Filter by Decision (APIMap or ManualMap)
        if (filterType === 'All') {
            filtered = mapData;
        } else if (filterType === 'API') {
            filtered = mapData.filter(item => item.Decision === 'APIMap');
        } else if (filterType === 'Manual') {
            filtered = mapData.filter(item => item.Decision === 'ManualMap');
        }

        // Apply Drop filter
        if (dropFilter) {
            filtered = filtered.filter(item => item.Drop.startsWith(dropFilter));
        }

        setFilteredData(filtered);
        setRecordCount(filtered.length);
    };

    return (
        <div className="container mt-4">
            <h3>"API/Manual Map" Codes by Drop</h3>

            {/* Filter by Decision */}
            <ButtonGroup className="mb-3">
                <Button variant={filterType === 'All' ? 'primary' : 'secondary'} onClick={() => setFilterType('All')}>All</Button>
                <Button variant={filterType === 'API' ? 'primary' : 'secondary'} onClick={() => setFilterType('API')}>API</Button>
                <Button variant={filterType === 'Manual' ? 'primary' : 'secondary'} onClick={() => setFilterType('Manual')}>Manual</Button>
            </ButtonGroup>

            {/* Filter by Drop */}
            <ButtonGroup className="mb-3">
                <Button variant={dropFilter === 'Drop1' ? 'primary' : 'secondary'} onClick={() => setDropFilter('Drop1')}>High</Button>
                <Button variant={dropFilter === 'Drop2' ? 'primary' : 'secondary'} onClick={() => setDropFilter('Drop2')}>Med</Button>
                <Button variant={dropFilter === 'Drop3' ? 'primary' : 'secondary'} onClick={() => setDropFilter('Drop3')}>Low</Button>
                <Button variant={dropFilter === 'Drop4' ? 'primary' : 'secondary'} onClick={() => setDropFilter('Drop4')}>Added</Button>
                <Button variant={dropFilter === null ? 'primary' : 'secondary'} onClick={() => setDropFilter(null)}>All</Button>
            </ButtonGroup>

            <p>Total Records: {recordCount}</p>

            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Drop</th>
                        <th>DMICP Code</th>
                        <th>Description</th>
                        <th>Term</th>
                        <th>Read Parent</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredData.map(item => (
                        <tr key={item.OrigId}>
                            <td>
                                {item.Drop.startsWith('Drop1') && <FontAwesomeIcon icon={faExclamationTriangle} style={{ color: 'purple' }} />}
                                {item.Drop.startsWith('Drop2') && <FontAwesomeIcon icon={faStar} style={{ color: 'slateblue' }} />}
                                {item.Drop.startsWith('Drop3') && <FontAwesomeIcon icon={faTools} style={{ color: 'gray' }} />}
                                {item.Drop.startsWith('Drop4') && <FontAwesomeIcon icon={faCogs} style={{ color: 'black' }} />}
                            </td>
                            <td>
                                <span style={{ color: 'blue', cursor: 'pointer' }} onClick={() => handleDMICPCodeClick(item.DMICPCode)}>
                                    {item.DMICPCode}
                                </span>
                            </td>
                            <td>{item.Description}</td>
                            <td>{item.Decision === 'APIMap' ? item.APIMapTerm : item.ManualMapFSN}</td>
                            <td>{item.Parent_Term ? `${item.Parent} - ${item.Parent_Term}` : item.Parent}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
}

export default MapPage;

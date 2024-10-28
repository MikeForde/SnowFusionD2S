// MapPage.js
import React, { useContext, useState, useEffect } from 'react';
import { Table, ButtonGroup, Button, OverlayTrigger, Row, Col, Dropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faExclamationTriangle, faTools, faCogs, faExchangeAlt } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { MapDataContext } from '../contexts/MapDataContext';
import renderTooltip from '../components/renderTooltip';
import { CSVLink } from 'react-csv';

function MapPage() {
    const { mapData, filterType, setFilterType, dropFilter, setDropFilter } = useContext(MapDataContext);
    const [filteredData, setFilteredData] = useState([]);
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

    // Define headers for CSV
    const csvHeaders = [
        { label: 'Pre-Map', key: 'Drop' },
        { label: 'DMICP Code', key: 'DMICPCode' },
        { label: 'Description', key: 'Description' },
        { label: 'Mapped SNOMED Term', key: 'MappedTerm' },
        { label: 'Read Parent', key: 'Parent_Term' },
        { label: 'Mapping', key: 'Decision' },
    ];

    // CSV data generator based on current filter
    const generateCSVData = (filteredData) => {
        return filteredData.map(item => ({
            Drop: item.Drop,
            DMICPCode: item.DMICPCode,
            Description: item.Description.replace(/"/g, ''),
            MappedTerm: item.Decision === 'APIMap' ? item.APIMapTerm : item.ManualMapFSN,
            Parent_Term: item.Parent_Term ? `${item.Parent} - ${item.Parent_Term}` : item.Parent,
            Decision: item.Decision,
        }));
    };

    // Function to create a filename based on filters
    const generateFileName = (filterType, dropFilter) => {
        let fileName = "Mapped_Codes_";
        if (filterType) fileName += `${filterType}_`;
        if (dropFilter) fileName += `Priority_${dropFilter}_`;
        return fileName + "Filtered.tsv";
    };

    return (
        <div className="container mt-4">
            <h3><FontAwesomeIcon icon={faExchangeAlt} style={{ color: 'blue', marginLeft: '10px' }} /> Mapped Codes with Pre-Map Priority</h3>

            {/* Filter by Decision */}
            <ButtonGroup className="mb-3">
                <Button variant={filterType === 'All' ? 'primary custom-button' : 'secondary'} onClick={() => setFilterType('All')}>All</Button>
                <Button variant={filterType === 'API' ? 'primary custom-button' : 'secondary'} onClick={() => setFilterType('API')}>API</Button>
                <Button variant={filterType === 'Manual' ? 'primary custom-button' : 'secondary'} onClick={() => setFilterType('Manual')}>Manual</Button>
            </ButtonGroup>

            {/* Filter by Drop */}
            <ButtonGroup className="mb-3">
                <Button variant={dropFilter === 'Drop1' ? 'primary custom-button' : 'secondary'} onClick={() => setDropFilter('Drop1')}>High</Button>
                <Button variant={dropFilter === 'Drop2' ? 'primary custom-button' : 'secondary'} onClick={() => setDropFilter('Drop2')}>Med</Button>
                <Button variant={dropFilter === 'Drop3' ? 'primary custom-button' : 'secondary'} onClick={() => setDropFilter('Drop3')}>Low</Button>
                <Button variant={dropFilter === 'Drop4' ? 'primary custom-button' : 'secondary'} onClick={() => setDropFilter('Drop4')}>Req</Button>
                <Button variant={dropFilter === null ? 'primary custom-button' : 'secondary'} onClick={() => setDropFilter(null)}>All</Button>
            </ButtonGroup>

            <Row className="mb-3 align-items-center">
                <Col xs="auto">
                    <p className="mb-0">Total Records: {recordCount}</p>
                </Col>
                <Col xs="auto">
                    <Dropdown>
                        <Dropdown.Toggle variant="secondary" id="download-dropdown">
                            Download Options
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item as="div">
                                <CSVLink
                                    data={generateCSVData(filteredData)}
                                    headers={csvHeaders}
                                    filename={generateFileName(filterType, dropFilter)}
                                    separator={String.fromCharCode(9)}
                                    className="dropdown-item"
                                >
                                    Download Filtered Data (TSV)
                                </CSVLink>
                            </Dropdown.Item>
                            <Dropdown.Item as="div">
                                <CSVLink
                                    data={generateCSVData(mapData)}
                                    headers={csvHeaders}
                                    filename="Mapped_Codes_Full.tsv"
                                    separator={String.fromCharCode(9)}
                                    className="dropdown-item"
                                >
                                    Download Full Data (TSV)
                                </CSVLink>
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Col>
            </Row>

            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Pre-Map</th>
                        <th>DMICP Code</th>
                        <th>Description</th>
                        <th>Mapped SNOMED Term</th>
                        <th>Read Parent</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredData.map(item => (
                        <tr key={item.id}>
                            <td>
                                <OverlayTrigger
                                    placement="right"
                                    overlay={renderTooltip(item)}
                                >
                                    <span>
                                        {item.Drop.startsWith('Drop1') && <p>1 <FontAwesomeIcon icon={faExclamationTriangle} style={{ color: 'lightgray' }} /></p>}
                                        {item.Drop.startsWith('Drop2') && <p>2 <FontAwesomeIcon icon={faStar} style={{ color: 'lightgray' }} /></p>}
                                        {item.Drop.startsWith('Drop3') && <p>3 <FontAwesomeIcon icon={faTools} style={{ color: 'lightgray' }} /></p>}
                                        {item.Drop.startsWith('Drop4') && <p>4 <FontAwesomeIcon icon={faCogs} style={{ color: 'lightgray' }} /></p>}
                                    </span>

                                </OverlayTrigger>
                            </td>
                            <td>
                                <span style={{ color: 'blue', cursor: 'pointer' }} onClick={() => handleDMICPCodeClick(item.DMICPCode)}>
                                    {item.DMICPCode}
                                </span>
                            </td>
                            <td>{item.Description.replace(/"/g, '')}</td>
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

import React, { useState, useEffect, useContext } from 'react';
import { Table, ButtonGroup, Button, Dropdown, Tooltip, OverlayTrigger } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faExclamationTriangle, faTools, faCogs } from '@fortawesome/free-solid-svg-icons';
import "./Page.css" // Import the CSS file
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { PurposeDataContext } from '../PurposeDataContext';

// Helper function to render the floating info box
const renderTooltip = (item) => (
    <Tooltip id={`tooltip-${item.id}`} className="custom-tooltip">
        <div className="details">
            {item.NewDescription && <p><strong>New Description:</strong> {item.NewDescription}</p>}
            {item.SNOMEDParent && <p><strong>Suggested SNOMED Parent:</strong> {item.SNOMEDParent}</p>}

            {/* Drop-related extra information */}
            {item.Drop.startsWith('Drop1') && item.Cat2 && (<div>
                <strong>High Priority:</strong>
                <ul>
                    {item.Cat2.split(';').map((name, index) => (
                        <li key={index}>{name}</li>
                    ))}
                </ul>
            </div>
            )}
            {item.Drop.startsWith('Drop2') && (
                <>
                    {item.TemplateNames && (
                        <div>
                            <strong>Templates:</strong>
                            <ul>
                                {item.TemplateNames.split(';').map((name, index) => (
                                    <li key={index}>{name.replace(/_/g, ' ')}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                    {item.DocumentNames && (
                        <div>
                            <strong>Documents:</strong>
                            <ul>
                                {item.DocumentNames.split(';').map((name, index) => (
                                    <li key={index}>{name.replace(/_/g, ' ')}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                    {item.SearchNames && (
                        <div>
                            <strong>Searches:</strong>
                            <ul>
                                {item.SearchNames.split(';').map((name, index) => (
                                    <li key={index}>{name.replace(/_/g, ' ')}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                </>
            )}
            {item.Drop.startsWith('Drop3') && item.UsageCount && (
                <p><strong>Usage in last 5 years:</strong> {item.UsageCount}</p>
            )}
        </div>
    </Tooltip>
);

function PurposePage() {
    const { purposeData } = useContext(PurposeDataContext);
    const [filteredData, setFilteredData] = useState([]);
    const [filterType, setFilterType] = useState('Children of INT or UK');
    const [subFilterType, setSubFilterType] = useState(null);
    const [recordCount, setRecordCount] = useState(0);
    const navigate = useNavigate();

    const handleDMICPCodeClick = (dmicpCode) => {
        navigate(`/review/${dmicpCode}`); // Navigates to DMICPReadReviewPage with the DMICP code
    };


    useEffect(() => {
        if (purposeData.length > 0) {
            applyFilter(filterType, subFilterType);
        }
    }, [filterType, subFilterType, purposeData]);
    

    const applyFilter = (filterType, subFilterType = null) => {
        let filtered = [];

        if (filterType === 'Children of INT or UK') {
            filtered = purposeData.filter(item => !item.Purpose);
        } else if (filterType === 'Children of DMS') {
            filtered = purposeData.filter(item => item.Purpose);
        } else if (filterType === 'OccMed') {
            if (subFilterType) {
                filtered = purposeData.filter(item => item.Purpose === subFilterType);
            } else {
                filtered = purposeData.filter(item => ['OccMed', 'CivOccMed'].includes(item.Purpose));
            }
        } else if (filterType === 'Admin') {
            if (subFilterType) {
                filtered = purposeData.filter(item => item.Purpose === subFilterType);
            } else {
                filtered = purposeData.filter(item => ['Admin', 'MilAdmin', 'RehabAdmin', 'DentalAdmin'].includes(item.Purpose));
                filtered = filtered.map(item => ({
                    ...item,
                    PurposeDisplay: item.Purpose === 'Admin' ? 'MilAdmin' : item.Purpose,
                }));
            }
        } else if (filterType === 'Clinical') {
            if (subFilterType) {
                filtered = purposeData.filter(item => item.Purpose === subFilterType);
            } else {
                filtered = purposeData.filter(item => {
                    return !['OccMed', 'CivOccMed', 'Admin', 'MilAdmin', 'RehabAdmin', 'DentalAdmin', null].includes(item.Purpose);
                }).map(item => {
                    let PurposeDisplay = item.Purpose;
                    if (PurposeDisplay === 'Clinical') PurposeDisplay = 'Other';
                    if (PurposeDisplay === 'MilMed') PurposeDisplay = 'MilClinical';
                    if (PurposeDisplay === 'DCMH') PurposeDisplay = 'DCMH/Mental Health';
                    return { ...item, PurposeDisplay };
                });
            }
        }

        setFilteredData(filtered);
        setRecordCount(filtered.length);
    };

    return (
        <div className="container mt-4">
            <h2>Local DMS Create by Purpose</h2>
            <ButtonGroup className="mb-3">
                <Button variant={filterType === 'Children of INT or UK' ? 'primary' : 'secondary'} onClick={() => { setFilterType('Children of INT or UK'); setSubFilterType(null); }}>Children of INT or UK</Button>
                <Button variant={filterType === 'Children of DMS' ? 'primary' : 'secondary'} onClick={() => { setFilterType('Children of DMS'); setSubFilterType(null); }}>Children of DMS</Button>
            </ButtonGroup>
            <ButtonGroup className="mb-3">
                <Dropdown as={ButtonGroup}>
                    <Button
                        variant={filterType === 'OccMed' && !subFilterType ? 'primary' : 'secondary'}
                        onClick={() => {
                            setFilterType('OccMed');
                            setSubFilterType(null);
                        }}
                    >
                        OccMed
                    </Button>
                    <Dropdown.Toggle
                        split
                        variant={filterType === 'OccMed' && subFilterType ? 'primary' : 'secondary'}
                        id="dropdown-split-occmed"
                    />
                    <Dropdown.Menu>
                        <Dropdown.Item onClick={() => {
                            setFilterType('OccMed');
                            setSubFilterType('OccMed');
                        }}>Mil Occ Med</Dropdown.Item>
                        <Dropdown.Item onClick={() => {
                            setFilterType('OccMed');
                            setSubFilterType('CivOccMed');
                        }}>Civ Occ Med</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>

                <Dropdown as={ButtonGroup}>
                    <Button
                        variant={filterType === 'Clinical' && !subFilterType ? 'primary' : 'secondary'}
                        onClick={() => {
                            setFilterType('Clinical');
                            setSubFilterType(null); // Reset subFilterType
                        }}
                    >
                        Clinical
                    </Button>
                    <Dropdown.Toggle
                        split
                        variant={filterType === 'Clinical' && subFilterType ? 'primary' : 'secondary'}
                        id="dropdown-split-clinical"
                    />
                    <Dropdown.Menu>
                        <Dropdown.Item onClick={() => {
                            setFilterType('Clinical');
                            setSubFilterType('RehabClinical');
                        }}>Rehab Clinical</Dropdown.Item>
                        <Dropdown.Item onClick={() => {
                            setFilterType('Clinical');
                            setSubFilterType('Clinical');
                        }}>Other</Dropdown.Item>
                        <Dropdown.Item onClick={() => {
                            setFilterType('Clinical');
                            setSubFilterType('DCMH');
                        }}>DCMH/Mental Health</Dropdown.Item>
                        <Dropdown.Item onClick={() => {
                            setFilterType('Clinical');
                            setSubFilterType('Hearing');
                        }}>Hearing</Dropdown.Item>
                        <Dropdown.Item onClick={() => {
                            setFilterType('Clinical');
                            setSubFilterType('MilMed');
                        }}>Mil Clinical</Dropdown.Item>
                        <Dropdown.Item onClick={() => {
                            setFilterType('Clinical');
                            setSubFilterType('Imms');
                        }}>Imms</Dropdown.Item>
                        <Dropdown.Item onClick={() => {
                            setFilterType('Clinical');
                            setSubFilterType('Eyesight');
                        }}>Eyesight</Dropdown.Item>
                        <Dropdown.Item onClick={() => {
                            setFilterType('Clinical');
                            setSubFilterType('RehabAssess');
                        }}>Rehab Assess</Dropdown.Item>
                        <Dropdown.Item onClick={() => {
                            setFilterType('Clinical');
                            setSubFilterType('GUM');
                        }}>GUM</Dropdown.Item>
                        <Dropdown.Item onClick={() => {
                            setFilterType('Clinical');
                            setSubFilterType('Dental');
                        }}>Dental</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                <Dropdown as={ButtonGroup}>
                    <Button
                        variant={filterType === 'Admin' && !subFilterType ? 'primary' : 'secondary'}
                        onClick={() => {
                            setFilterType('Admin');
                            setSubFilterType(null); // Reset subFilterType
                        }}
                    >
                        Admin
                    </Button>
                    <Dropdown.Toggle
                        split
                        variant={filterType === 'Admin' && subFilterType ? 'primary' : 'secondary'}
                        id="dropdown-split-admin"
                    />
                    <Dropdown.Menu>
                        <Dropdown.Item onClick={() => {
                            setFilterType('Admin');
                            setSubFilterType('Admin');
                        }}>Civ Admin</Dropdown.Item>
                        <Dropdown.Item onClick={() => {
                            setFilterType('Admin');
                            setSubFilterType('MilAdmin');
                        }}>Mil Admin</Dropdown.Item>
                        <Dropdown.Item onClick={() => {
                            setFilterType('Admin');
                            setSubFilterType('RehabAdmin');
                        }}>Rehab Admin</Dropdown.Item>
                        <Dropdown.Item onClick={() => {
                            setFilterType('Admin');
                            setSubFilterType('DentalAdmin');
                        }}>Dental Admin</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </ButtonGroup>

            <p>Total Records: {recordCount}</p>

            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Cat</th>
                        <th>DMICP Code</th>
                        <th>Description</th>
                        <th>FSN Type</th>
                        <th>Parent</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredData.map(item => (
                        <tr key={item.OrigId}>
                            <td>
                                <OverlayTrigger
                                    placement="right"
                                    overlay={renderTooltip(item)}
                                >
                                    <span>
                                        {item.Drop.startsWith('Drop1') && <FontAwesomeIcon icon={faExclamationTriangle} style={{ color: 'purple' }} />}
                                        {item.Drop.startsWith('Drop2') && <FontAwesomeIcon icon={faStar} style={{ color: 'slateblue' }} />}
                                        {item.Drop.startsWith('Drop3') && <FontAwesomeIcon icon={faTools} style={{ color: 'gray' }} />}
                                        {item.Drop.startsWith('Drop4') && <FontAwesomeIcon icon={faCogs} style={{ color: 'black' }} />}
                                    </span>
                                </OverlayTrigger>
                            </td>
                            <td>
                                <span
                                    style={{ color: 'blue', cursor: 'pointer' }}
                                    onClick={() => handleDMICPCodeClick(item.DMICPCode)}
                                >
                                    {item.DMICPCode}
                                </span>
                            </td>
                            <td>{item.Description}</td>
                            <td>{item.FSNType}</td>
                            <td>{item.Parent_Term ? `${item.Parent} - ${item.Parent_Term}` : item.Parent}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
}

export default PurposePage;

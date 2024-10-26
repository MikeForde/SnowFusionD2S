import React, { useState, useEffect, useContext } from 'react';
import { Table, ButtonGroup, Button, Dropdown, OverlayTrigger } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faExclamationTriangle, faTools, faCogs, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import "./Page.css" // Import the CSS file
import { useNavigate } from 'react-router-dom';
import { PurposeDataContext } from '../contexts/PurposeDataContext';
import renderTooltip from '../components/renderTooltip'; // Import the shared renderTooltip function

function PurposePage() {
    const { purposeData, filterType, setFilterType, subFilterType, setSubFilterType, dropFilter, setDropFilter } = useContext(PurposeDataContext);
    const [filteredData, setFilteredData] = useState([]);
    const [recordCount, setRecordCount] = useState(0);

    const navigate = useNavigate();

    const handleDMICPCodeClick = (dmicpCode) => {
        navigate(`/review/${dmicpCode}`); // Navigates to DMICPReadReviewPage with the DMICP code
    };


    useEffect(() => {
        if (purposeData.length > 0) {
            applyFilter(filterType, subFilterType);
        }
    }, [filterType, subFilterType, dropFilter, purposeData]);



    const applyFilter = (filterType, subFilterType = null) => {
        let filtered = [];

        if (filterType === 'Children of INT or UK') {
            filtered = purposeData.filter(item => !item.Purpose);
        } else if (filterType === 'Children of DMS') {
            filtered = purposeData.filter(item => item.Purpose);
        } else if (filterType === 'All') {
            filtered = purposeData;
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
            }
        } else if (filterType === 'Clinical') {
            if (subFilterType) {
                filtered = purposeData.filter(item => item.Purpose === subFilterType);
            } else {
                filtered = purposeData.filter(item => {
                    return !['OccMed', 'CivOccMed', 'Admin', 'MilAdmin', 'RehabAdmin', 'DentalAdmin', null].includes(item.Purpose);
                });
            }
        }

        // Apply Drop filter from context
        if (dropFilter) {
            filtered = filtered.filter(item => item.Drop.startsWith(dropFilter));
        }

        setFilteredData(filtered);
        setRecordCount(filtered.length);
    };



    return (
        <div className="container mt-4">
            <h3><FontAwesomeIcon icon={faCheckCircle} style={{ color: 'green', marginLeft: '10px' }} /> DMSCreate Codes</h3>
            <ButtonGroup className="mb-3">
                <Button variant={filterType === 'All' ? 'primary custom-button' : 'secondary'} onClick={() => { setFilterType('All'); setSubFilterType(null); }}>All</Button>
                <Button variant={filterType === 'Children of INT or UK' ? 'primary custom-button' : 'secondary'} onClick={() => { setFilterType('Children of INT or UK'); setSubFilterType(null); }}>Children of INT or UK</Button>
                <Button variant={filterType === 'Children of DMS' ? 'primary custom-button' : 'secondary'} onClick={() => { setFilterType('Children of DMS'); setSubFilterType(null); }}>Children of DMS</Button>
            </ButtonGroup>
            <ButtonGroup className="mb-3">
                <Dropdown as={ButtonGroup}>
                    <Button
                        variant={filterType === 'OccMed' && !subFilterType ? 'primary custom-button' : 'secondary'}
                        onClick={() => {
                            setFilterType('OccMed');
                            setSubFilterType(null);
                        }}
                    >
                        OccMed
                    </Button>
                    <Dropdown.Toggle
                        split
                        variant={filterType === 'OccMed' && subFilterType ? 'primary custom-button' : 'secondary'}
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
                        variant={filterType === 'Clinical' && !subFilterType ? 'primary custom-button' : 'secondary'}
                        onClick={() => {
                            setFilterType('Clinical');
                            setSubFilterType(null); // Reset subFilterType
                        }}
                    >
                        Clinical
                    </Button>
                    <Dropdown.Toggle
                        split
                        variant={filterType === 'Clinical' && subFilterType ? 'primary custom-button' : 'secondary'}
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
                        variant={filterType === 'Admin' && !subFilterType ? 'primary custom-button' : 'secondary'}
                        onClick={() => {
                            setFilterType('Admin');
                            setSubFilterType(null); // Reset subFilterType
                        }}
                    >
                        Admin
                    </Button>
                    <Dropdown.Toggle
                        split
                        variant={filterType === 'Admin' && subFilterType ? 'primary custom-button' : 'secondary'}
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
            <ButtonGroup className="mb-3">
                <Button variant={dropFilter === 'Drop1' ? 'primary custom-button' : 'secondary'} onClick={() => setDropFilter('Drop1')}>High</Button>
                <Button variant={dropFilter === 'Drop2' ? 'primary custom-button' : 'secondary'} onClick={() => setDropFilter('Drop2')}>Med</Button>
                <Button variant={dropFilter === 'Drop3' ? 'primary custom-button' : 'secondary'} onClick={() => setDropFilter('Drop3')}>Low</Button>
                <Button variant={dropFilter === 'Drop4' ? 'primary custom-button' : 'secondary'} onClick={() => setDropFilter('Drop4')}>Req</Button>
                <Button variant={dropFilter === null ? 'primary custom-button' : 'secondary'} onClick={() => setDropFilter(null)}>All</Button>
            </ButtonGroup>


            <p>Total Records: {recordCount}</p>

            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Gp</th>
                        <th>DMICP Code</th>
                        <th>Description</th>
                        <th>FSN Type</th>
                        <th>Read Parent</th>
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
                            <td>{item.Description.replace(/"/g, '')}</td>
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

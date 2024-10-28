// InactivatePage.js
import React, { useContext, useState, useEffect } from 'react';
import { Table, ButtonGroup, Button, OverlayTrigger, Row, Col, Dropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faExclamationTriangle, faTools, faCogs, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { InactivateDataContext } from '../contexts/InactivateDataContext';
import renderTooltip from '../components/renderTooltip';
import { CSVLink } from 'react-csv';

function InactivatePage() {
    const { inactivateData, dropFilter, setDropFilter } = useContext(InactivateDataContext);
    const [filteredData, setFilteredData] = useState([]);
    const [recordCount, setRecordCount] = useState(0);

    const navigate = useNavigate();

    const handleDMICPCodeClick = (dmicpCode) => {
        navigate(`/review/${dmicpCode}`);
    };

    useEffect(() => {
        applyFilter();
    }, [dropFilter, inactivateData]);

    const applyFilter = () => {
        let filtered = inactivateData;

        // Apply Drop filter
        if (dropFilter) {
            filtered = filtered.filter(item => item.Drop.startsWith(dropFilter));
        }

        setFilteredData(filtered);
        setRecordCount(filtered.length);
    };

    // Define headers for CSV
    const csvHeaders = [
        { label: 'Pre-Inactivate', key: 'Drop' },
        { label: 'DMICP Code', key: 'DMICPCode' },
        { label: 'Description', key: 'Description' },
        { label: 'New Description', key: 'NewDescription' },
        { label: 'Read Parent', key: 'Parent_Term' }
    ];

    // CSV data generator based on current filter
    const generateCSVData = (filteredData) => {
        return filteredData.map(item => ({
            Drop: item.Drop,
            DMICPCode: item.DMICPCode,
            Description: item.Description.replace(/"/g, ''),
            NewDescription: item.NewDescription ? item.NewDescription.replace(/"/g, '') : '',
            Parent_Term: item.Parent_Term ? `${item.Parent} - ${item.Parent_Term}` : item.Parent
        }));
    };

    // Function to create a filename based on dropFilter
    const generateFileName = (dropFilter) => {
        let fileName = "Inactivate_Codes_";
        if (dropFilter) fileName += `Priority_${dropFilter}_`;
        return fileName + "Filtered.tsv";
    };

    return (
        <div className="container mt-4">
            <h3><FontAwesomeIcon icon={faTimesCircle} style={{ color: 'red', marginLeft: '10px' }} /> Codes by Pre-Inactivation Priority</h3>

            {/* Filter by Drop (Pre-Inactivation Priority) */}
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
                                    filename={generateFileName(dropFilter)}
                                    separator={String.fromCharCode(9)}
                                    className="dropdown-item"
                                >
                                    Download Filtered Data (TSV)
                                </CSVLink>
                            </Dropdown.Item>
                            <Dropdown.Item as="div">
                                <CSVLink
                                    data={generateCSVData(inactivateData)}
                                    headers={csvHeaders}
                                    filename="Inactivate_Codes_Full.tsv"
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
                        <th>Pre-Inactivate</th>
                        <th>DMICP Code</th>
                        <th>Description</th>
                        <th>New Description</th>
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

                                </OverlayTrigger> </td>
                            <td>
                                <span style={{ color: 'blue', cursor: 'pointer' }} onClick={() => handleDMICPCodeClick(item.DMICPCode)}>
                                    {item.DMICPCode}
                                </span>
                            </td>
                            <td>{item.Description.replace(/"/g, '')}</td>
                            <td>{item.NewDescription ? item.NewDescription.replace(/"/g, '') : ''}</td>
                            <td>{item.Parent_Term ? `${item.Parent} - ${item.Parent_Term}` : item.Parent}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
}

export default InactivatePage;

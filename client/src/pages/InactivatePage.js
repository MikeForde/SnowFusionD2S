// InactivatePage.js
import React, { useContext, useState, useEffect } from 'react';
import { Table, ButtonGroup, Button, OverlayTrigger } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faExclamationTriangle, faTools, faCogs } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { InactivateDataContext } from '../contexts/InactivateDataContext';
import renderTooltip from '../components/renderTooltip';

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

    return (
        <div className="container mt-4">
            <h3>Codes by Pre-Inactivation Priority</h3>

            {/* Filter by Drop (Pre-Inactivation Priority) */}
            <ButtonGroup className="mb-3">
                <Button variant={dropFilter === 'Drop1' ? 'primary' : 'secondary'} onClick={() => setDropFilter('Drop1')}>High</Button>
                <Button variant={dropFilter === 'Drop2' ? 'primary' : 'secondary'} onClick={() => setDropFilter('Drop2')}>Med</Button>
                <Button variant={dropFilter === 'Drop3' ? 'primary' : 'secondary'} onClick={() => setDropFilter('Drop3')}>Low</Button>
                <Button variant={dropFilter === 'Drop4' ? 'primary' : 'secondary'} onClick={() => setDropFilter('Drop4')}>Req</Button>
                <Button variant={dropFilter === null ? 'primary' : 'secondary'} onClick={() => setDropFilter(null)}>All</Button>
            </ButtonGroup>

            <p>Total Records: {recordCount}</p>

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
                            <td>{item.Description}</td>
                            <td>{item.NewDescription}</td>
                            <td>{item.Parent_Term ? `${item.Parent} - ${item.Parent_Term}` : item.Parent}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
}

export default InactivatePage;

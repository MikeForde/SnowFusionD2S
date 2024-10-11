import React, { useState, useEffect, useContext } from 'react';
import { Form, Button, Card, Col, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faTimesCircle, faQuestionCircle, faExchangeAlt, faStar, faExclamationTriangle, faTools, faCogs, faEye } from '@fortawesome/free-solid-svg-icons';
import { useLoading } from '../contexts/LoadingContext';
import { SnomedContext } from '../SnomedContext'; // Import the context
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "./Page.css";

function DMICPReadReviewPage() {
    const [searchReadTerm, setSearchReadTerm] = useState('');
    const [reviewList, setReviewList] = useState([]);
    const [selectedReview, setSelectedReview] = useState(null);
    const { startLoading, stopLoading } = useLoading();
    const navigate = useNavigate();

    // Access the SNOMED context
    const { setSelectedSnomedCode } = useContext(SnomedContext); 

    useEffect(() => {
        if (Array.isArray(reviewList) && reviewList.length > 0) {
            setSelectedReview(reviewList[0]);
        }
    }, [reviewList]);

    const handleSearchChange = (e) => {
        setSearchReadTerm(e.target.value);
    };

    const handleSearchSubmit = async (e) => {
        e.preventDefault();
        try {
            startLoading();
            const response = await axios.get(`/review/search/${searchReadTerm}`);
            setReviewList(response.data || []);
        } catch (error) {
            console.error('Error fetching review data:', error);
        } finally {
            stopLoading();
        }
    };

    const handleViewCodeClick = (code, term) => {
        // Set the selected SNOMED code in the context with both conceptId and term
        setSelectedSnomedCode({ conceptId: code, term: term });
        // Navigate to HomePage using internal routing
        navigate('/');
    };
    

    return (
        <div className="container mt-4">
            <Row>
                <Col md={4} className="search-section">
                    <h3>Search Reviews</h3>
                    <Form onSubmit={handleSearchSubmit}>
                        <Form.Group controlId="searchReadTerm">
                            <Form.Control
                                type="text"
                                placeholder="Search by DMICP Code or Description"
                                value={searchReadTerm}
                                onChange={handleSearchChange}
                            />
                        </Form.Group>
                        <Button type="submit" className="custom-button mb-3">Search</Button>
                    </Form>

                    <h4>Results</h4>
                    <div className="scrollable-area">
                        {Array.isArray(reviewList) && reviewList.length > 0 ? (
                            reviewList.map((review) => (
                                <Card key={review.OrigId} onClick={() => setSelectedReview(review)}>
                                    <Card.Body>
                                        <Card.Title>
                                            {review.DMICPCode || 'No Code'}
                                            {review.Decision === 'DMSCreate' && (
                                                <>
                                                    <FontAwesomeIcon icon={faCheckCircle} style={{ color: 'green', marginLeft: '10px' }} />
                                                    {review.Drop && review.Drop.startsWith('Drop1') && (
                                                        <FontAwesomeIcon icon={faExclamationTriangle} style={{ color: 'purple', marginLeft: '10px' }} />
                                                    )}
                                                    {review.Drop && review.Drop.startsWith('Drop2') && (
                                                        <FontAwesomeIcon icon={faStar} style={{ color: 'blue', marginLeft: '10px' }} />
                                                    )}
                                                    {review.Drop && review.Drop.startsWith('Drop3') && (
                                                        <FontAwesomeIcon icon={faTools} style={{ color: 'gray', marginLeft: '10px' }} />
                                                    )}
                                                    {review.Drop && review.Drop.startsWith('Drop4') && (
                                                        <FontAwesomeIcon icon={faCogs} style={{ color: 'black', marginLeft: '10px' }} />
                                                    )}
                                                </>
                                            )}
                                            {review.Decision === 'Inactivate' && (
                                                <FontAwesomeIcon icon={faTimesCircle} style={{ color: 'red', marginLeft: '10px' }} />
                                            )}
                                            {review.Decision === 'Investigate' && (
                                                <FontAwesomeIcon icon={faQuestionCircle} style={{ color: 'orange', marginLeft: '10px' }} />
                                            )}
                                            {!['DMSCreate', 'Inactivate', 'Investigate'].includes(review.Decision) && (
                                                <FontAwesomeIcon icon={faExchangeAlt} style={{ color: 'blue', marginLeft: '10px' }} />
                                            )}
                                        </Card.Title>
                                        <Card.Text>{review.Description}</Card.Text>
                                    </Card.Body>
                                </Card>
                            ))
                        ) : (
                            <p>No results found.</p>
                        )}
                    </div>
                </Col>

                <Col md={8} className="details-section">
                    {selectedReview && (
                        <div className="details">
                            <h3>Review Details</h3>
                            <p><strong>Parent Code:</strong> {selectedReview.Parent} - {selectedReview.Parent_Term}</p>
                            <p><strong>DMICP Code:</strong> {selectedReview.DMICPCode} - {selectedReview.Description}</p>
                            <p><strong>Decision:</strong> {selectedReview.Decision}</p>
                            {selectedReview.NewDescription && <p><strong>New Description:</strong> {selectedReview.NewDescription}</p>}
                            {selectedReview.ManualMapCode && (
                                    <p><strong>Manual Map Code:</strong> {selectedReview.ManualMapCode} - {selectedReview.ManualMapFSN}
                                    <FontAwesomeIcon
                                            icon={faEye}
                                            style={{ color: 'blue', marginLeft: '10px', cursor: 'pointer' }}
                                            onClick={() => handleViewCodeClick(selectedReview.ManualMapCode, selectedReview.ManualMapFSN)} // Set the selected SNOMED code
                                        /></p>
                            )}
                            {selectedReview.APIMapCode && selectedReview.Decision === 'APIMap' && (
                                    <p><strong>API Map Code:</strong> {selectedReview.APIMapCode} - {selectedReview.APIMapTerm}
                                    <FontAwesomeIcon
                                            icon={faEye}
                                            style={{ color: 'blue', marginLeft: '10px', cursor: 'pointer' }}
                                            onClick={() => handleViewCodeClick(selectedReview.APIMapCode, selectedReview.APIMapTerm)} // Set the selected SNOMED code
                                        /></p>
                            )}
                            {selectedReview.SNOMEDCode && selectedReview.Decision === 'DMSCreate' && (
                                <div>
                                    <p>
                                        <strong>Example DMS SNOMED Code (for illustration):</strong> 
                                        {selectedReview.SNOMEDCode}
                                        <FontAwesomeIcon
                                            icon={faEye}
                                            style={{ color: 'blue', marginLeft: '10px', cursor: 'pointer' }}
                                            onClick={() => handleViewCodeClick(selectedReview.SNOMEDCode, selectedReview.Description)} // Set the selected SNOMED code
                                        />
                                    </p>
                                    <p>
                                        <strong>Suggested SNOMED Parent:</strong> 
                                        {selectedReview.SNOMEDParent} - {selectedReview.SNOMEDParentTerm}
                                        <FontAwesomeIcon
                                            icon={faEye}
                                            style={{ color: 'blue', marginLeft: '10px', cursor: 'pointer' }}
                                            onClick={() => handleViewCodeClick(selectedReview.SNOMEDParent, selectedReview.SNOMEDParentTerm)} // Set the selected SNOMED parent
                                        />
                                    </p>
                                </div>
                            )}
                        </div>
                    )}
                </Col>
            </Row>
        </div>
    );
}

export default DMICPReadReviewPage;

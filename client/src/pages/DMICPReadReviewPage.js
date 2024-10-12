import React, { useState, useEffect, useContext } from 'react';
import { Form, Button, Card, Col, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faTimesCircle, faQuestionCircle, faExchangeAlt, faStar, faExclamationTriangle, faTools, faCogs, faEye } from '@fortawesome/free-solid-svg-icons';
import { useLoading } from '../contexts/LoadingContext';
import { SnomedContext } from '../SnomedContext'; // Import the context
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import "./Page.css";

function DMICPReadReviewPage() {
    const { code } = useParams(); // Get the code from the URL
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

    useEffect(() => {
        if (code) {
            setSearchReadTerm(code);
            handleSearchBySNOMEDCode(code);
        }
    }, [code]);


    const handleSearchChange = (e) => {
        setSearchReadTerm(e.target.value);
    };

    const handleSearchSubmit = async (e) => {
        e.preventDefault();
        try {
            startLoading();
            const response = await axios.get(`/review/search/${searchReadTerm}`);
            setReviewList(response.data || []);
            if (response.data && response.data.length > 0) {
                setSelectedReview(response.data[0]);
            }
        } catch (error) {
            console.error('Error fetching review data:', error);
        } finally {
            stopLoading();
        }
    };

    const handleSearchBySNOMEDCode = async (snomedCode) => {
        try {
            startLoading();
            const response = await axios.get(`/review/searchBySNOMEDCode/${snomedCode}`);
            setReviewList(response.data || []);
            if (response.data && response.data.length > 0) {
                setSelectedReview(response.data[0]);
            }
        } catch (error) {
            console.error('Error fetching review data by SNOMEDCode:', error);
        } finally {
            stopLoading();
        }
    };


    const handleViewCodeClick = async (code) => {
        try {
            // Call the API to get the SNOMED code details
            const response = await axios.get(`/snomed/searchCode/${code}`);

            if (response.data && response.data.length > 0) {
                const { conceptId, term, moduleId } = response.data[0];

                // Set the selected SNOMED code in the context with conceptId, term, and moduleId
                setSelectedSnomedCode({ conceptId, term, moduleId });

                // Navigate to HomePage using internal routing
                navigate('/');
            } else {
                console.error("SNOMED code not found");
            }
        } catch (error) {
            console.error("Error fetching SNOMED code details:", error);
        }
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
                            <p><strong>Parent:</strong> {selectedReview.Parent} - {selectedReview.Parent_Term}</p>
                            <p><strong>Code: {selectedReview.DMICPCode} - {selectedReview.Description}</strong> </p>
                            <p><strong>Decision:</strong> {selectedReview.Decision}
                                {selectedReview.Decision === 'DMSCreate' && (
                                    <>
                                        <FontAwesomeIcon icon={faCheckCircle} style={{ color: 'green', marginLeft: '10px' }} />
                                    </>
                                )}
                                {selectedReview.Decision === 'Inactivate' && (
                                    <FontAwesomeIcon icon={faTimesCircle} style={{ color: 'red', marginLeft: '10px' }} />
                                )}
                                {selectedReview.Decision === 'Investigate' && (
                                    <FontAwesomeIcon icon={faQuestionCircle} style={{ color: 'orange', marginLeft: '10px' }} />
                                )}
                                {!['DMSCreate', 'Inactivate', 'Investigate'].includes(selectedReview.Decision) && (
                                    <FontAwesomeIcon icon={faExchangeAlt} style={{ color: 'blue', marginLeft: '10px' }} />
                                )}
                            </p>
                            {selectedReview.NewDescription && <p><strong>New Description:</strong> {selectedReview.NewDescription}</p>}
                            {selectedReview.ManualMapCode && (
                                <p><strong>Manual Map Code:</strong> {selectedReview.ManualMapCode} - {selectedReview.ManualMapFSN}
                                    <FontAwesomeIcon
                                        icon={faEye}
                                        style={{ color: 'blue', marginLeft: '10px', cursor: 'pointer' }}
                                        onClick={() => handleViewCodeClick(selectedReview.ManualMapCode)} // Set the selected SNOMED code
                                    /></p>
                            )}
                            {selectedReview.APIMapCode && selectedReview.Decision === 'APIMap' && (
                                <p><strong>API Map Code:</strong> {selectedReview.APIMapCode} - {selectedReview.APIMapTerm}
                                    <FontAwesomeIcon
                                        icon={faEye}
                                        style={{ color: 'blue', marginLeft: '10px', cursor: 'pointer' }}
                                        onClick={() => handleViewCodeClick(selectedReview.APIMapCode)} // Set the selected SNOMED code
                                    /></p>
                            )}
                            {selectedReview.SNOMEDCode && selectedReview.Decision === 'DMSCreate' && (
                                <div>
                                    <p>
                                        <strong>DMS SNOMED Code (for illustration):</strong>
                                        {selectedReview.SNOMEDCode}
                                        <FontAwesomeIcon
                                            icon={faEye}
                                            style={{ color: 'blue', marginLeft: '10px', cursor: 'pointer' }}
                                            onClick={() => handleViewCodeClick(selectedReview.SNOMEDCode)} // Set the selected SNOMED code
                                        />
                                    </p>
                                    <p>
                                        <strong>Suggested SNOMED Parent:</strong>
                                        {selectedReview.SNOMEDParent} - {selectedReview.SNOMEDParentTerm}
                                        <FontAwesomeIcon
                                            icon={faEye}
                                            style={{ color: 'blue', marginLeft: '10px', cursor: 'pointer' }}
                                            onClick={() => handleViewCodeClick(selectedReview.SNOMEDParent)} // Set the selected SNOMED parent
                                        />
                                    </p>
                                </div>
                            )}
                            {/* Additional Conditions based on the Drop field */}
                            {selectedReview.Decision === 'DMSCreate' && selectedReview.Drop && (
                                <div>
                                    {selectedReview.Drop.substring(0, 5) === 'Drop1' && selectedReview.Cat2 && (
                                        <p><strong>High Priority:</strong> {selectedReview.Cat2}</p>
                                    )}

                                    {selectedReview.Drop.substring(0, 5) === 'Drop2' && (
                                        <div>
                                            {/* Display Template-related data if exists */}
                                            {selectedReview.Templates && (
                                                <p><strong>Templates:</strong> {selectedReview.Templates}</p>
                                            )}
                                            {selectedReview.TemplateNames && (
                                                <p><strong>Template Names:</strong> {selectedReview.TemplateNames}</p>
                                            )}

                                            {/* Display Document-related data if exists */}
                                            {selectedReview.Documents && (
                                                <p><strong>Documents:</strong> {selectedReview.Documents}</p>
                                            )}
                                            {selectedReview.DocumentNames && (
                                                <p><strong>Document Names:</strong> {selectedReview.DocumentNames}</p>
                                            )}

                                            {/* Display Search-related data if exists */}
                                            {selectedReview.Searches && (
                                                <p><strong>Searches:</strong> {selectedReview.Searches}</p>
                                            )}
                                            {selectedReview.SearchNames && (
                                                <p><strong>Search Names:</strong> {selectedReview.SearchNames}</p>
                                            )}
                                        </div>
                                    )}

                                    {selectedReview.Drop.substring(0, 5) === 'Drop3' && selectedReview.UsageCount && (
                                        <p><strong>Usage in last 5 years:</strong> {selectedReview.UsageCount}</p>
                                    )}
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

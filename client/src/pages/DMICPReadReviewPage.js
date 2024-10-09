import React, { useState, useEffect } from 'react';
import { Form, Button, Card, Col, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faTimesCircle, faQuestionCircle, faExchangeAlt, faStar, faExclamationTriangle, faTools, faCogs } from '@fortawesome/free-solid-svg-icons'; // Add the necessary icons
import axios from 'axios';
import "./Page.css";

function DMICPReadReviewPage() {
    const [searchReadTerm, setSearchReadTerm] = useState(''); // Updated search term variable
    const [reviewList, setReviewList] = useState([]); // Ensure this is an array by default
    const [selectedReview, setSelectedReview] = useState(null);

    useEffect(() => {
        if (Array.isArray(reviewList) && reviewList.length > 0) {
            setSelectedReview(reviewList[0]); // Default to the first item if array is not empty
        }
    }, [reviewList]);

    const handleSearchChange = (e) => {
        setSearchReadTerm(e.target.value); // Update searchReadTerm
    };

    const handleSearchSubmit = async (e) => {
        e.preventDefault();

        // Log the search term
        console.log("Search term submitted:", searchReadTerm);

        try {
            const response = await axios.get(`/review/search/${searchReadTerm}`);
            console.log("Response from API:", response.data); // Add logging for the API response
            setReviewList(response.data || []); // Ensure an empty array is set if response.data is null or undefined
        } catch (error) {
            console.error('Error fetching review data:', error);
        }
    };

    return (
        <div className="container mt-4">
            <Row>
                <Col md={4}>
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
                                            {' '}
                                            {/* Conditionally render FontAwesome icons based on the Decision */}
                                            {review.Decision === 'DMSCreate' && (
                                                <>
                                                    <FontAwesomeIcon icon={faCheckCircle} style={{ color: 'green', marginLeft: '10px' }} />

                                                    {/* Conditionally render based on the first 5 characters of Drop */}
                                                    {review.Drop && review.Drop.startsWith('Drop1') && (
                                                        <FontAwesomeIcon icon={faExclamationTriangle} style={{ color: 'purple', marginLeft: '10px' }} />
                                                    )}
                                                    {review.Drop && review.Drop.startsWith('Drop2') && (
                                                        <FontAwesomeIcon icon={faStar} style={{ color: 'blue', marginLeft: '10px' }} /> /* Orange exclamation mark */
                                                    )}
                                                    {review.Drop && review.Drop.startsWith('Drop3') && (
                                                        <FontAwesomeIcon icon={faTools} style={{ color: 'gray', marginLeft: '10px' }} /> /* Grey "in-use" symbol */
                                                    )}
                                                    {review.Drop && review.Drop.startsWith('Drop4') && (
                                                        <FontAwesomeIcon icon={faCogs} style={{ color: 'black', marginLeft: '10px' }} /> /* Black "manufactured" symbol */
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

                <Col md={8}>
                    {selectedReview && (
                        <div className="details">
                            <h3>Review Details</h3>
                            <p><strong>Parent Code:</strong> {selectedReview.Parent} - {selectedReview.Parent_Term}</p>
                            <p><strong>DMICP Code:</strong> {selectedReview.DMICPCode}</p>
                            <p><strong>Description:</strong> {selectedReview.Description}</p>
                            <p><strong>Decision:</strong> {selectedReview.Decision}</p>

                            {/* Conditionally render NewDescription if it exists */}
                            {selectedReview.NewDescription && (
                                <p><strong>New Description:</strong> {selectedReview.NewDescription}</p>
                            )}

                            {/* Conditionally render ManualMapTerm if ManualMapCode exists */}
                            {selectedReview.ManualMapCode && (
                                <div>
                                    <p><strong>Manual Map Code:</strong> {selectedReview.ManualMapCode}</p>
                                    <p><strong>Manual Map Term:</strong> {selectedReview.ManualMapFSN}</p>
                                </div>
                            )}

                            {/* Conditionally render APIMapTerm if APIMapCode exists */}
                            {selectedReview.APIMapCode && selectedReview.Decision === 'APIMap' && (
                                <div>
                                    <p><strong>API Map Code:</strong> {selectedReview.APIMapCode}</p>
                                    <p><strong>API Map Term:</strong> {selectedReview.APIMapTerm}</p>
                                </div>
                            )}

                            {/* Conditionally render SNOMEDCode if it exists */}
                            {selectedReview.SNOMEDCode && selectedReview.Decision === 'DMSCreate' && (
                                <div>
                                    <p><strong>Example DMS SNOMED Code (for illustration):</strong> {selectedReview.SNOMEDCode}</p>
                                    <p><strong>Suggested SNOMED Parent:</strong> {selectedReview.SNOMEDParent} - {selectedReview.SNOMEDParentTerm}</p>
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

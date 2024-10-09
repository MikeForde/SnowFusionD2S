import React, { useState, useEffect } from 'react';
import { Form, Button, Card, Col, Row } from 'react-bootstrap';
import axios from 'axios';

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
                        <Button type="submit" className="mb-3">Search</Button>
                    </Form>

                    <h4>Results</h4>
                    <div className="scrollable-area">
                        {Array.isArray(reviewList) && reviewList.length > 0 ? (
                            reviewList.map((review) => (
                                <Card key={review.OrigId} onClick={() => setSelectedReview(review)}>
                                    <Card.Body>
                                        <Card.Title>{review.DMICPCode || 'No Code'}</Card.Title>
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
                            <p><strong>Parent Code:</strong> {selectedReview.Parent} - {selectedReview.Parent_Term} </p>
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
                                    <p><strong>Manual Map Term:</strong> {selectedReview.ManualMapTerm}</p>
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
                            {selectedReview.SNOMEDCode && (
                                <div>
                                <p><strong>Example DMS SNOMED Code (for illustration):</strong> {selectedReview.SNOMEDCode}</p>
                                <p><strong>Suggested SNOMED Parent:</strong> {selectedReview.SNOMEDParent}</p>
                                </div>
                            )}
                            {/* Add more fields as needed */}
                        </div>
                    )}

                </Col>
            </Row>
        </div>
    );
}

export default DMICPReadReviewPage;

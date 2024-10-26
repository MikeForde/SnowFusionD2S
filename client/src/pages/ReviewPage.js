import React from 'react';
import { Container, Row, Col, Card, Image } from 'react-bootstrap';

function ReviewPage() {
    return (
        <Container className="mt-5">
            <h2>Review of DMS Codes</h2>
            <p>
                The review process for over 9,000 DMS codes involved considerable manual intervention despite efforts to streamline it.
                Each code had to undergo careful evaluation to determine its ultimate fate among three potential outcomes.
            </p>

            {/* Placeholder for the diagram */}
            <Row className="my-4">
                <Col className="text-center">
                    <Image src="placeholder.png" alt="Diagram showing the review process" style={{ maxWidth: '100%' }} />
                    <p>Diagram of the review process (coming soon)</p>
                </Col>
            </Row>

            {/* Outcomes of the review */}
            <Card className="mb-4">
                <Card.Body>
                    <Card.Title>Possible Outcomes for Each Code</Card.Title>
                    <ul>
                        <li>Selection for creation as a DMS local code</li>
                        <li>Mapping to an existing SNOMED code</li>
                        <li>Designation for inactivation</li>
                    </ul>
                    <p>These outcomes reflect the decisions made for each code based on their relevance, usage, and comparability to existing SNOMED standards.</p>
                </Card.Body>
            </Card>

            {/* Systems used for the review */}
            <Card className="mb-4">
                <Card.Body>
                    <Card.Title>Systems Established for the Review</Card.Title>
                    <p>Two primary systems were established to facilitate this review process:</p>
                    <ol>
                        <li>
                            <strong>SnowStorm Server</strong>: A local copy of the NHS SNOMED server (SnowStorm) was created within Docker, containing a complete set of International and NHS SNOMED codes (as of Sep 2022).
                        </li>
                        <li>
                            <strong>SnowFusion-Access Application</strong>: A custom-built VBA Access application was created to serve as the single source of truth during the review. This application included:
                            <ul>
                                <li>UI components and VBA code designed to assist in the review process</li>
                                <li>Integration with SnowStorm via its API for direct communication and code matching</li>
                            </ul>
                        </li>
                    </ol>
                </Card.Body>
            </Card>

            {/* Mapping process */}
            <Card className="mb-4">
                <Card.Body>
                    <Card.Title>Mapping Process</Card.Title>
                    <p>The mapping process used the SnowFusion-Access application and SnowStorm API to facilitate the matching of DMS codes to SNOMED entries:</p>
                    <ul>
                        <li>Each code was searched in SNOMED using the API, and any potential matches were retrieved.</li>
                        <li>
                            Literal matches were generally acceptable but required manual verification. Some codes, such as PULHHEEMS, exist in SNOMED but may not carry the same functional significance in non-DMS contexts, which influenced mapping decisions.
                        </li>
                        <li>Close matches were further evaluated, with manual searches conducted when initial matches were insufficient.</li>
                        <li>
                            Some codes were deliberately not mapped due to functional or structural differences between DMS needs and SNOMED hierarchy, ensuring the DMS-specific context was preserved.
                        </li>
                    </ul>
                </Card.Body>
            </Card>
        </Container>
    );
}

export default ReviewPage;

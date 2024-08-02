import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

function AboutPage() {
    return (
        <Container className="mt-5">
            <Row>
                <Col>
                    <h3>About SNOMED CT</h3>
                    <p>
                        Wibble
                    </p>
                    <p>
                        Wibble
                    </p>
                </Col>
            </Row>
            <Row className="mt-4">
                <Col>
                    <h3>Useful Links</h3>
                    <Card>
                        <Card.Body>
                            <Card.Title>SNOMED CT Implementation Guide</Card.Title>
                            <Card.Text>
                                Wibble
                            </Card.Text>
                            <Card.Link href="https://www.hl7.org/fhir/uv/ips/">
                                SNOMED CT Implementation Guide
                            </Card.Link>
                        </Card.Body>
                    </Card>
                    <Card>
                        <Card.Body>
                            <Card.Title>NHS SNOMED CT Website</Card.Title>
                            <Card.Text>
                            Wibble
                            </Card.Text>
                            <Card.Link href="https://international-patient-summary.net">
                                NHS SNOMED CT Website
                            </Card.Link>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default AboutPage;

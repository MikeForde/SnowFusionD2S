import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

function AboutPage() {
    return (
        <Container className="mt-5">
            <Row className="mb-4">
                <Col>
                    <h1 className="display-4 text-center">About SNOMED CT</h1>
                    <p className="lead text-center">
                        SNOMED CT is a systematically organized, computer-processable collection of medical terms 
                        providing codes, terms, synonyms, and definitions used in clinical documentation and reporting.
                    </p>
                    <hr />
                </Col>
            </Row>
            <Row className="mb-5">
                <Col md={6}>
                    <h3>What is SNOMED CT?</h3>
                    <p>
                        SNOMED CT (Systematized Nomenclature of Medicine -- Clinical Terms) is the most comprehensive,
                        multilingual clinical healthcare terminology in the world. SNOMED CT is used by clinicians,
                        researchers, and policy makers to capture, share, and aggregate clinical data across specialties
                        and sites of care.
                    </p>
                    <p>
                        It is designed to support the development of comprehensive high-quality clinical content in
                        electronic health records and to enable data to be shared and reused within and across clinical
                        domains.
                    </p>
                </Col>
                <Col md={6}>
                    <h3>Benefits of SNOMED CT</h3>
                    <ul>
                        <li>Improves patient care by ensuring that clinical terms are accurately represented and recorded.</li>
                        <li>Supports interoperability by providing a common language for clinical terms across different healthcare systems.</li>
                        <li>Facilitates research by enabling the analysis of aggregated data across multiple sites and domains.</li>
                        <li>Reduces errors in clinical documentation and reporting by standardizing the terminology used.</li>
                    </ul>
                </Col>
            </Row>
            <Row className="mb-4">
                <Col>
                    <h3>Useful Links</h3>
                </Col>
            </Row>
            <Row>
                <Col md={6} className="mb-4">
                    <Card className="shadow-sm">
                        <Card.Body>
                            <Card.Title>SNOMED CT</Card.Title>
                            <Card.Text>
                                SNOMED CT is the most comprehensive, multilingual clinical healthcare terminology in the world.
                                It is a core clinical healthcare terminology that serves to capture the clinical terms used
                                in health records.
                            </Card.Text>
                            <Button variant="primary" href="https://www.snomed.org" target="_blank" rel="noopener noreferrer" className='custom-button'>
                                Visit SNOMED CT HomePage
                            </Button>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={6} className="mb-4">
                    <Card className="shadow-sm">
                        <Card.Body>
                            <Card.Title>NHS SNOMED CT Website</Card.Title>
                            <Card.Text>
                                The NHS SNOMED CT website offers resources and tools for exploring the SNOMED CT reference set
                                used within the NHS. Note: The reference set used in SnowFusion is from September 2022.
                            </Card.Text>
                            <Button variant="primary" href="https://termbrowser.nhs.uk/?" target="_blank" rel="noopener noreferrer" className='custom-button'>
                                Visit NHS SNOMED CT Term Browser
                            </Button>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default AboutPage;


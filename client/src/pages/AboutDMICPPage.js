import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

function AboutDMICPPage() {
    return (
        <Container className="mt-5">
            <Row>
                <Col>
                    <h2>About DMICP and Read Codes</h2>
                    <p>
                        The Defence Medical Information Capability Programme (DMICP) is the electronic healthcare records system used by the UK Ministry of Defence (MOD) to manage medical information for military personnel. It provides an integrated healthcare record system that supports clinical and management processes across the MOD's healthcare services.
                    </p>
                </Col>
            </Row>
            <Row className="mt-4">
                <Col>
                    <h3>DMICP Overview</h3>
                    <Card>
                        <Card.Body>
                            <Card.Text>
                                DMICP is a comprehensive healthcare information system designed to provide the UK Armed Forces with an integrated electronic health record (EHR). Built upon commercial software solutions, DMICP enables healthcare professionals within the MOD to access and update patient records securely and efficiently, supporting the delivery of high-quality medical care to service members worldwide.
                            </Card.Text>
                            <Card.Text>
                                For more information on DMICP, you can refer to the <a href="https://www.cgi.com/en/media/case-study/CGI-hosts-integrated-health-records-system-for-the-Ministry-of-Defense" target="_blank" rel="noopener noreferrer">CGI case study</a>.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Row className="mt-4">
                <Col>
                    <h3>Read Codes</h3>
                    <Card>
                        <Card.Body>
                            <Card.Text>
                                Read Codes are a coded thesaurus of clinical terms that were historically used within the UK's National Health Service (NHS) to record patient findings and procedures. They allowed clinicians to record information about patient care in a standardized way, facilitating data sharing and analysis.
                            </Card.Text>
                            <Card.Text>
                                The use of Read Codes has been largely superseded by SNOMED CT (Systematized Nomenclature of Medicine Clinical Terms), which provides a more comprehensive and internationally recognized set of clinical terminologies.
                            </Card.Text>
                            <Card.Text>
                                For more information on Read Codes, please visit the <a href="https://digital.nhs.uk/services/terminology-and-classifications/read-codes" target="_blank" rel="noopener noreferrer">NHS Digital website</a>.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Row className="mt-4">
                <Col>
                    <h3>Transition to SNOMED CT</h3>
                    <Card>
                        <Card.Body>
                            <Card.Text>
                                The NHS has transitioned from using Read Codes to SNOMED CT as the standard clinical terminology system. SNOMED CT provides a more detailed and comprehensive coding system that supports the recording and sharing of clinical data across different healthcare settings.
                            </Card.Text>
                            <Card.Text>
                                This transition enhances interoperability and improves patient care by enabling more precise recording of clinical information.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Row className="mt-4">
                <Col>
                    <h3>DMICP's Role in the MOD</h3>
                    <Card>
                        <Card.Body>
                            <Card.Text>
                                DMICP plays a crucial role in managing the health records of military personnel. It provides healthcare professionals within the MOD with access to comprehensive patient information, supporting clinical decision-making and ensuring continuity of care, even in challenging environments.
                            </Card.Text>
                            <Card.Text>
                                The system supports a range of functionalities, including appointment scheduling, medical record keeping, prescription management, and reporting. By consolidating health information into a single system, DMICP enhances the efficiency and effectiveness of healthcare delivery within the MOD.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Row className="mt-4">
                <Col>
                    <h3>Key Features of DMICP</h3>
                    <Card>
                        <Card.Body>
                            <Card.Text>
                                DMICP offers several key features:
                                <ul>
                                    <li><strong>Integrated Electronic Health Records:</strong> Provides a unified patient record accessible by authorized healthcare professionals.</li>
                                    <li><strong>Global Accessibility:</strong> Enables access to patient records from various locations worldwide, supporting deployed operations.</li>
                                    <li><strong>Secure Data Management:</strong> Ensures the confidentiality and integrity of patient data through robust security measures.</li>
                                    <li><strong>Clinical Decision Support:</strong> Assists clinicians with decision-making through access to comprehensive patient histories and relevant medical information.</li>
                                    <li><strong>Interoperability:</strong> Facilitates data exchange with other healthcare systems and supports standardized coding systems like SNOMED CT.</li>
                                </ul>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default AboutDMICPPage;

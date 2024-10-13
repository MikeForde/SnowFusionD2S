import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

function AboutWebAppPage() {
    const isHostedOnAzure = window.location.href.includes("snofusion-d2s");
    return (
        <Container className="mt-5">
            <Row>
                <Col>
                    <h2>About This Web Application</h2>
                    <p>
                        This web application is a prototype designed to demonstrate the relationships between DMS Local Codes and established International and UK SNOMED CT codes. It highlights codes that are unique to DMS and do not currently exist in SNOMED (International or UK). In any future electronic health record (EHR) system, such codes would need to be created as local extensions.
                    </p>
                </Col>
            </Row>
            <Row className="mt-4">
                <Col>
                    <h3>Key Features</h3>
                    <Card>
                        <Card.Body>
                            <Card.Text>
                                This application offers several key features:
                                <ul>
                                    <li><strong>Comprehensive SNOMED CT Searching</strong>: Simultaneously search for SNOMED CT codes by term or concept ID across DMS Local, UK, and International datasets.</li>
                                    <li><strong>DMS Local Code Integration</strong>: Visualize how DMS Local Codes relate to existing SNOMED CT codes and access detailed information about them.</li>
                                    <li><strong>Parent/Child Relationships</strong>: Explore hierarchical relationships between SNOMED CT codes, including handling cases where concepts and descriptions are active in different datasets.</li>
                                    <li><strong>Enhanced Navigation</strong>: Easily navigate between the HomePage and the DMICP Read Review page using intuitive view icons.</li>
                                    <li><strong>Accurate Dataset Representation</strong>: The application correctly displays the origin of codes using flags based on module IDs, ensuring clarity between DMS, UK, and International codes.</li>
                                    <li><strong>Responsive Interface</strong>: A user-friendly and responsive design that adapts to various screen sizes.</li>
                                </ul>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Row className="mt-4">
                <Col>
                    <h3>Development Pipeline</h3>
                    <Card>
                        <Card.Body>
                            <Card.Text>
                                The development pipeline involves the following steps:
                                <ol>
                                    <li><strong>Development Environment</strong>: Docker - Node 22 on Debian Bookworm.</li>
                                    <li><strong>Version Control</strong>: Managed via <a href="https://github.com/MikeForde/SnowFusionD2S" target="_blank" rel="noopener noreferrer">GitHub</a>.</li>
                                    <li><strong>Continuous Deployment</strong>: Automated through GitHub Actions, ensuring that updates are seamlessly deployed to the cloud environment whenever changes are made to the <a href="https://github.com/MikeForde/SnowFusionD2S" target="_blank" rel="noopener noreferrer">GitHub Repository</a>.</li>
                                </ol>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Row className="mt-4">
                <Col>
                    <h3>Hosting Options</h3>
                    <Card>
                        <Card.Body>
                            <Card.Text>
                                {isHostedOnAzure ? (
                                    <>
                                        This web application is currently being hosted on MODNET D2S.<br />
                                        It can be deployed on a variety of platforms, including standalone Linux systems, virtual machines (VMs), or Docker containers, providing flexibility for different hosting environments.
                                    </>
                                ) : (
                                    <>
                                        This web application is currently being hosted on a closed network.<br />
                                        It is also capable of being hosted on cloud services like OpenShift/D2S, providing scalability and ease of access in secure environments.
                                    </>
                                )}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Row className="mt-4">
                <Col>
                    <h3>Usage Scenarios</h3>
                    <Card>
                        <Card.Body>
                            <Card.Text>
                                This application is ideal for:
                                <ul>
                                    <li><strong>Healthcare Professionals</strong>: Exploring comprehensive relationships between DMS Local Codes and SNOMED CT codes, aiding in clinical decision-making and patient record management.</li>
                                    <li><strong>Developers</strong>: Integrating DMS Local Codes and SNOMED CT data into healthcare applications, testing code relationships, and leveraging enhanced search functionalities.</li>
                                    <li><strong>Researchers</strong>: Analyzing the relationships and hierarchical structures between medical concepts across different datasets.</li>
                                </ul>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Row className="mt-4">
                <Col>
                    <h3>Future Development and Experimentation</h3>
                    <Card>
                        <Card.Body>
                            <Card.Text>
                                While this prototype is fully functional, future improvements may include:
                                <ul>
                                    <li><strong>Advanced Search Capabilities</strong>: Implementing more sophisticated search algorithms, including natural language processing (NLP) to better understand user queries.</li>
                                    <li><strong>Extended Dataset Support</strong>: Including more regional datasets or other medical ontologies to provide a more comprehensive tool.</li>
                                    <li><strong>Integration with Other Systems</strong>: Expanding the application to integrate with electronic health record (EHR) systems or other healthcare applications.</li>
                                    <li><strong>Enhanced User Interface</strong>: Further refining the UI to improve usability and user experience.</li>
                                </ul>
                                We welcome feedback and ideas for further development!
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default AboutWebAppPage;

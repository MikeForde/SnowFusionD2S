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
                        This application is a powerful tool designed to analyze and understand DMS Local Codes in the context of International and UK SNOMED CT codes. Approximately 40,000 DMS local codes in DMICP were filtered to 9,000 for review based on criteria like occupational relevance, clinical usage, and code activity. The goal was to determine whether these codes should be locally created, mapped to SNOMED CT, or inactivated.
                    </p>
                </Col>
            </Row>
            <Row className="mt-4">
                <Col>
                    <h3>Key Features</h3>
                    <Card>
                        <Card.Body>
                            <Card.Text>
                                The application provides a suite of features for reviewing, filtering, and analyzing DMS Local Codes:
                                <ul>
                                    <li><strong>Comprehensive SNOMED CT Search</strong>: Search for SNOMED CT codes across DMS Local, UK, and International datasets by term or concept ID, with simultaneous dataset querying.</li>
                                    <li><strong>Group-Based Review Categories</strong>: Codes are grouped based on their importance and usage frequency, allowing users to focus on critical categories, including codes essential to occupational health (Group 1), used in clinical protocols (Group 2), and active within the last five years (Group 3).</li>
                                    <li><strong>DMS Create, Map, and Inactivate Pages</strong>: Dedicated pages provide targeted functionality, including options to view local codes proposed for creation, codes mapped to existing SNOMED CT entries, and those set for inactivation.</li>
                                    <li><strong>Detailed Filtering Options</strong>: Filter codes by categories such as purpose, map status, inactivation status, and more, helping users efficiently navigate large datasets.</li>
                                    <li><strong>Hierarchical Parent/Child Relationships</strong>: Explore relationships within SNOMED CT, even across datasets, to understand where codes align within medical taxonomies.</li>
                                    <li><strong>Enhanced Interface</strong>: A responsive, intuitive design adapts to various devices and screen sizes, with helpful icons and detailed tooltips to assist navigation.</li>
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
                                The development pipeline is designed for continuous improvement and includes:
                                <ol>
                                    <li><strong>Development Environment</strong>: Built with Docker, running Node 22 on Debian Bookworm.</li>
                                    <li><strong>Version Control</strong>: Managed through <a href="https://github.com/MikeForde/SnowFusionD2S" target="_blank" rel="noopener noreferrer">GitHub</a> for collaboration and code integrity.</li>
                                    <li><strong>Continuous Deployment</strong>: Automated with GitHub Actions, allowing seamless deployment to the cloud whenever updates are made to the <a href="https://github.com/MikeForde/SnowFusionD2S" target="_blank" rel="noopener noreferrer">GitHub Repository</a>.</li>
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
                                        The application is currently hosted on MODNET D2S.<br />
                                        It supports flexible deployment across platforms like standalone Linux systems, virtual machines (VMs), or Docker containers, catering to diverse hosting requirements.
                                    </>
                                ) : (
                                    <>
                                        The application is currently hosted on a closed network.<br />
                                        It can also be hosted on cloud services like OpenShift/D2S for enhanced scalability and accessibility in secure environments.
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
                                    <li><strong>Healthcare Professionals</strong>: Facilitating decisions about DMS Local Codes relative to SNOMED CT, aiding in clinical decision-making and patient record accuracy.</li>
                                    <li><strong>Developers</strong>: Integrating DMS and SNOMED CT data into healthcare applications, developing code mappings, or implementing enhanced search functionalities.</li>
                                    <li><strong>Researchers</strong>: Investigating medical concept relationships and taxonomy structures between DMS Local and SNOMED CT codes.</li>
                                </ul>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Row className="mt-4">
                <Col>
                    <h3>Future Development</h3>
                    <Card>
                        <Card.Body>
                            <Card.Text>
                                Future updates aim to include:
                                <ul>
                                    <li><strong>Advanced Search Enhancements</strong>: Incorporating NLP and other algorithms to support more natural, user-friendly searches.</li>
                                    <li><strong>Extended Data Support</strong>: Integrating additional datasets or regional ontologies to create a more comprehensive tool.</li>
                                    <li><strong>Cross-System Integration</strong>: Expanding compatibility with EHR systems for smoother clinical workflows.</li>
                                    <li><strong>User Experience Improvements</strong>: Ongoing UI refinements to enhance usability and navigation.</li>
                                </ul>
                                We encourage user feedback and ideas to inform future development!
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default AboutWebAppPage;

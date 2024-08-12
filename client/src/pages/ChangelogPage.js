import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

function ChangeLogPage() {
    return (
        <Container className="mt-5">
            <Row>
                <Col>
                    <h1 className="display-4 text-center mb-4">ChangeLog</h1>
                    <p className="text-center text-muted">Versions refer to D2S Deployments</p>
                    <hr />
                    <ul className="list-unstyled">
                        <li className="mb-5">
                            <h3 className="text-primary">Version 0_1 (Initial Release) - 11 Aug 2024</h3>
                            <ul>
                                <li>
                                    <p><strong>Implemented basic functionality for the SERN SNOMED web app.</strong></p>
                                </li>
                                <li>
                                    <p>Single page with Search and Display.</p>
                                </li>
                                <li>
                                    <p>Framework code based on IPS SERN WebApp.</p>
                                </li>
                            </ul>
                        </li>
                        <li className="mb-5">
                            <h3 className="text-primary">Version 0_2 (Enhanced Search) - 12 Aug 2024</h3>
                            <ul>
                                <li>
                                    <p><strong>Parent and Child Hierarchy.</strong></p>
                                </li>
                                <li>
                                    <p>Added display of Parent and Child codes on the main page.</p>
                                </li>
                                <li>
                                    <p>Improved the search functionality to handle both terms and concept IDs.</p>
                                </li>
                            </ul>
                        </li>
                        <li className="mb-5">
                            <h3 className="text-primary">Version 0_3 - 12 Aug 2024</h3>
                            <ul>
                                <li>
                                    <p><strong>Extra Info and Better Navigation</strong></p>
                                </li>
                                <li>
                                    <p>Added more information about SNOMED in general.</p>
                                </li>
                                <li>
                                    <p>Clicking on Parent or Child code centers view on that code.</p>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </Col>
            </Row>
        </Container>
    );
}

export default ChangeLogPage;


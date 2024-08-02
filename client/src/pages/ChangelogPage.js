import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

function ChangeLogPage() {
    return (
        <Container className="mt-5">
            <Row>
                <Col>
                    <h3>ChangeLog - Versions refer to Cloud Deployments</h3>
                    <ul>
                        <li>
                            <h5>Version 0_1 (Initial Release) - 01 Aug 2024</h5>
                            <ul>
                                <li><strong>Implemented basic functionality for the SERN SNOMED web app.</strong></li>
                                <li>Single page with Search and Display</li>
                            </ul>
                        </li>
                    </ul>
                </Col>
            </Row>
        </Container>
    );
}

export default ChangeLogPage;

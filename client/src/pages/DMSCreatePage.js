import React from 'react';
import { Container, Row, Col, Card, Image } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCheckCircle,
    faExchangeAlt,
    faTimesCircle,
} from '@fortawesome/free-solid-svg-icons';

function DMSCreatePage() {
    return (
        <Container className="mt-5">
            <h2>Organising the DMS Create Codes in the SNOMED hierarchy</h2>
            <p>
                A 'fusing' process was performed to show how the DMS Local codes chosen during the review for creation would relate to the SNOMED hierarchy.
            </p>
            <p>To exist in any hierarchical coded system each DMS Local Code needs a parent code.
            </p>

            {/* Placeholder for the diagram */}
            <Row className="my-4">
                <Col className="text-center">
                    <Image src="SnowFusion_Positioning.png" alt="Diagram showing the positioning process" style={{ maxWidth: '100%' }} />
                    <p>Overview of Review Process</p>
                </Col>
            </Row>

            {/* Outcomes of the review */}
            <Card className="mb-4">
                <Card.Body>
                    <Card.Title>Possible Parent Candidates for Each Code</Card.Title>
                    <ul>
                        <li>Another DMS Create code in the dataset (often but always its equivalent parent in DMICP Read).</li>
                        <li>A SNOMED Code that is equivalent to a NHS Read code in DMICP (often but always its equivalent parent in DMICP Read).</li>
                        <li>A SNOMED Code that did not previously exist in DMICP Read.</li>
                        <li>A DMS code from DMICP that is not yet in the dataset but should be brought in for that purpose.</li>
                        <li>A synthetic DMS code that did not exist in DMICP but needs creating to enable a logical hierarchical structure.</li>
                    </ul>
                    <p>It should be remembered that a small but significant number of codes were not organised in DMICP Read - i.e., were placed in the top/root level of the Read hierarchy.</p>
                </Card.Body>
            </Card>

            {/* Systems used for the review */}
            <Card className="mb-4">
                <Card.Body>
                    <Card.Title>Systems Used for the Organisation Process</Card.Title>
                    <p>The Two primary systems set up for the review were also used to facilitate this organisation process:</p>
                    <ol>
                        <li>
                            <strong>SnowStorm Server</strong>: A copy of the NHS SNOMED server system (SnowStorm) created locally within Docker and seeded with a complete set of International and NHS SNOMED codes (as at Sep 2022).
                        </li>
                        <li>
                            <strong>SnowFusion-Access Application</strong>: A custom-built VBA Access application created to serve as the single source of truth during the review. This application included:
                            <ul>
                                <li>UI components and VBA code designed to assist in the organisation process - shown below.</li>
                                <li>Integration with SnowStorm via its API to ensure any SNOMED parents chosen were defintely active codes.</li>
                                <li>SnowFusion-Access can generate SNOMED RF2 files - the official format - and, using the API, import these into the SnowStorm Server</li>
                                <li>It was then possible to view the integrated codes within the context of the regular SnowStorm SNOMED CT browser.</li>
                            </ul>
                        </li>
                    </ol>
                </Card.Body>
            </Card>

            {/* Placeholder for the diagram */}
            <Row className="my-4">
                <Col className="text-center">
                    <Image src="SnowFusion-Access.png" alt="Diagram showing the positioning process" style={{ maxWidth: '100%' }} />
                    <p>Main SnowFusion-Access Interface</p>
                </Col>
            </Row>

            {/* Mapping process */}
            {/* <Card className="mb-4">
                <Card.Body>
                    <Card.Title><FontAwesomeIcon
                        icon={faExchangeAlt}
                        style={{ color: 'blue', marginRight: '10px' }}
                    />Mapping Process</Card.Title>
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
                        <li>An example of High Priority codes that were mapped are those for audiometry frequency. These play a critical role in the DMS but exist as standard codes as hearing tests clearly exist in the NHS as well.</li>
                        <li>In total 2392 codes were mapped, 1710 by API matches and 682 manually.</li>
                    </ul>
                </Card.Body>
            </Card> */}
        </Container>
    );
}

export default DMSCreatePage;

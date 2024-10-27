import React from 'react';
import { Container, Row, Col, Card, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCheckCircle,
    faExchangeAlt,
    faTimesCircle,
} from '@fortawesome/free-solid-svg-icons';

function ReviewPage() {
    return (
        <Container className="mt-5">
            <h2>Review of the 9000+ Codes</h2>
            <p>
                The review process of the 9000+ codes was necessarily a long manual one despite efforts to streamline it, hence the effort spent on <Link to="/from40000to9000">
                    down-selecting these codes</Link> from the original nearly 40,000 DMS local codes in DMICP.
                Each code had to undergo careful evaluation to determine its ultimate fate among three potential outcomes.
            </p>

            {/* Placeholder for the diagram */}
            <Row className="my-4">
                <Col className="text-center">
                    <Image src="SnowFusion_Review.png" alt="Diagram showing the review process" style={{ maxWidth: '100%' }} />
                    <p>Overview of Review Process</p>
                </Col>
            </Row>

            {/* Outcomes of the review */}
            <Card className="mb-4">
                <Card.Body>
                    <Card.Title>Possible Outcomes for Each Code</Card.Title>
                    <ul>
                        <li><FontAwesomeIcon
                            icon={faCheckCircle}
                            style={{ color: 'green', marginRight: '10px' }}
                        /> Selection for <Link to="/snomed-positioning">creation as a DMS local code</Link></li>
                        <li><FontAwesomeIcon
                            icon={faExchangeAlt}
                            style={{ color: 'blue', marginRight: '10px' }}
                        />Mapping to an existing SNOMED code</li>
                        <li><FontAwesomeIcon
                            icon={faTimesCircle}
                            style={{ color: 'red', marginRight: '10px' }}
                        />Designation for inactivation</li>
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
                            <strong>SnowStorm Server</strong>: A copy of the NHS SNOMED server system (SnowStorm) was created locally within Docker and seeded with a complete set of International and NHS SNOMED codes (as at Sep 2022).
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
            </Card>
            {/* Inactivation process */}
            <Card className="mb-4">
                <Card.Body>
                    <Card.Title><FontAwesomeIcon
                        icon={faTimesCircle}
                        style={{ color: 'red', marginRight: '10px' }}
                    />Inactivation Process</Card.Title>
                    <p>The selection process for inactivation was also handled manually. However, some broad groups of codes were identified with similar inactivation criteria:</p>
                    <ul>
                        <li>
                            <strong>High Priority Business Critical Codes</strong>: Only 51 codes from this group were earmarked for inactivation. All but two of these describe transitions between grades, such as "from-grade" and "to-grade" transitions. These codes were initially required due to limitations in the system, though ideally, grade transitions would be managed more accurately.
                        </li>
                        <li>
                            <strong>Medium Priority Business Critical Codes</strong>: A total of 233 medium-priority codes were identified for inactivation for various reasons, including:
                            <ul>
                                <li><strong>Legacy Codes</strong>: Outdated codes no longer in active use.</li>
                                <li><strong>Military Occupational Role Codes</strong>: It was determined that a future HR system should be the authoritative source for a patient's occupation, rendering these codes unnecessary. Some of these codes exist in SNOMED but are inconsistently used, and separate discussions are underway to potentially work with the NHS to remove them.</li>
                                <li><strong>Template-Specific Codes</strong>: Due to DMICP limitations, template controls needed to be linked to codes to save data to consultations. Some codes were created solely for this purpose and have limited meaning outside of these templates, which will no longer exist.</li>
                            </ul>
                        </li>
                        <li>
                            <strong>Low Priority - Codes include due to usage in last 5yrs</strong>: A total of 774 low-priority codes were identified for inactivation. In addition to the above there are other reasons including:
                            <ul>
                                <li><strong>Location and Militatry Unit codes</strong>: These will not be used in the future system.</li>
                                <li><strong>Poor Construction</strong>: Some codes were earmarked for inactivation because they simply could not work alongside SNOMED e.g. overloaded terms</li>
                                <li><strong>Duplication</strong>:  Some DMS codes served the same purpose as other more established DMS codes.</li>
                                <li><strong>Low Usage</strong>: While low usage alone was not used to determine that a code should be inactivated, very low usage coupled with a taxonomic meaning issues meant on balance that these codes were then selected.</li>
                            </ul>
                        </li>
                    </ul>
                    <p>
                        Each code inactivated has a reason comment entered, explaining why it was made inactive. While these comments are currently unavailable in the WebApp, plans are in place to make them accessible in the future.
                    </p>
                </Card.Body>
            </Card>
        </Container>
    );
}

export default ReviewPage;

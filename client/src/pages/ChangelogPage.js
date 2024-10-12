import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import "./Page.css";

function ChangeLogPage() {
    return (
        <Container className="mt-5 ChangeLogPage">
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
                                    <p><strong>Extra Info, Better Navigation and Fixes</strong></p>
                                </li>
                                <li>
                                    <p>Added more information about SNOMED in general.</p>
                                </li>
                                <li>
                                    <p>Clicking on Parent or Child code centers view on that code.</p>
                                </li>
                                <li>
                                    <p>Fixes to search returns so confined to active descriptions and accepting codes ending in 0</p>
                                </li>
                            </ul>
                        </li>
                        <li className="mb-5">
                            <h3 className="text-primary">Version 0_4 - 13 Aug 2024</h3>
                            <ul>
                                <li>
                                    <p><strong>UK Extension Features</strong></p>
                                </li>
                                <li>
                                    <p>Integrated UK-specific SNOMED CT extensions alongside the International dataset.</p>
                                </li>
                                <li>
                                    <p>Added functionality to display a UK flag next to codes originating from the UK module.</p>
                                </li>
                                <li>
                                    <p>Enhanced search to include both UK and International SNOMED CT terms.</p>
                                </li>
                                <li>
                                    <p>Updated the parent/child relationship views to account for UK extensions, showing relationships across both datasets.</p>
                                </li>
                            </ul>
                        </li>
                        <li className="mb-5">
                            <h3 className="text-primary">Version 0_5 - 29 Aug 2024</h3>
                            <ul>
                                <li>
                                    <p><strong>DMS Local Code Integration</strong></p>
                                </li>
                                <li>
                                    <p>Incorporated DMS Local Codes into the application, allowing them to be displayed alongside UK and International SNOMED CT codes.</p>
                                </li>
                                <li>
                                    <p>Added functionality to display "DMS Local Code" and a flag icon when the moduleId corresponds to DMS codes.</p>
                                </li>
                                <li>
                                    <p>Enhanced the parent/child relationship logic to include DMS Local Codes, integrating them into the hierarchical views.</p>
                                </li>
                                <li>
                                    <p>Updated the About Web App page to reflect the inclusion of DMS Local Codes and the purpose of the application in demonstrating how these codes might relate to established SNOMED codes.</p>
                                </li>
                            </ul>
                        </li>
                        <li className="mb-5">
                            <h3 className="text-primary">Version 0_6 - 09 Oct 2024</h3>
                            <ul>
                                <li>
                                    <p><strong>DMICP Read Review Feature</strong></p>
                                </li>
                                <li>
                                    <p>Introduced the DMICP Read Review page, allowing users to search for DMICP Codes and view their details.</p>
                                </li>
                                <li>
                                    <p>Added conditional icons for the Decision field in the review list, including visual indicators for "DMSCreate," "Inactivate," and "Investigate" decisions, with appropriate FontAwesome icons.</p>
                                </li>
                                <li>
                                    <p>Implemented additional visual cues for Drop values, displaying extra icons based on the Drop level when the Decision is "DMSCreate."</p>
                                </li>
                                <li>
                                    <p>Extended review details to include High-Priority Category when Drop1, template, document, and search-related data when Drop2, and UsageCount when Drop3 is detected.</p>
                                </li>
                                <li>
                                    <p>Improved the backend API to fetch and display the SNOMEDParent term from the appropriate SNOMED set (International, UK, or DMS) for DMSCreate decisions.</p>
                                </li>
                            </ul>
                        </li>
                        <li className="mb-5">
                            <h3 className="text-primary">Version 0_7 - 12 Oct 2024</h3>
                            <ul>
                                <li>
                                    <p><strong>View SNOMED Code from DMICP Review</strong></p>
                                </li>
                                <li>
                                    <p>Enabled the feature to allow users to select and view a SNOMED code from the DMICP Review details by clicking a view icon next to DMSCreate codes, which navigates them to the HomePage with the selected code's details.</p>
                                </li>
                                <li>
                                    <p>Utilized the SNOMED context feature to store and update the selected SNOMED code (including the term and moduleId), improving the integration with the HomePage display.</p>
                                </li>
                                <li>
                                    <p>Extended the API functionality to retrieve SNOMED code details from the appropriate datasets (International, UK, or DMS) for use in context and navigation.</p>
                                </li>
                                <li>
                                    <p>Updated the review list and details sections to seamlessly integrate with this new feature, ensuring smooth user navigation and consistent display across the app.</p>
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

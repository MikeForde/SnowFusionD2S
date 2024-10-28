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
                        <li className="mb-5">
                            <h3 className="text-primary">Version 0_8 - 12 Oct 2024</h3>
                            <ul>
                                <li>
                                    <p><strong>Enhanced Navigation Between HomePage and DMICP Review</strong></p>
                                </li>
                                <li>
                                    <p>Added a feature where, on the HomePage, DMS Local Codes now display a view icon next to them.</p>
                                </li>
                                <li>
                                    <p>Clicking the view icon next to a DMS Local Code navigates users to the DMICP Read Review page, automatically displaying detailed information about that code.</p>
                                </li>
                                <li>
                                    <p>Implemented a new API endpoint to search DMICP Read Review entries by SNOMED Code, ensuring accurate retrieval of related reviews.</p>
                                </li>
                                <li>
                                    <p>Updated the DMICP Read Review page to handle SNOMED Codes, searching for associated DMICP Codes using the SNOMED Code provided.</p>
                                </li>
                                <li>
                                    <p>Improved the overall integration between the HomePage and DMICP Read Review page, enhancing user experience and data accessibility.</p>
                                </li>
                            </ul>
                        </li>
                        <li className="mb-5">
                            <h3 className="text-primary">Version 0_9 - 14 Oct 2024</h3>
                            <ul>
                                <li>
                                    <p><strong>Enhanced SNOMED CT Search and Data Integration</strong></p>
                                </li>
                                <li>
                                    <p>Improved the SNOMED term search functionality to collect results from all datasets (DMS, UK, International) when searching by term, ensuring comprehensive search results.</p>
                                </li>
                                <li>
                                    <p>Adjusted backend APIs to handle cases where concepts might be active in one dataset but their active descriptions are in another, ensuring accurate data retrieval.</p>
                                </li>
                                <li>
                                    <p>Updated <code>searchSnomedTerm</code>, <code>getParentCodes</code>, <code>getChildCodes</code>, and <code>searchSnomedCode</code> functions to optimize database queries and improve performance.</p>
                                </li>
                                <li>
                                    <p>Modified module IDs in exception cases to ensure correct flag displays on the frontend, enhancing visual consistency and user experience.</p>
                                </li>
                                <li>
                                    <p>Updated the <strong>About This Web Application</strong> page to reflect the new functionalities and improvements made to the application.</p>
                                </li>
                                <li>
                                    <p>Added a new page <strong>About DMICP and Read Codes</strong> providing detailed information about DMICP and Read Codes, enhancing user understanding of these systems.</p>
                                </li>
                            </ul>
                        </li>
                        <li className="mb-5">
                            <h3 className="text-primary">Version 0_10 - 14 Oct 2024</h3>
                            <ul>
                                <li>
                                    <p><strong>Introduced PurposePage for Enhanced Data Presentation</strong></p>
                                </li>
                                <li>
                                    <p>Created a new page, <strong>PurposePage</strong>, to display <code>DMICPReadReview</code> data in a tabular format with advanced filtering options based on the <code>Purpose</code> field, improving data accessibility and user navigation.</p>
                                </li>
                                <li>
                                    <p>Implemented comprehensive filtering logic to showcase data slices such as <em>"Children of INT or UK"</em> and <em>"Children of DMS"</em>, including subgroups like <em>"OccMed"</em>, <em>"Admin"</em>, and <em>"Clinical"</em>, enhancing data analysis capabilities.</p>
                                </li>
                                <li>
                                    <p>Enhanced the user interface with buttons and dropdown menus to allow users to switch between different data slices and subgroups, improving usability and user experience.</p>
                                </li>
                                <li>
                                    <p>Integrated detailed tooltips that display additional information when hovering over category icons, including data from the <code>DMICPReadReview</code> results, enhancing data transparency and user understanding.</p>
                                </li>
                                <li>
                                    <p>Enabled navigation from the DMICP code to the <strong>DMICPReadReviewPage</strong> by making the code clickable, facilitating quick access to detailed information.</p>
                                </li>
                                <li>
                                    <p>Optimized data fetching by implementing a context to store static data, reducing unnecessary API calls during internal navigation and improving overall application performance.</p>
                                </li>
                                <li>
                                    <p>Adjusted the frontend to ensure tooltip text is left-aligned, enhancing readability and visual consistency.</p>
                                </li>
                                <li>
                                    <p>Made various user interface enhancements, including adjusting font sizes, arranging buttons for better responsiveness, and handling mobile aspect layouts to improve user experience across devices.</p>
                                </li>
                            </ul>
                        </li>
                        <li className="mb-5">
                            <h3 className="text-primary">Version 0_11 - 15 Oct 2024</h3>
                            <ul>
                                <li>
                                    <p><strong>Introduced MapPage and InactivatePage</strong></p>
                                </li>
                                <li>
                                    <p>Refactored the Tooltip rendering logic into a separate <code>renderTooltip.js</code> file to be reused across multiple pages, improving code maintainability and consistency.</p>
                                </li>
                                <li>
                                    <p>Introduced a new <code>MapPage</code> to display DMICP codes filtered by Pre-Map Priority (1, 2, 3, 4), including decisions like APIMap and ManualMap with filtering capabilities.</p>
                                </li>
                                <li>
                                    <p>Added <code>InactivatePage</code> to display codes marked for inactivation, with a focus on Pre-Inactivation Priority (1, 2, 3, 4), removing unnecessary columns and including new descriptions.</p>
                                </li>
                                <li>
                                    <p>Updated the <strong>PurposePage</strong> with enhanced filtering options and Drop filters to improve user navigation and data visualization.</p>
                                </li>
                                <li>
                                    <p>Introduced new context and API calls for handling different data sets, improving performance and separation of concerns.</p>
                                </li>
                                <li>
                                    <p>Removed the <strong>Nav Bar search feature</strong> as no shared pan-app SNOMED context</p>
                                </li>
                            </ul>
                        </li>
                        <li className="mb-5">
                            <h3 className="text-primary">Version 0_12 - 25 Oct 2024</h3>
                            <ul>
                                <li>
                                    <p><strong>Introduced New Landing Page</strong></p>
                                </li>
                                <li>
                                    <p>Revised application flow to add a new <strong>Landing Page</strong> as the default entry point. This page provides an overview and guides users to each core page with explanations and purpose descriptions.</p>
                                </li>
                                <li>
                                    <p>Each section on the <strong>Landing Page</strong> now includes icons that match those used in the Navbar for consistent visual guidance.</p>
                                </li>
                                <li>
                                    <p>Detailed explanations of code groups reviewed, their importance, and the rationale for classification have been added to the Landing Page for improved user understanding.</p>
                                </li>
                            </ul>
                        </li>
                        <li className="mb-5">
                            <h3 className="text-primary">Version 0_13 - 26 Oct 2024</h3>
                            <ul>
                                <li>
                                    <p><strong>Added Selection Page to Info-Review section</strong></p>
                                </li>
                                <li>
                                    <p>Added <code>From40000To9000Page</code> to provide a comprehensive breakdown of the process that reduced 40,000 DMS Local Codes to 9,000 for review. This update includes:</p>
                                    <ul>
                                        <li>Clear step-by-step explanations for each process involved, from template and search code extraction to document code inclusion.</li>
                                        <li>Individual sections for each major stage, with collapsible details for an organized and navigable layout.</li>
                                        <li>A table at the end of the page to summarize code statistics, using highlighted columns and rows to draw attention to critical data points.</li>
                                    </ul>
                                </li>
                                <li>
                                    <p>Formatted sections with icons to visually distinguish each part of the workflow, improving readability and user experience.</p>
                                </li>
                            </ul>
                        </li>

                        <li className="mb-5">
                            <h3 className="text-primary">Version 0_14 - 26 Oct 2024</h3>
                            <ul>
                                <li>
                                    <p><strong>Added Review Page to Info-Review section</strong></p>
                                </li>
                                <li>
                                    <p>Added <code>ReviewPage</code> to outline the manual review process for the 9,000+ DMS codes, detailing key fates for each code: creation as a DMS local code, mapping to SNOMED, or inactivation.</p>
                                </li>
                                <li>
                                    <p>Included an <strong>Inactivation Section</strong> on the ReviewPage, describing common inactivation categories and rationales for business-critical codes and associated examples.</p>
                                </li>
                                <li>
                                    <p>Enhanced the <strong>Table Styling</strong> on <code>From40000To9000Page</code> for improved readability, with highlighted columns for key rows to make important data stand out without altering the table structure.</p>
                                </li>
                            </ul>
                        </li>
                        <li className="mb-5">
                            <h3 className="text-primary">Version 0_15 - 27 Oct 2024</h3>
                            <ul>
                                <li>
                                    <p><strong>Added Fusion Page to Info-Review section</strong></p>
                                </li>
                                <li>
                                    <p>Added <code>FusionPage</code> to outline the hierarchical organisation process for the DMS Create codes.</p>
                                </li>
                                <li>
                                    <p>Added <strong>Diagrams</strong>, to each of the three review info pages to provide a visual overview of each process. Colour-coordinated with related categories on the WebApp, e.g., High/Med/Low Priority and Create/Map/Inactivate.</p>
                                </li>
                            </ul>
                        </li>
                        <li className="mb-5">
                            <h3 className="text-primary">Version 0_16 - 28 Oct 2024</h3>
                            <ul>
                                <li>
                                    <p><strong>Implemented TSV Download Capabilities</strong></p>
                                </li>
                                <li>
                                    <p>Added functionality to <code>PurposePage</code>, <code>MapPage</code>, and <code>InactivatePage</code> to allow filtered and full dataset downloads as TSV files, preserving current filter selections in downloadable format.</p>
                                </li>
                                <li>
                                    <p>Use of <strong>tab-separated values (TSV)</strong> format - rather than CSV, ensuring compatibility with applications like Excel, Numbers and Google Sheets due to the presence of commas in the text data.</p>
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

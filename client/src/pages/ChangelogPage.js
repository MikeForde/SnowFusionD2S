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
                            <h5>Version 0_1 (Initial Release) - 2nd May 2024</h5>
                            <ul>
                                <li><strong>Implemented basic functionality for the MERN web app.</strong></li>
                                <li>Single page with data entry and previous data display</li>
                                <li>Previous data display has simple delete button</li>
                                <li>Only API GET call is /ips/all which displays all records</li>
                            </ul>
                        </li>
                        <li>
                            <h5>Version 0_2 - 3rd May 2024</h5>
                            <ul>
                                <li><strong>Improved data presentation, delete confirm and IPS API additions</strong></li>
                                <li>Data presented in compact form with expand mechanism</li>
                                <li>Delete button now has confirmation prompt - to avoid accidental deletion</li>
                                <li>Added API GET calls for /ips/:id (IPS Bundle - JSON) and /ipsraw/:id (MongoDb Native format - JSON)</li>
                            </ul>
                        </li>
                        <li>
                            <h5>Version 0_3 - 4th May 2024</h5>
                            <ul>
                                <li><strong>Implemented QR Generator, (non-functional) Data Upload page and Navigation.</strong></li>
                                <li>QR code Generation of IPS Bundle and MongoDb record format.</li>
                                <li>Data Upload page just a stub for later development</li>
                                <li>Navigation Bar added for easy access to all pages</li>
                            </ul>
                        </li>
                        <li>
                            <h5>Version 0_4 - 4th May 2024</h5>
                            <ul>
                                <li><strong>Per-record QR Button, new data format for both API and QR Generator</strong></li>
                                <li>QR Button added to previous record display to jump to QR Generator Page for that record</li>
                                <li>Minimised IPS data format - Plain Text. Same format as generated by SmartDoc (DMICP) and read by FUB-QR (SmartPhone App)</li>
                                <li>QR Generator now uses the new format as additional option -checked is indeed readable by FUB-QR</li>
                                <li>API GET call for minimised format is /ipsbasic/:id</li>
                            </ul>
                        </li>
                        <li>
                            <h5>Version 0_5 - 4th May 2024</h5>
                            <ul>
                                <li><strong>Better Navigation format and QR URL for Patient</strong></li>
                                <li>QR Generator includes new mode representing - in Plain Text - the API endpoint for the IPS Bundle</li>
                                <li>Concept would be to download QR image and give/send patient</li>
                            </ul>
                        </li>
                        <li>
                            <h5>Version 0_6 - 5th May 2024</h5>
                            <ul>
                                <li><strong>Added About IPS and ChangeLog page, Hide data entry form</strong></li>
                                <li>About IPS page to give brief context - non-sensitive</li>
                                <li>ChangeLog page to track project updates and improvements.</li>
                                <li>Hide data entry form button to allow more space for data display</li>
                                <li>Added additional data validation before submission</li>
                            </ul>
                        </li>
                        <li>
                            <h5>Version 0_7 - 6th May 2024</h5>
                            <ul>
                                <li><strong>Added real functionality to Bulk Upload page</strong></li>
                                <li>Bulk Upload page to allow pasting of multiple records for conversion</li>
                                <li>Format expected is that generated by accompanying DMICP SmartDoc</li>
                                <li>Main fields are comma separated, medication and allergies are then semicolon separated</li>
                                <li>Validation of data and confirmation before submission</li>
                                <li>Process allows valid records to be submitted whilst skipping invalid ones</li>
                            </ul>
                        </li>
                        <li>
                            <h5>Version 0_8 - 6th May 2024</h5>
                            <ul>
                                <li><strong>Added UUID validator for Bulk Upload</strong></li>
                                <li>UUID validator is basic regex - so not true validator - but will suffice for now</li>
                                <li>SmartDoc will generate valid UUIDs by default, so validator just to avoid incorrect manual efforts</li>
                                <li>Separate message if no supplied records pass validation</li>
                            </ul>
                        </li>
                        <li>
                            <h5>Version 0_9 - 6th May 2024</h5>
                            <ul>
                                <li><strong>Logo and Navbar Changes</strong></li>
                                <li>Added new logo to replace stock React App one</li>
                                <li>Navbar is now fixed at top</li>
                            </ul>
                        </li>
                        <li>
                            <h5>Version 0_10 - 8th May 2024</h5>
                            <ul>
                                <li><strong>QR Code Size Check</strong></li>
                                <li>QR Code data size check - and user feedback - to avoid display errors</li>
                                <li>Threshold set to 3000 but most codes at this size unreadable except on most recent SmartPhones</li>
                            </ul>
                        </li>
                        <li>
                            <h5>Version 0_11 - 9th May 2024</h5>
                            <ul>
                                <li><strong>New XML Format and IPS JSON Format change</strong></li>
                                <li>IPS Bundle format now compatible with the <a href="https://ipsviewer.com" target="_blank" rel="noopener noreferrer">IPS Viewer</a></li>
                                <li>This is closer to the IPS.net <a href="https://github.com/jddamore/IPSviewer/tree/main/samples" target="_blank" rel="noopener noreferrer">samples and examples</a></li>
                                <li>In particular it leads with a Composition resource</li>
                                <li>XML format added to API - modelled on JSON format</li>
                                <li>API GET is /ipsxml/:id</li>
                            </ul>
                        </li>
                        <li>
                            <h5>Version 0_12 - 9th May 2024</h5>
                            <ul>
                                <li><strong>Added API GET Data Viewer</strong></li>
                                <li>Allows more convient viewing of data formats returned by the various API GET endpoints</li>
                                <li>API Button added to individual records on HomePage as quick link</li>
                            </ul>
                        </li>
                        <li>
                            <h5>Version 0_13 - 10th May 2024</h5>
                            <ul>
                                <li><strong>Legacy IPS JSON and Screen Realestate</strong></li>
                                <li>Added IPS Legacy format to API endpoints and API Page - based on version 2 of bundle</li>
                                <li>For illustration purposes only - as comparison to 'regular' version.</li>
                                <li>API GET is /ipslegacy/:id</li>
                                <li>Various Screen realestate improvements for QR and API pages</li>
                            </ul>
                        </li>
                        <li>
                            <h5>Version 0_14 - 11th May 2024</h5>
                            <ul>
                                <li><strong>Cosmetic changes and hyperlinks</strong></li>
                                <li>Links in various places to aide testing</li>
                            </ul>
                        </li>
                        <li>
                            <h5>Version 0_15 - 17th May 2024</h5>
                            <ul>
                                <li><strong>Added API GET and POST</strong></li>
                                <li>API GET allows the return of an IPS Bundle using the endpoint /ipsbyname/:name/:given</li>
                                <li>API POST allows the creation of a new entry in the database from an IPS JSON Bundle</li>
                            </ul>
                        </li>
                        <li>
                            <h5>Version 0_16 - 18th May 2024</h5>
                            <ul>
                                <li><strong>Added Gender and Conditions</strong></li>
                                <li>Large update as entire schema changed</li>
                                <li>All input, import, export and generation code changed</li>
                                <li>Old entries against previous schema no longer valid as two fields have changed name</li>
                                <li>nationality to nation, and severity to criticality</li>
                                <li>Old database will be deleted</li>
                            </ul>
                        </li>
                        <li>
                            <h5>Version 0_17 - 19th May 2024</h5>
                            <ul>
                                <li><strong>Replaced 'Display All' with Search Functionality</strong></li>
                                <li>Search for IPS records based on patient's name</li>
                                <li>API GET call is /ips/search/:name</li>
                            </ul>
                        </li>
                        <li>
                            <h5>Version 0_18 - 19th May 2024</h5>
                            <ul>
                                <li><strong>Patient Selection Preservation</strong></li>
                                <li>Selected patients are preserved across the App</li>
                                <li>At least one patient needs to be selected to display anything on QR and API pages</li>
                                <li>'Select Records' dropdown is now confined to only those records returned by search</li>
                            </ul>
                        </li>
                        <li>
                            <h5>Version 0_19 - 19th May 2024</h5>
                            <ul>
                                <li><strong>Optional :id endpoints</strong></li>
                                <li>API GET endpoints that use /:id will now accept both MongoDB internal _id and IPS id (packageUUID)</li>
                                <li>Improvements to 'Active' Patient functionality throughout app</li>
                            </ul>
                        </li>
                        <li>
                            <h5>Version 0_20 - 22nd May 2024</h5>
                            <ul>
                                <li><strong>Added VitalsIQ API Page</strong></li>
                                <li>Page to allow direct access to the VitalsIQ API</li>
                                <li>API is at https://4202xiwc.offroadapps.dev:62444/Fhir/ips/json/surname/firstname</li>
                            </ul>
                        </li>
                        <li>
                            <h5>Version 0_21 - 23rd May 2024</h5>
                            <ul>
                                <li><strong>API Comms Client-to-Server</strong></li>
                                <li>Axios GET code moved to server-side to avoid BPS issues</li>
                                <li>API GET used internally - but could be used extenally - is /fetchipsora/surname/firstname</li>
                            </ul>
                        </li>
                        <li>
                            <h5>Version 0_22- 23rd May 2024</h5>
                            <ul>
                                <li><strong>Record Creation from ORA IPS Bundle</strong></li>
                                <li>Can now convert an VitalsIQ IPS Bundle to a MongoDb Record</li>
                                <li>Made the Condition Date optional - defaults to today's date - to facilate testing</li>
                            </ul>
                        </li>
                        <li>
                            <h5>Version 0_23- 23rd May 2024</h5>
                            <ul>
                                <li><strong>Added API POST to ORA</strong></li>
                                <li>API POST allows the sending IPS JSON Bundle to VitalsIQ WebApp</li>
                                <li>Internal API endpoint is /pushipsora</li>
                                <li>External API endpoint is at https://4202xiwc.offroadapps.dev:62444/Fhir/ips/json</li>
                            </ul>
                        </li>
                        <li>
                            <h5>Version 0_24 - 26th May 2024</h5>
                            <ul>
                                <li><strong>Added API GET for BEER</strong></li>
                                <li>API GET allows the return of an IPS Bundle with the BEER data format using the endpoint /ipsbeer/:id</li>
                                <li>Note: At this point BEER format is under development - so this represents an initial attempt</li>
                                <li>API and QR Page include BEER modes</li>
                                <li>QR Page displays the QR size in bites</li>
                            </ul>
                        </li>
                        <li>
                            <h5>Version 0_25 - 27th May 2024</h5>
                            <ul>
                                <li><strong>Added BEER Garden Page</strong></li>
                                <li>Page to allow conversion between MongoDb and BEER formats</li>
                                <li>BEER format is under development - so this represents an initial attempt</li>
                            </ul>
                        </li>
                        <li>
                            <h5>Version 0_26 - 27th May 2024</h5>
                            <ul>
                                <li><strong>Added NavBar Search</strong></li>
                                <li>Search for IPS records based on patient's family/surname</li>
                                <li>Removed HomePage from NavBar - as same functionality available from clicking on IPS Main Title and Logo</li>
                                <li>Creates more space for other NavBar items</li>
                            </ul>
                        </li>
                        <li>
                            <h5>Version 0_27 - 28th May 2024</h5>
                            <ul>
                                <li><strong>Added Edit Functionality</strong></li>
                                <li>Allows editing of existing IPS records</li>
                                <li>Added Edit button to individual records on HomePage</li>
                            </ul>
                        </li>
                        <li>
                            <h5>Version 0_28 - 29th May 2024</h5>
                            <ul>
                                <li><strong>Added Spinner</strong></li>
                                <li>Added Spinner to indicate loading for asynchronous functions</li>
                                <li>Spinner appears for any action that relies on fetching or posting data</li>
                                <li>Whether using the internal or external API</li>
                            </ul>
                        </li>
                        <li>
                            <h5>Version 0_29 - 30th May 2024</h5>
                            <ul>
                                <li><strong>Added Observation Resource</strong></li>
                                <li>Added Observation resource to IPS Bundle</li>
                                <li>Observation resource includes a code, value, and date</li>
                                <li>If value start numerical then valueQuantity, if just text then bodySite, if blank then simple ob e.g. symptom</li>
                            </ul>
                        </li>
                        <li>
                            <h5>Version 0_30 - 1st Jun 2024</h5>
                            <ul>
                                <li><strong>Added TimeStamp</strong></li>
                                <li>Added fixed TimeStamp - previously generated with IPS bundle</li>
                                <li>Closer to IPS concept and aides BEER format development - items can be added post-timestamp</li>
                                <li>Generated whether by manual addition or Data Upload.</li>
                                <li>If API GET used then the TimeStamp is the that provided by the IPS JSON bundle fetched</li>
                            </ul>
                        </li>
                        <li>
                            <h5>Version 0_31 - 1st Jun 2024</h5>
                            <ul>
                                <li><strong>Added Observation and Allergy Dropdowns</strong></li>
                                <li>Observation dropdown for key vital signs - temperature, blood pressure, pulse, respiration etc</li>
                                <li>Allergy dropdown for criticality - low, medium, high</li>                   
                            </ul>
                        </li>
                        <li>
                            <h5>Version 0_32 - 3rd Jun 2024</h5>
                            <ul>
                                <li><strong>Further BEER Format Development</strong></li>
                                <li>Medication and Observations formatted differently depending on whether past or future relative to timestamp</li>
                                <li>Vital Sign observations in particular have a highly compact form</li>
                                <li>Design varies slightly from earlier concept but basic ideas remain</li>
                            </ul>
                        </li>
                        <li>
                            <h5>Version 0_33 - 6th June 2024</h5>
                            <ul>
                                <li><strong>Added BEER - IPS JSON Conversion in BEER Garden</strong></li>
                                <li>Manually edited BEER data can be converted to IPS JSON format or Native MongoDB</li>
                                <li>IPS JSON (converted internally from MongoDb) or manually edited - can be converted to BEER format</li>
                                <li>Byte size displayed for both formats</li>
                                <li>Neither option affects the stored record - just for display purposes</li>
                            </ul>
                        </li>
                        <li>
                            <h5>Version 0_34 - 9th June 2024</h5>
                            <ul>
                                <li><strong>Added New Update/Edit Endpoint</strong></li>
                                <li>Added new endpoint to allow updating of existing IPS records using UUID</li>
                                <li>API PUT call is /ipsuuid/:id</li>
                                <li>This means an external system that has POST/created a record - perhaps before patient id known - can then update it later</li>
                                <li>Changes to unique Patient data - e.g. name - are treated as edits, Medication, Allergies, Conditions and Observations are added to the record</li>
                            </ul>
                        </li>
                        <li>
                            <h5>Version 0_3 - 12th June 2024</h5>
                            <ul>
                                <li><strong>Added API Documentation Page</strong></li>
                                <li>Page to allow easy access to all API endpoints and their descriptions</li>
                                <li>API Documentation Page is accessible from the NavBar</li>
                                <li>/ipsbyname is now case-insensitive</li>
                            </ul>
                        </li>
                        <li>
                            <h5>Version 0_36 - 12th June 2024</h5>
                            <ul>
                                <li><strong>Organization added</strong></li>
                                <li>Organization field added to MongoDB record</li>
                                <li>Previously was not being read and was being automatically set in exports/conversions to 'UK DMS'</li>
                            </ul>
                        </li>
                        <li>
                            <h5>Version 0_37 - 13th June 2024</h5>
                            <ul>
                                <li><strong>Added API POST to NLD</strong></li>
                                <li>API POST allows the sending IPS JSON Bundle to NLD WebApp</li>
                                <li>Internal API endpoint is /pushipsnld</li>
                                <li>External API endpoint is at https://medicalcloud.orange-synapse.nl/api/fhir/1</li>
                            </ul>
                        </li>
                        <li>
                            <h5>Version 0_38 - 13th June 2024</h5>
                            <ul>
                                <li><strong>IPS BEER Parsing Delimiter Improvements</strong></li>
                                <li>IPS BEER format can use various delimiters - newline, semicolon, pipe, colon, and @</li>
                                <li>If no delimiter is specified then all are tried before failing</li>
                            </ul>
                        </li>
                        <li>
                            <h5>Version 0_39 - 14th June 2024</h5>
                            <ul>
                                <li><strong>Added CDA Functionality</strong></li>
                                <li>API POST to create MongoDb record from CDA XML - endpoint is /ipsfromcda</li>
                                <li>API POST to convert CDA XML to IPS JSON Bundle - endpoint is /convertcdatoips - service only, no record is created</li>
                                <li>API POST to convert CDS XML to BEER format - endpoint is /convertcdatobeer - service only, no record is created</li>
                            </ul>
                        </li>
                        <li>
                            <h5>Version 0_40 - 15th June 2024</h5>
                            <ul>
                                <li><strong>Added API Calls for IPS HL7 v2.8</strong></li>
                                <li>API GET allows the return of an IPS Bundle with the HL7 v2.8 data format using the endpoint /ipshl728/:id</li>
                                <li>API POST allows conversion of MongoDb record to HL7 v2.8 format - endpoint is /convertmongo2hl7</li>
                                <li>Further endpoints for HL7 v2.8 are planned - note: there are likely formatting errors in the current implementation</li>
                                <li>The idea is give an approximate HL7 v2.8 format - not a perfect one - to judge likely file size and content</li>
                            </ul>
                        </li>
                        <li>
                            <h5>Version 0_41 - 14th July 2024</h5>
                            <ul>
                                <li><strong>MERN to SERN</strong></li>
                                <li>Database element of stack changed from MongoDB to SQL (MySQL) - to faciltate deployment on D2S OpenShift</li>
                                <li>For simplicity and speed of development, the SQL is converted to and from MongoDB format on retreiving and storing</li>
                                <li>This allows most of the existing code to remain unchanged</li>
                                <li>This also allows the API calls to remain the same - both payloads and responses</li>
                            </ul>
                        </li>
                    </ul>
                </Col>
            </Row>
        </Container>
    );
}

export default ChangeLogPage;

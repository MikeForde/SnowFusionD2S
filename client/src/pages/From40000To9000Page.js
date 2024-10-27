import React from 'react';
import { Container, Row, Col, Card, Collapse, Button, Table } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faFileAlt, faFilter, faDatabase, faCheck, faClock, faExclamationTriangle, faCalculator, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import "./Page.css";

function From40000To9000Page() {
    const [open, setOpen] = React.useState(Array(10).fill(false)); // For handling collapsible sections

    const toggleCollapse = (index) => {
        const newOpen = [...open];
        newOpen[index] = !newOpen[index];
        setOpen(newOpen);
    };

    return (
        <Container className="mt-5">
            <h2>Why 9,000+ Codes were reviewed and not 40,000: The Selection Process</h2>
            <p>There are just shy of 40,000 DMS local codes in DMICP. This page outlines the processes undertaken to objectively select the 9000+ DMS Local Codes reviewed rather than manually reviewing them all. The steps below highlight key stages, datasets, and methods used. </p><p>Note, none of these processes involved subjective 'decisions' except for the final exclusion step of choosing the recent-use threshold.</p>

            {/* Section 1: Template Codes */}
            <Row className="mt-4">
                <Col>
                    <Card>
                        <Card.Body>
                            <Card.Title><FontAwesomeIcon icon={faCalculator} className="me-2" />Determine codes used in DMICP Input Templates</Card.Title>
                            <p>Source: <strong>Template detailed analysis with counts.xlsx - An offical file requested for this purpose</strong></p>
                            <Button variant="link" onClick={() => toggleCollapse(0)} aria-controls="template-collapse" aria-expanded={open[0]}>
                                View Detailed Steps
                            </Button>
                            <Collapse in={open[0]}>
                                <div id="template-collapse">
                                    <ul>
                                        <li>Templates were included if they were 'globaly accessible' to all DMS users or sub-templates of those templates (some templates cannot be accessed directly but can be reached via other templates).</li>
                                        <li>Some templates can only be reached by DMICP Protocols - these were determined by exporting all protocols as XML files. Bespoke VBA code was then written to extract the template names.</li>
                                        <li>The codes used in each template were then extracted.</li>
                                    </ul>
                                </div>
                            </Collapse>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            {/* Section 2: Search Codes */}
            <Row className="mt-4">
                <Col>
                    <Card>
                        <Card.Body>
                            <Card.Title><FontAwesomeIcon icon={faSearch} className="me-2" />Determine Codes used in DMICP Shared Searches</Card.Title>
                            <p>Source: <strong>DMICP Shared searches</strong></p>
                            <Button variant="link" onClick={() => toggleCollapse(1)} aria-controls="search-collapse" aria-expanded={open[1]}>
                                View Detailed Steps
                            </Button>
                            <Collapse in={open[1]}>
                                <div id="search-collapse">
                                    <ul>
                                        <li>This process was done manually as no export feature was available in DMICP.</li>
                                        <li>An offical Excel file requested for this purpose proved unreliable.</li>
                                        <li>Included and excluded Read codes were therefore manually extracted—whether included or excluded was not relevant for the analysis.</li>
                                        <li>This manual process took a week to complete but was quicker than re-requesting the offical file due to constraints on the providers of the data.</li>
                                    </ul>
                                </div>
                            </Collapse>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            {/* Section 3: Document Codes */}
            <Row className="mt-4">
                <Col>
                    <Card>
                        <Card.Body>
                            <Card.Title><FontAwesomeIcon icon={faFileAlt} className="me-2" />Detemine Codes used in DMICP Shared Documents</Card.Title>
                            <p>Source: <strong>DMICP Shared documents in the Autopopulating set folder</strong></p>
                            <Button variant="link" onClick={() => toggleCollapse(2)} aria-controls="document-collapse" aria-expanded={open[2]}>
                                View Detailed Steps
                            </Button>
                            <Collapse in={open[2]}>
                                <div id="document-collapse">
                                    <ul>
                                        <li>All documents in the DMICP Shared folder were exported.</li>
                                        <li>Bespoke VBA code was used to extract Read codes used in the documents.</li>
                                        <li>The Read code is written into the bookmark. However, it was not possible to determine if the “Include child codes” flag was set.</li>
                                    </ul>
                                </div>
                            </Collapse>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            {/* Section 4: Combining Datasets */}
            <Row className="mt-4">
                <Col>
                    <Card>
                        <Card.Body>
                            <Card.Title><FontAwesomeIcon icon={faFilter} className="me-2" />Combine and Filter Datasets So Far</Card.Title>
                            <Button variant="link" onClick={() => toggleCollapse(3)} aria-controls="combining-collapse" aria-expanded={open[3]}>
                                View Detailed Steps
                            </Button>
                            <Collapse in={open[3]}>
                                <div id="combining-collapse">
                                    <ul>
                                        <li>Datasets from the previous steps were combined, unique entries filtered for non-NHS codes only. </li>
                                        <li>The specific SQL WHERE criteria to identify non-NHS were: Like "*EMIS*" Or Like "*PCS*" Or Like "*DMS*" Or Like "*TRI*" Or Like "*RAF*" Or Like "*ESC*" Or Like "*CUL*" Or Like "*SHHAPT*" Or Like "*EGTON*" Or Like "*JHC*" Or Like "*REHAB*" Or Like "*CVP*" Or Like "*CVA*" Or Like "CAB*"</li>
                                        <li>Total of 3548 codes were identified - these were given the moniker BC (Business Critical).</li>
                                    </ul>
                                </div>
                            </Collapse>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            {/* Section 5: Usage Data */}
            <Row className="mt-4">
                <Col>
                    <Card>
                        <Card.Body>
                            <Card.Title><FontAwesomeIcon icon={faDatabase} className="me-2" />Add in Non-BC and Usage Data</Card.Title>
                            <p>Source: <strong>UniqueALL_May2022.xls - usage data for all codes since advent of DMICP</strong></p>
                            <Button variant="link" onClick={() => toggleCollapse(4)} aria-controls="usage-collapse" aria-expanded={open[4]}>
                                View Detailed Steps
                            </Button>
                            <Collapse in={open[4]}>
                                <div id="usage-collapse">
                                    <ul>
                                        <li>Filtered for non-NHS codes using established criteria above.</li>
                                        <li>Non-BC Dental Codes - DMSD...(575 codes) and EMISD...(460 codes) were also excluded as not in scope. BC codes were left in review to later manually check if being repurposed for non-dental BC reasons.</li>
                                        <li>Combined with the previous dataset to create a total of 13,772 codes (3548 BC codes and 10224 Non-BC codes).</li>
                                        <li>Due to all the previous steps, the data now includes usage counts and whether a code is used in templates, searches, or documents.</li>
                                    </ul>
                                </div>
                            </Collapse>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            {/* Section 6: SNOMED Data */}
            <Row className="mt-4">
                <Col>
                    <Card>
                        <Card.Body>
                            <Card.Title><FontAwesomeIcon icon={faCheck} className="me-2" />Crosscheck with Previous SNOMED Work</Card.Title>
                            <p>Source: <strong>20200819-CODING_REVIEW_BROKEN_DOWN.xlsx</strong></p>
                            <Button variant="link" onClick={() => toggleCollapse(5)} aria-controls="snomed-collapse" aria-expanded={open[5]}>
                                View Detailed Steps
                            </Button>
                            <Collapse in={open[5]}>
                                <div id="snomed-collapse">
                                    <ul>
                                        <li>162,081 codes were previously reviewed in 2019-2020.</li>
                                        <li>Filtering for Non-NHS codes resulted in 36,957 codes.</li>
                                        <li>13,546 codes were matched to the dataset, and 3323 of these had suggestions about SNOMED mapping codes.</li>
                                        <li>However the work was done against a brief that no new codes would be created and a best-fit match should be attenpted.</li>
                                        <li>Not unsuprisingly then a review showed only 694 met the ‘no loss of granular meaning’ criteria, but those 694 mapping suggestions were added to the main dataset.</li>
                                        <li>Natually this did not change the actual number of codes to be reviewed.</li>
                                    </ul>
                                </div>
                            </Collapse>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            {/* Section 7: Specific Known Business Critical Codes */}
            <Row className="mt-4">
                <Col>
                    <Card>
                        <Card.Body>
                            <Card.Title><FontAwesomeIcon icon={faExclamationTriangle} className="me-2" />Identify Codes Highly Critical to the Business</Card.Title>
                            <Button variant="link" onClick={() => toggleCollapse(6)} aria-controls="specific-collapse" aria-expanded={open[6]}>
                                View Detailed Steps
                            </Button>
                            <Collapse in={open[6]}>
                                <div id="specific-collapse">
                                    <ul>
                                        <li>The following templates were analyzed in detail to determine their Read codes and parent codes (the latter not necessarily being present in the dataset so far but necessary for the hierarchy structure):</li>
                                        <ul>
                                            <li>PULHHEEMS widget*</li>
                                            <li>Audiogram widget*</li>
                                            <li>Acuity/Refraction widget*</li>
                                            <li>Harmonised Med Lims</li>
                                            <li>Appendix 9 Lims</li>
                                            <li>Naval Grading template</li>
                                            <li>Army Grading template</li>
                                            <li>RAF Grading template</li>
                                        </ul>
                                        <li>This identified 1561 unique codes, with 1056 active/current and 505 inactive/legacy codes.</li>
                                        <li>183 new codes were added, with active flagged as BC and inactive flagged as Non-BC. This changed the BC total from 3548 to 4043 and the Non-BC from 10224 to 9912 - with overall total of 13,955.</li>
                                        <li><i>* widget - Complex EMIS-built DMICP template user interface components whose codes would not have necessarily been captured during the initial template code determination stage as that only concerned codes associated with simple template controls.</i></li>
                                    </ul>
                                </div>
                            </Collapse>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            {/* Section 8: Time Data */}
            <Row className="mt-4">
                <Col>
                    <Card>
                        <Card.Body>
                            <Card.Title><FontAwesomeIcon icon={faClock} className="me-2" />Add in Time Data (Month and Year, Read code first and last used)</Card.Title>
                            <p>Source: <strong>ReadCodeUsage22 table from Neil Robinson's “Mapping Database”</strong></p>
                            <Button variant="link" onClick={() => toggleCollapse(7)} aria-controls="time-collapse" aria-expanded={open[7]}>
                                View Detailed Steps
                            </Button>
                            <Collapse in={open[7]}>
                                <div id="time-collapse">
                                    <ul>
                                        <li>Filtered for Non-NHS codes.</li>
                                        <li>13,946 codes were matched, and the time data (first and last used) was added to the dataset.</li>
                                        <li>This data was critical for the final step of excluding codes based on how recently used.</li>
                                    </ul>
                                </div>
                            </Collapse>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            {/* Section 9: Final Adjustments */}
            <Row className="mt-4">
                <Col>
                    <Card>
                        <Card.Body>
                            <Card.Title><FontAwesomeIcon icon={faTimesCircle} className="me-2" />Make Final Pre-Review Exclusions</Card.Title>
                            <Button variant="link" onClick={() => toggleCollapse(8)} aria-controls="final-collapse" aria-expanded={open[8]}>
                                View Detailed Steps
                            </Button>
                            <Collapse in={open[8]}>
                                <div id="final-collapse">
                                    <ul>
                                        <li>We dropped the ‘legacy’ codes identified in the 'Business Critical' step above as they are obsolete by defintion.</li>
                                        <li>We dropped the NEGATION- (Not-) and UNCERTAIN- (Query-) codes as these are DMICP-specific qualifiers rather than true separate codes.</li>
                                        <li>Non-BC Codes not used within the last 5 years were then excluded (with 10yrs and 3yrs considered as well with final decision agreed with Def Stats).</li>
                                        <li>These exclusions combined removed just over 4000 codes - mainly from the non-BC set.</li>
                                    </ul>
                                </div>
                            </Collapse>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            {/* Code Breakdown Table */}
            <h2>Code Breakdown</h2>
            <Table striped bordered hover>
                <thead className="highlight-header">
                    <tr>
                        <th className="highlight-final">Item</th>
                        <th className="highlight-final">Criteria</th>
                        <th>Base Count</th>
                        <th>Legacy Dropped</th>
                        <th>NegAnd? Dropped</th>
                        <th>Last 10 Years</th>
                        <th className="highlight-final">Last 5 Years</th>
                        <th>Last 3 Years</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="highlight-base">
                        <td className="highlight-final">All Significant Non-NHS Codes</td>
                        <td className="highlight-final">BC or Usage &gt; 0</td>
                        <td>13,955</td>
                        <td>13,497</td>
                        <td>12,865</td>
                        <td>10,937</td>
                        <td className="highlight-final">9,710</td>
                        <td>8,916</td>
                    </tr>
                    <tr className="highlight-base">
                        <td className="highlight-final">Business Critical (BC)</td>
                        <td className="highlight-final">Used in Templates, Widgets, Searches, Documents + Parent Codes</td>
                        <td>4,043</td>
                        <td>4,043</td>
                        <td>4,002</td>
                        <td>4,002</td>
                        <td className="highlight-final">4,002</td>
                        <td>4,002</td>
                    </tr>
                    <tr className="highlight-base">
                        <td className="highlight-final">All Non-BC (for review)</td>
                        <td className="highlight-final">Not BC but Usage &gt; 0</td>
                        <td>9,912</td>
                        <td>9,454</td>
                        <td>8,863</td>
                        <td>6,935</td>
                        <td className="highlight-final">5,708</td>
                        <td>4,914</td>
                    </tr>
                    <tr>
                        <td>NonBC-Thousand Plus Club</td>
                        <td>Usage ≥ 1000</td>
                        <td>1,753</td>
                        <td>1,429</td>
                        <td>1,333</td>
                        <td>1,329</td>
                        <td>1,307</td>
                        <td>1,292</td>
                    </tr>
                    <tr>
                        <td>NonBC-Thousand Plus Club</td>
                        <td>Usage ≥ 1000</td>
                        <td>1,753</td>
                        <td>1,429</td>
                        <td>1,333</td>
                        <td>1,329</td>
                        <td>1,307</td>
                        <td>1,292</td>
                    </tr>
                    <tr>
                        <td>NonBC-Reasonably Popular</td>
                        <td>Usage ≥ 500-999</td>
                        <td>355</td>
                        <td>333</td>
                        <td>319</td>
                        <td>312</td>
                        <td>283</td>
                        <td>263</td>
                    </tr>
                    <tr>
                        <td>NonBC-Some Like It Hot</td>
                        <td>Usage ≥ 200-499</td>
                        <td>607</td>
                        <td>582</td>
                        <td>560</td>
                        <td>541</td>
                        <td>480</td>
                        <td>443</td>
                    </tr>
                    <tr>
                        <td>NonBC-Acquired Taste</td>
                        <td>Usage ≥ 100-199</td>
                        <td>510</td>
                        <td>484</td>
                        <td>472</td>
                        <td>432</td>
                        <td>371</td>
                        <td>343</td>
                    </tr>
                    <tr>
                        <td>NonBC-Left Overs</td>
                        <td>Usage ≥ 50-99</td>
                        <td>584</td>
                        <td>566</td>
                        <td>560</td>
                        <td>501</td>
                        <td>396</td>
                        <td>360</td>
                    </tr>
                    <tr>
                        <td>NonBC-Just Past Consume By Date</td>
                        <td>Usage ≥ 25-49</td>
                        <td>693</td>
                        <td>685</td>
                        <td>678</td>
                        <td>562</td>
                        <td>462</td>
                        <td>410</td>
                    </tr>
                    <tr>
                        <td>NonBC-Sniff Test</td>
                        <td>Usage ≥ 10-24</td>
                        <td>974</td>
                        <td>971</td>
                        <td>947</td>
                        <td>701</td>
                        <td>599</td>
                        <td>514</td>
                    </tr>
                    <tr>
                        <td>NonBC-Definitely Going Off</td>
                        <td>Usage ≥ 5-9</td>
                        <td>879</td>
                        <td>875</td>
                        <td>841</td>
                        <td>577</td>
                        <td>468</td>
                        <td>366</td>
                    </tr>
                </tbody>
            </Table>
        </Container>
    );
}

export default From40000To9000Page;

// LandingPage.js
import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faNetworkWired,
  faEye,
  faCheckCircle,
  faExchangeAlt,
  faTimesCircle,
} from '@fortawesome/free-solid-svg-icons';
import "./Page.css" // Import the CSS file

function LandingPage() {
  return (
    <Container className="mt-5">
      <h2>Welcome to SnowFusion - the DMS Local Code Review WebApp</h2>
      <p>
        The Defence Medical Information Capability Programme (DMICP) includes approximately{' '}
        <strong>40,000</strong> DMS local codes. </p><p>Firstly, <Link to="/from40000to9000">
        we selected</Link> <strong>9,000+</strong> codes for review based on being in one of three priority groups:
      </p>
      <ul>
        <li>
          <strong>Group 1 - High</strong>: Codes that underpin the core DMS occupational function (e.g.,
          grading, limitations, audiometry, and visual acuity).
        </li>
        <li>
          <strong>Group 2 - Med</strong>: Codes, not already in Group 1, that are used in templates,
          protocols, centrally shared documents, and/or centrally shared searches.
        </li>
        <li>
          <strong>Group 3 - Low</strong>: Codes not captured above but used at least once in the last 5 years.
        </li>
      </ul>
      <p>Secondly, <Link to="/review-process">we reviewed</Link> these <strong>9,000+</strong> codes to determine if they needed to be:</p>
      <ul>
        <li><FontAwesomeIcon
          icon={faCheckCircle}
          style={{ color: 'green', marginRight: '10px' }}
        />Created as local codes alongside regular SNOMED codes.</li>
        <li><FontAwesomeIcon
          icon={faExchangeAlt}
          style={{ color: 'blue', marginRight: '10px' }}
        />Mapped to existing SNOMED codes (UK or International).</li>
        <li><FontAwesomeIcon
          icon={faTimesCircle}
          style={{ color: 'red', marginRight: '10px' }}
        />
          Inactivated or not converted, depending on the eventual vendor system.
        </li>
      </ul>
      <p>
        Thirdly, <Link to="/snomed-positioning">we fused</Link> the <strong>5,000+</strong> 'DMS Create' codes with SNOMED  - i.e., the codes recommended for creation as DMS local codes were positioned within the regular SNOMED hierarchy.
      </p>
      <p>
        Below are links to various sections of the application:
      </p>
      <Row>
        <Col md={4}>
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>
                <FontAwesomeIcon
                  icon={faNetworkWired}
                  style={{ color: 'black', marginRight: '10px', cursor: 'pointer' }}
                />
                SNOMED Page
              </Card.Title>
              <Card.Text>
                See how the recommended DMS local codes might work alongside regular UK and
                International SNOMED codes.
              </Card.Text>
              <Link to="/snomed" className="btn btn-primary custom-button">
                Go to SNOMED Page
              </Link>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>
                <FontAwesomeIcon
                  icon={faEye}
                  style={{ color: 'blue', marginRight: '10px', cursor: 'pointer' }}
                />
                DMS Review Search Page of All Codes
              </Card.Title>
              <Card.Text>
                Search among all the DMS local codes included in the review and the decisions
                made about them.
              </Card.Text>
              <Link to="/review" className="btn btn-primary custom-button">
                Go to Review Search Page
              </Link>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>
                <FontAwesomeIcon
                  icon={faCheckCircle}
                  style={{ color: 'green', marginRight: '10px' }}
                />
                DMS Create Page
              </Card.Title>
              <Card.Text>
                View DMICP codes recommended to be created as local codes with various filtering
                options including clinical purpose.
              </Card.Text>
              <Link to="/purpose" className="btn btn-primary custom-button">
                Go to DMS Create Page
              </Link>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>
                <FontAwesomeIcon
                  icon={faExchangeAlt}
                  style={{ color: 'blue', marginRight: '10px' }}
                />
                Mapping Page
              </Card.Title>
              <Card.Text>
                Explore DMS codes that map to established SNOMED codes (and do not, therefore, need
                creating).
              </Card.Text>
              <Link to="/map" className="btn btn-primary custom-button">
                Go to Map Page
              </Link>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>
                <FontAwesomeIcon
                  icon={faTimesCircle}
                  style={{ color: 'red', marginRight: '10px' }}
                />
                Inactivation Page
              </Card.Title>
              <Card.Text>
                Review DMICP DMS codes selected for inactivation and the reasoning behind it.
              </Card.Text>
              <Link to="/inactivate" className="btn btn-primary custom-button">
                Go to Inactivate Page
              </Link>
            </Card.Body>
          </Card>
        </Col>
        {/* Add more cards for other pages as needed */}
      </Row>
    </Container>
  );
}

export default LandingPage;

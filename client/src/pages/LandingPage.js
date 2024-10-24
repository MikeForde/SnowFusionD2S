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

function LandingPage() {
  return (
    <Container className="mt-5">
      <h2>Welcome to the DMS Local Code Review Application</h2>
      <p>
        The Defence Medical Information Capability Programme (DMICP) includes approximately{' '}
        <strong>40,000</strong> DMS local codes. From these, about <strong>9,000</strong> codes were
        selected for review based on being in one of three groups:
      </p>
      <ul>
        <li>
          <strong>Group 1</strong>: Codes that underpin the core DMS occupational function (e.g.,
          grading, limitations, audiometry, and visual acuity).
        </li>
        <li>
          <strong>Group 2</strong>: Codes, not already in Group 1, that are used in templates,
          protocols, documents, and/or searches.
        </li>
        <li>
          <strong>Group 3</strong>: Codes used at least once in the last 5 years.
        </li>
      </ul>
      <p>These codes were reviewed to determine if they needed to be:</p>
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
        This application helps you navigate and review these selected DMICP Read codes. Below are
        links to various sections of the application:
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
              <Link to="/snomed" className="btn btn-primary">
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
                Search among all the DMS local codes that made it into the review and the decisions
                made about them.
              </Card.Text>
              <Link to="/review" className="btn btn-primary">
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
              <Link to="/purpose" className="btn btn-primary">
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
                Explore DMS codes that map to established SNOMED codes and do not therefore need
                creating.
              </Card.Text>
              <Link to="/map" className="btn btn-primary">
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
                Review codes selected for inactivation and their details.
              </Card.Text>
              <Link to="/inactivate" className="btn btn-primary">
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

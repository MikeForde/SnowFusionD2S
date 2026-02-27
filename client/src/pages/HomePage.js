import React, { useState, useContext, useEffect, useRef } from "react";
import "./Page.css";
import { Card, Form, Button, Alert } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { useParams } from "react-router-dom";
import { SnomedContext } from '../contexts/SnomedContext';
import { useLoading } from '../contexts/LoadingContext';
import SNOMEDCode from './Components/SNOMEDCode';

const server = process.env.REACT_APP_API_BASE_URL
  ? axios.create({ baseURL: process.env.REACT_APP_API_BASE_URL })
  : axios.create({});

function HomePage() {
  // Support BOTH:
  //   /snomed/:term
  //   /snomed/conceptid/:conceptId
  const { term, conceptId } = useParams();

  const initialLoadDone = useRef(false); // prevent re-trigger loops

  const [searchTerm, setSearchTerm] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  const {
    selectedSnomedCodes,
    setSelectedSnomedCodes,
    selectedSnomedCode,
    setSelectedSnomedCode
  } = useContext(SnomedContext);

  const { startLoading, stopLoading } = useLoading();

  const [parents, setParents] = useState([]);
  const [children, setChildren] = useState([]);

  // ---------------------------------------------
  // When selected code changes, fetch parents/children
  // ---------------------------------------------
  useEffect(() => {
    if (selectedSnomedCode) {
      fetchRelatedCodes(selectedSnomedCode.conceptId);
    }
  }, [selectedSnomedCode]);

  // ---------------------------------------------
  // NEW: On first load, if route params exist,
  // treat them EXACTLY like a manual search submit.
  // ---------------------------------------------
  useEffect(() => {
    if (initialLoadDone.current) return;

    // Prefer conceptId route if present
    const incomingRaw = conceptId ?? term;
    if (!incomingRaw) return;

    initialLoadDone.current = true;

    const incoming = decodeURIComponent(incomingRaw).trim();
    if (!incoming) return;

    // populate input box so it looks like user typed it
    setSearchTerm(incoming);

    // IMPORTANT: use the SAME logic as manual search,
    // i.e. /snomed/search/:term regardless of numeric/text
    searchSnomedCodes(incoming);
  }, [term, conceptId]);

  // ---------------------------------------------
  // Search (same endpoint manual search uses)
  // ---------------------------------------------
  const searchSnomedCodes = (valueOverride) => {
    const value = (valueOverride ?? searchTerm).trim();

    if (value.length < 3) {
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
      return;
    }

    startLoading();

    server
      .get(`/snomed/search/${value}`)
      .then((response) => response.data)
      .then((snomedCodes) => {
        if (snomedCodes) {
          setSelectedSnomedCodes(snomedCodes);
          if (snomedCodes.length > 0) {
            setSelectedSnomedCode(snomedCodes[0]);
          }
        }
      })
      .catch((error) => {
        console.log("Error", error);
      })
      .finally(() => {
        stopLoading();
      });
  };

  // ---------------------------------------------
  // Related codes
  // ---------------------------------------------
  const fetchRelatedCodes = (conceptId) => {
    startLoading();

    Promise.all([
      server.get(`/snomed/parents/${conceptId}`),
      server.get(`/snomed/children/${conceptId}`)
    ])
      .then(([parentsResponse, childrenResponse]) => {
        setParents(parentsResponse.data);
        setChildren(childrenResponse.data);
      })
      .catch((error) => {
        console.error('Error fetching related codes:', error);
      })
      .finally(() => {
        stopLoading();
      });
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    searchSnomedCodes();
  };

  return (
    <div className="app">
      <div className="container">
        <div className="row">
          <Form onSubmit={handleSearchSubmit}>
            {/* Mobile Layout */}
            <div className="d-flex d-sm-none mb-3">
              <Form.Control
                type="text"
                placeholder="SNOMED code/term or DMS Local"
                value={searchTerm}
                onChange={handleSearchChange}
                className="mr-2"
              />
              <Button type="submit" className="custom-button">Search</Button>
            </div>

            {/* Desktop Layout */}
            <div className="d-none d-sm-block">
              <Form.Group controlId="searchTerm">
                <Form.Control
                  type="text"
                  placeholder="SNOMED code/term or DMS Local"
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
              </Form.Group>
              <Button type="submit" className="custom-button mb-3">Search</Button>
            </div>
          </Form>

          {showAlert && (
            <Alert variant="warning" className="floating-alert">
              Please enter at least 3 characters to search.
            </Alert>
          )}

          <h4>Matching Concepts</h4>

          <div className="col-md-4 scrollable-area">
            <div>
              {selectedSnomedCodes.map((snomedCode) => (
                <Card key={snomedCode.id} onClick={() => setSelectedSnomedCode(snomedCode)}>
                  <Card.Body>
                    <SNOMEDCode snomedCode={snomedCode} />
                  </Card.Body>
                </Card>
              ))}
            </div>
          </div>

          <div className="col-md-8 scrollable-area">
            <h4>Parents ({parents.length})</h4>
            <div className="related-codes">
              {parents.map((parent) => (
                <SNOMEDCode
                  key={parent.id}
                  snomedCode={parent}
                  onClick={() => setSelectedSnomedCode(parent)}
                  className="clickable"
                />
              ))}
            </div>

            <div className="selected-code">
              {selectedSnomedCode && (
                <SNOMEDCode
                  snomedCode={selectedSnomedCode}
                  className="selected"
                  isSelected={true}
                />
              )}
            </div>

            <h4>Children ({children.length})</h4>
            <div className="related-codes">
              {children.map((child) => (
                <SNOMEDCode
                  key={child.id}
                  snomedCode={child}
                  onClick={() => setSelectedSnomedCode(child)}
                  className="clickable"
                />
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default HomePage;
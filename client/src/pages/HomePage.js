import React, { useState, useContext, useEffect } from "react";
import "./Page.css";
import { Card, Form, Button, Alert } from "react-bootstrap"; // Import necessary components
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { SnomedContext } from '../SnomedContext';
import { useLoading } from '../contexts/LoadingContext';
import SNOMEDCode from './Components/SNOMEDCode'; // Import the SNOMEDCode component

const server = process.env.REACT_APP_API_BASE_URL
  ? axios.create({ baseURL: process.env.REACT_APP_API_BASE_URL })
  : axios.create({});

function HomePage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [showAlert, setShowAlert] = useState(false); // State to manage alert visibility
  const { selectedSnomedCodes, setSelectedSnomedCodes, selectedSnomedCode, setSelectedSnomedCode } = useContext(SnomedContext);
  const { startLoading, stopLoading } = useLoading();

  const [parents, setParents] = useState([]);
  const [children, setChildren] = useState([]);

  useEffect(() => {
    if (selectedSnomedCode) {
      fetchRelatedCodes(selectedSnomedCode.conceptId);
    }
  }, [selectedSnomedCode]);

  const searchSnomedCodes = () => {
    if (searchTerm.length < 3) {
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000); // Hide alert after 3 seconds
      return;
    }

    startLoading();
    server
      .get(`/snomed/search/${searchTerm}`)
      .then((response) => response.data)
      .then((snomedCodes) => {
        if (snomedCodes) {
          setSelectedSnomedCodes(snomedCodes);
          if (snomedCodes.length > 0) {
            setSelectedSnomedCode(snomedCodes[0]);  // Set the first code as the selected SNOMED code
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

  const fetchRelatedCodes = (conceptId) => {
    // Fetch parents
    server
      .get(`/snomed/parents/${conceptId}`)
      .then((response) => setParents(response.data))
      .catch((error) => console.error('Error fetching parents:', error));

    // Fetch children
    server
      .get(`/snomed/children/${conceptId}`)
      .then((response) => setChildren(response.data))
      .catch((error) => console.error('Error fetching children:', error));
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
          <div className="col-md-4 scrollable-area">
            <h3>Find SNOMED Code</h3>
            <Form onSubmit={handleSearchSubmit}>
              <Form.Group controlId="searchTerm">
                <Form.Label>SNOMED Code or Term</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter SNOMED code or term"
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
              </Form.Group>
              <Button style={{ backgroundColor: 'rgb(47, 47, 212)', borderColor: 'rgb(102, 51, 153)' }} type="submit" className="mb-3">
    Search
</Button>

            </Form>
            {showAlert && (
              <Alert variant="warning" className="floating-alert">
                Please enter at least 3 characters to search.
              </Alert>
            )}
            <h3>Matching Codes</h3>
            <div>
              {selectedSnomedCodes.map((snomedCode) => (
                <Card key={snomedCode.id} onClick={() => setSelectedSnomedCode(snomedCode)}>
                  <Card.Body>
                    <SNOMEDCode snomedCode={snomedCode} /> {/* Display SNOMED code details */}
                  </Card.Body>
                </Card>
              ))}
            </div>
          </div>
          <div className="col-md-8 scrollable-area">
            <h4>Parents</h4>
            <div className="related-codes">
              {parents.map((parent) => (
                <SNOMEDCode key={parent.id} snomedCode={parent} />
              ))}
            </div>
            <h2 className="selected-code">
              {selectedSnomedCode ? `${selectedSnomedCode.conceptId} - ${selectedSnomedCode.term}` : ""}
            </h2>
            <h4>Children</h4>
            <div className="related-codes">
              {children.map((child) => (
                <SNOMEDCode key={child.id} snomedCode={child} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;

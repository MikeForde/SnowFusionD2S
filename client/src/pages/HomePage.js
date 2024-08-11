import React, { useState, useContext } from "react";
import "./Page.css";
import { Card, Form, Button, Alert } from "react-bootstrap"; // Import Alert component
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
  const { selectedSnomedCodes, setSelectedSnomedCodes, setSelectedSnomedCode } = useContext(SnomedContext);
  const { startLoading, stopLoading } = useLoading();

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
          <Button variant="primary" type="submit" className="mb-3">
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
    </div>
  );
}

export default HomePage;

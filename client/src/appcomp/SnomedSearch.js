import React, { useState, useContext } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { SnomedContext } from '../SnomedContext';  // Updated context import
import { useLoading } from '../contexts/LoadingContext';
import './AppComp.css'; // Import the CSS file

const server = process.env.REACT_APP_API_BASE_URL
  ? axios.create({ baseURL: process.env.REACT_APP_API_BASE_URL })
  : axios.create({});

function SnomedSearch({ collapseNavbar }) { // Updated function name
  const [searchTerm, setSearchTerm] = useState('');
  const { setSelectedSnomedCodes, setSelectedSnomedCode } = useContext(SnomedContext);  // Updated context usage
  const { startLoading, stopLoading } = useLoading();

  const searchSnomedCodes = () => {  // Updated function name
    startLoading();
    server
      .get(`/snomed/search/${searchTerm}`)  // Updated API endpoint
      .then((response) => response.data)
      .then((snomedCodes) => {  // Updated variable name
        if (snomedCodes) {
          setSelectedSnomedCodes(snomedCodes);  // Updated state setter
          if (snomedCodes.length > 0) {
            setSelectedSnomedCode(snomedCodes[0]);  // Updated state setter
            collapseNavbar(); // Call the collapseNavbar function
          }
        }
      })
      .catch((error) => {
        console.log('Error', error);
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
    searchSnomedCodes();  // Updated function call
  };

  return (
    <Form inline onSubmit={handleSearchSubmit} className="search-form">
      <Form.Control
        type="text"
        placeholder="Search SNOMED Code or Term"  // Updated placeholder
        value={searchTerm}
        onChange={handleSearchChange}
        className="mr-sm-2 form-control"
      />
      <Button variant="outline-light" type="submit">
        Search
      </Button>
    </Form>
  );
}

export default SnomedSearch;  // Updated export name

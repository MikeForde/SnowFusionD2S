import React, { useState, useContext } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { SnomedContext } from '../SnomedContext';
import { useLoading } from '../contexts/LoadingContext';
import './AppComp.css';

const server = process.env.REACT_APP_API_BASE_URL
  ? axios.create({ baseURL: process.env.REACT_APP_API_BASE_URL })
  : axios.create({});

function SnomedSearch({ collapseNavbar }) {
  const [searchTerm, setSearchTerm] = useState('');
  const { setSelectedSnomedCodes, setSelectedSnomedCode } = useContext(SnomedContext);
  const { startLoading, stopLoading } = useLoading();

  const searchSnomedCodes = () => { 
    startLoading();
    server
      .get(`/snomed/search/${searchTerm}`)
      .then((response) => response.data)
      .then((snomedCodes) => {
        if (snomedCodes) {
          setSelectedSnomedCodes(snomedCodes);
          if (snomedCodes.length > 0) {
            setSelectedSnomedCode(snomedCodes[0]);
            collapseNavbar();
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
    searchSnomedCodes();
  };

  return (
    <Form inline onSubmit={handleSearchSubmit} className="search-form">
      <Form.Control
        type="text"
        placeholder="Search SNOMED Code or Term"
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

export default SnomedSearch;

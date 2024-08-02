import React from "react";
import "./Page.css";
import "bootstrap/dist/css/bootstrap.min.css";
//import axios from "axios";
// import { PatientContext } from '../PatientContext';
// import { useLoading } from '../contexts/LoadingContext';

// const server = process.env.REACT_APP_API_BASE_URL
//   ? axios.create({ baseURL: process.env.REACT_APP_API_BASE_URL })
//   : axios.create({});

function HomePage() {
  // const { selectedPatients, setSelectedPatients, setSelectedPatient } = useContext(PatientContext);
  // const { startLoading, stopLoading } = useLoading();


  return (
    <div className="app">
      <div className="container">
        <h3>Find SNOMED Code</h3>
    
        <h3>Matching Codes</h3>

      </div>
    </div>
  );
}

export default HomePage;

import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faBeer, faBrain, faCloud, faDownload, faFileMedical, faQrcode, faUpload } from '@fortawesome/free-solid-svg-icons';
import { SnomedContext } from '../SnomedContext'; // Updated context import
import { useLoading } from '../contexts/LoadingContext';
import SnomedSearch from './SnomedSearch'; // Updated component import

function NavigationBar() {
  const { selectedSnomedCodes, setSelectedSnomedCode, selectedSnomedCode } = useContext(SnomedContext); // Updated context usage
  const [expanded, setExpanded] = useState(false);
  const { startLoading } = useLoading();
  //const location = useLocation();

  useEffect(() => {
    // Update selectedSnomedCode when selectedSnomedCodes change
    if (selectedSnomedCodes.length > 0) {
      setSelectedSnomedCode(selectedSnomedCodes[0]);
    }
  }, [selectedSnomedCodes, setSelectedSnomedCode]);

  const handleSnomedSelect = (snomedCode) => { // Updated function name
    setSelectedSnomedCode(snomedCode); // Updated state setter
    setExpanded(false); // Collapse Navbar on SNOMED code select

    // Check if the current path matches one of the specified routes
    //const currentPath = location.pathname;
    // const shouldStartLoading = ['/api', '/qr', '/beergarden', '/offroadpost'].includes(currentPath);
    
    // if (shouldStartLoading) {
    //   startLoading();
    // }
  };

  const handleNavItemSelect = (startLoad) => {
    setExpanded(false); // Collapse Navbar on any item select
    if (startLoad && selectedSnomedCode) { // Updated condition
      startLoading();
    }
  };

  // Function to collapse the Navbar
  const collapseNavbar = () => {
    setExpanded(false);
  };

  return (
    <Navbar expanded={expanded} expand="lg" fixed="top">
      <Container>
        <Navbar.Brand as={Link} to="/" onClick={() => handleNavItemSelect(false)}>
          <img
            src="/ipsnavbar.ico"
            width="25"
            height="25"
            className="d-inline-block align-center"
            alt="IPS Logo"
            style={{ marginRight: '10px' }}
          />
          SnowFusion D2S Prototype 0_1
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={() => setExpanded(!expanded)} />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavDropdown title="Info" id="basic-nav-dropdown">
              <NavDropdown.Item as={Link} to="/about" onClick={() => handleNavItemSelect(false)}>
                About SNOMED CT
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/aboutwebapp" onClick={() => handleNavItemSelect(false)}>
                About Web App
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item as={Link} to="/changelog" onClick={() => handleNavItemSelect(false)}>
                Change Log
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          {selectedSnomedCodes.length > 0 && ( // Updated condition
            <Nav>
              <NavDropdown
                title={selectedSnomedCode ? `${selectedSnomedCode.code} ${selectedSnomedCode.term}` : "Selected SNOMED Codes"} // Updated title
                id="selected-snomed-codes-dropdown" // Updated ID
              >
                {selectedSnomedCodes.map((snomedCode) => ( // Updated mapping
                  <NavDropdown.Item
                    key={snomedCode.id} // Updated key
                    onClick={() => handleSnomedSelect(snomedCode)} // Updated onClick
                  >
                    {snomedCode.code} {snomedCode.term} // Updated display
                  </NavDropdown.Item>
                ))}
              </NavDropdown>
            </Nav>
          )}
          <SnomedSearch collapseNavbar={collapseNavbar}/> {/* Updated component usage */}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;

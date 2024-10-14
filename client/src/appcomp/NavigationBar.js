import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faBeer, faBrain, faCloud, faDownload, faFileMedical, faQrcode, faUpload } from '@fortawesome/free-solid-svg-icons';
import { SnomedContext } from '../SnomedContext';
import { useLoading } from '../contexts/LoadingContext';
import SnomedSearch from './SnomedSearch';
import './AppComp.css';

function NavigationBar() {
  const { selectedSnomedCodes, setSelectedSnomedCode, selectedSnomedCode } = useContext(SnomedContext);
  const [expanded, setExpanded] = useState(false);
  const { startLoading } = useLoading();
  //const location = useLocation();

  useEffect(() => {
    // Update selectedSnomedCode when selectedSnomedCodes change
    if (selectedSnomedCodes.length > 0) {
      setSelectedSnomedCode(selectedSnomedCodes[0]);
    }
  }, [selectedSnomedCodes, setSelectedSnomedCode]);

  const handleSnomedSelect = (snomedCode) => {
    setSelectedSnomedCode(snomedCode);
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
    if (startLoad && selectedSnomedCode) {
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
            width="32"
            height="32"
            className="d-inline-block align-center"
            alt="IPS Logo"
            style={{ marginRight: '10px' }}
          />
          SnowFusion D2S 0_10
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={() => setExpanded(!expanded)} />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
          <Nav.Link as={Link} to="/review" onClick={() => handleNavItemSelect(false)}>Review</Nav.Link>
          <Nav.Link as={Link} to="/purpose" onClick={() => handleNavItemSelect(false)}>Purpose</Nav.Link>
            <NavDropdown title="Info" id="basic-nav-dropdown">
              <NavDropdown.Item as={Link} to="/aboutwebapp" onClick={() => handleNavItemSelect(false)}>
                About Web App
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/about" onClick={() => handleNavItemSelect(false)}>
                About SNOMED CT
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/about-dmicp" onClick={() => handleNavItemSelect(false)}>
                About DMICP and Read
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item as={Link} to="/changelog" onClick={() => handleNavItemSelect(false)}>
                Change Log
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          {selectedSnomedCodes.length > 0 && (
            <Nav>
              <NavDropdown
                title={selectedSnomedCode ? `${selectedSnomedCode.conceptId} ${selectedSnomedCode.term}` : "Selected SNOMED Codes"}
                id="selected-snomed-codes-dropdown"
                className="snomed-search-displayed"
              >
                {selectedSnomedCodes.map((snomedCode) => (
                  <NavDropdown.Item
                    key={snomedCode.id}
                    onClick={() => handleSnomedSelect(snomedCode)}
                    className="snomed-search-result"  // Added class for custom styling
                  >
                    {snomedCode.conceptId} {snomedCode.term}
                  </NavDropdown.Item>
                ))}
              </NavDropdown>
            </Nav>
          )}
          <SnomedSearch collapseNavbar={collapseNavbar} /> {/* Updated component usage */}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;

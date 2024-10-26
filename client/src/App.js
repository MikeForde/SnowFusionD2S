import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import NavigationBar from './appcomp/NavigationBar';
import ChangeLogPage from './pages/ChangelogPage';
import AboutWebAppPage from './pages/AboutWebappPage';
import DMICPReadReviewPage from './pages/DMICPReadReviewPage';
import AboutDMICPPage from './pages/AboutDMICPPage';
import PurposePage from './pages/PurposePage';
import MapPage from './pages/MapPage';
import LandingPage from './pages/LandingPage';
import InactivatePage from './pages/InactivatePage';
import From40000to9000Page from './pages/From40000To9000Page';
import ReviewPage from './pages/ReviewPage';
import { SnomedProvider } from './contexts/SnomedContext'; // Updated import
import { LoadingProvider } from './contexts/LoadingContext';
import { PurposeDataProvider } from './contexts/PurposeDataContext';
import { MapDataProvider } from './contexts/MapDataContext';
import { InactivateDataProvider } from './contexts/InactivateDataContext';
import LoadingSpinner from './components/LoadingSpinner';

function App() {
  return (
    <InactivateDataProvider>
      <MapDataProvider>
        <PurposeDataProvider>
          <SnomedProvider> {/* Updated provider */}
            <LoadingProvider>
              <Router>
                <div style={{ paddingTop: '56px' }}> {/* Adjust the padding-top value based on your Navbar height */}
                  <NavigationBar />
                  <LoadingSpinner />
                  <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/snomed" element={<HomePage />} />
                    <Route path="/review/:code?" element={<DMICPReadReviewPage />} />
                    <Route path="/about" element={<AboutPage />} />
                    <Route path="/changelog" element={<ChangeLogPage />} />
                    <Route path="/aboutwebapp" element={<AboutWebAppPage />} />
                    <Route path="/about-dmicp" element={<AboutDMICPPage />} />
                    <Route path="/purpose" element={<PurposePage />} />
                    <Route path="/map" element={<MapPage />} />
                    <Route path="/inactivate" element={<InactivatePage />} />
                    <Route path="/from40000to9000" element={<From40000to9000Page />} />
                    <Route path="/review-process" element={<ReviewPage />} />
                  </Routes>
                </div>
              </Router>
            </LoadingProvider>
          </SnomedProvider>
        </PurposeDataProvider>
      </MapDataProvider>
    </InactivateDataProvider>
  );
}

export default App;

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import NavigationBar from './appcomp/NavigationBar';
import ChangeLogPage from './pages/ChangelogPage';
import AboutWebAppPage from './pages/AboutWebappPage';
import { SnomedProvider } from './SnomedContext'; // Updated import
import { LoadingProvider } from './contexts/LoadingContext';
import LoadingSpinner from './components/LoadingSpinner';

function App() {
  return (
    <SnomedProvider> {/* Updated provider */}
      <LoadingProvider>
        <Router>
          <div style={{ paddingTop: '56px' }}> {/* Adjust the padding-top value based on your Navbar height */}
            <NavigationBar />
            <LoadingSpinner />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/changelog" element={<ChangeLogPage />} />
              <Route path="/aboutwebapp" element={<AboutWebAppPage />} />
            </Routes>
          </div>
        </Router>
      </LoadingProvider>
    </SnomedProvider>
  );
}

export default App;

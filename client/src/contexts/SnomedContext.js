import React, { createContext, useState } from 'react';

export const SnomedContext = createContext();

export const SnomedProvider = ({ children }) => {
  const [selectedSnomedCodes, setSelectedSnomedCodes] = useState([]); // Updated state for SNOMED codes
  const [selectedSnomedCode, setSelectedSnomedCode] = useState(null); // Updated state for a single SNOMED code

  return (
    <SnomedContext.Provider value={{ selectedSnomedCodes, setSelectedSnomedCodes, selectedSnomedCode, setSelectedSnomedCode }}>
      {children}
    </SnomedContext.Provider>
  );
};


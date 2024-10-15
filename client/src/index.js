import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { SnomedProvider } from './contexts/SnomedContext'; // Updated import

ReactDOM.render(
  <SnomedProvider> {/* Updated provider */}
    <App />
  </SnomedProvider>,
  document.getElementById('root')
);


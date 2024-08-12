import React from 'react';
import PropTypes from 'prop-types';

function SNOMEDCode({ snomedCode, onClick, className }) {
  return (
    <div className={`snomed-code ${className}`} onClick={onClick}>
      <p>{snomedCode.conceptId} - {snomedCode.term}</p>
    </div>
  );
}

SNOMEDCode.propTypes = {
  snomedCode: PropTypes.shape({
    conceptId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    term: PropTypes.string.isRequired,
  }).isRequired,
  onClick: PropTypes.func, // Accept an onClick function
  className: PropTypes.string, // Accept an optional className
};

SNOMEDCode.defaultProps = {
  onClick: () => {}, // Default to an empty function if onClick is not provided
  className: '', // Default to an empty string if className is not provided
};

export default SNOMEDCode;


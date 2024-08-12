import React from 'react';
import PropTypes from 'prop-types';

function SNOMEDCode({ snomedCode }) {
  return (
    <div className="snomed-code">
      <p>{snomedCode.conceptId} {snomedCode.term}</p>
    </div>
  );
}

SNOMEDCode.propTypes = {
  snomedCode: PropTypes.shape({
    conceptId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    term: PropTypes.string.isRequired,
  }).isRequired,
};

export default SNOMEDCode;

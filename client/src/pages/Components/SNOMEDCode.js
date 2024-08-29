import React from 'react';
import PropTypes from 'prop-types';

function SNOMEDCode({ snomedCode, onClick, className, isSelected }) {
  return (
    <div className={`snomed-code ${className}`} onClick={onClick}>
      <p>
        {snomedCode.moduleId === 991006900109 ? (
          <>
            (DMS Local Code) - {snomedCode.term}
            <img
              src="/UK_MOD_DMS_Flag.svg"
              alt="UK MOD DMS Flag"
              style={{
                width: isSelected ? '40px' : '20px',  // Larger flag if selected
                marginLeft: '5px'
              }}
            />
          </>
        ) : (
          <>
            {snomedCode.conceptId} - {snomedCode.term}
            {snomedCode.moduleId === '999000011000000103' && (
              <img
                src="/uk-flag.svg"
                alt="UK Flag"
                style={{
                  width: isSelected ? '40px' : '20px',  // Larger flag if selected
                  marginLeft: '5px'
                }}
              />
            )}
          </>
        )}
      </p>
    </div>
  );
}

SNOMEDCode.propTypes = {
  snomedCode: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    conceptId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    term: PropTypes.string.isRequired,
    moduleId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]), // Add moduleId to props
  }).isRequired,
  onClick: PropTypes.func,
  className: PropTypes.string,
};

SNOMEDCode.defaultProps = {
  onClick: () => { },
  className: '',
};

export default SNOMEDCode;



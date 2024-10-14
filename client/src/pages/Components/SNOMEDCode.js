import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons'; // Import the view icon
import "../Page.css"; 

function SNOMEDCode({ snomedCode, onClick, className, isSelected }) {
  const navigate = useNavigate();

  const handleViewClick = (event) => {
    event.stopPropagation(); // Prevent triggering the parent onClick
    // Navigate to DMICPReadReviewPage and pass the code
    navigate(`/review/${snomedCode.conceptId}`);
  };

  return (
    <div className={`snomed-code ${className}`} onClick={onClick}>
      <p>
        {snomedCode.moduleId === 991006900109 ? (
          <>
            (DMS) - {snomedCode.term}
            <img
              src="/UK_MOD_DMS_Flag.svg"
              alt="UK MOD DMS Flag"
              style={{
                width: isSelected ? '40px' : '20px', // Larger flag if selected
                marginLeft: '5px',
              }}
            />
            {/* Add the view icon */}
            <FontAwesomeIcon
              icon={faEye}
              style={{ color: 'blue', marginLeft: '10px', cursor: 'pointer' }}
              onClick={handleViewClick}
            />
          </>
        ) : (
          <>
            {snomedCode.conceptId} - {snomedCode.term} 
            {(snomedCode.moduleId === '999000011000000103' || snomedCode.moduleId === '999000041000000102') && (
              <img
                src="/uk-flag.svg"
                alt="UK Flag"
                style={{
                  width: isSelected ? '40px' : '20px', // Larger flag if selected
                  marginLeft: '5px',
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
  isSelected: PropTypes.bool,
};

SNOMEDCode.defaultProps = {
  onClick: () => {},
  className: '',
  isSelected: false,
};

export default SNOMEDCode;

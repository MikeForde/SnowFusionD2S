import React from 'react';
import { Tooltip } from 'react-bootstrap';

// Helper function to render the floating info box
const renderTooltip = (item) => (
    <Tooltip id={`tooltip-${item.id}`} className="custom-tooltip">
        <div className="details">
            {item.NewDescription && <p><strong>New Description:</strong> {item.NewDescription}</p>}
            {item.SNOMEDParent && <p><strong>Suggested SNOMED Parent:</strong> {item.SNOMEDParent}</p>}

            {/* Drop-related extra information */}
            {item.Drop.startsWith('Drop1') && item.Cat2 && (
                <div>
                    <strong>High Priority:</strong>
                    <ul>
                        {item.Cat2.split(';').map((name, index) => (
                            <li key={index}>{name}</li>
                        ))}
                    </ul>
                </div>
            )}
            {item.Drop.startsWith('Drop2') && (
                <>
                    {item.TemplateNames && (
                        <div>
                            <strong>Templates:</strong>
                            <ul>
                                {item.TemplateNames.split(';').map((name, index) => (
                                    <li key={index}>{name.replace(/_/g, ' ')}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                    {item.DocumentNames && (
                        <div>
                            <strong>Documents:</strong>
                            <ul>
                                {item.DocumentNames.split(';').map((name, index) => (
                                    <li key={index}>{name.replace(/_/g, ' ')}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                    {item.SearchNames && (
                        <div>
                            <strong>Searches:</strong>
                            <ul>
                                {item.SearchNames.split(';').map((name, index) => (
                                    <li key={index}>{name.replace(/_/g, ' ')}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                </>
            )}
            {item.Drop.startsWith('Drop3') && item.UsageCount && (
                <p><strong>Usage in last 5 years:</strong> {item.UsageCount}</p>
            )}
        </div>
    </Tooltip>
);

export default renderTooltip;

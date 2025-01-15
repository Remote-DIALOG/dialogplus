import React from 'react';
import './style.css';

function ProgressBarWithLabel(props) {
  const { value, label, color } = props;

  // Use grey color if value is 0 (unrated)
  const barColor = value === 0 ? '#DCDCDC' : color;

  return (
    <div className="progress">
      <div className="progress-bar" style={{ width: `${value}%`, backgroundColor: barColor }}>
        {value === 0 ? (
          <div className="progress-label" style={{ backgroundColor: barColor }}></div>
        ) : (
          <div className="progress-label" style={{ backgroundColor: barColor }}>{label}</div>
        )}
      </div>
    </div>
  );
}

export default ProgressBarWithLabel;


import React from 'react';
import './style.css';

function ProgressBarWithLabel(props) {
  const { value, label, color } = props;

  return (
    <div className="progress">
      <div className="progress-bar" style={{ width: `${value}%`, backgroundColor:color}}>
        <div className="progress-label" style={{backgroundColor:color}}>{label}</div>
      </div>
    </div>
  );
}

export default ProgressBarWithLabel;

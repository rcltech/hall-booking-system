import React from 'react';
import './Loader.css';

const Loader = () => {
  return (
    <div className="lds-css ng-scope">
      <div
        style={{ width: '100%', height: '100%' }}
        className="lds-double-ring"
      >
        <div></div>
        <div></div>
        <div>
          <div></div>
        </div>
        <div>
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default Loader;

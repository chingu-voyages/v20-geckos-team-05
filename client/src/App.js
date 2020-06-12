import React from 'react';
import logo from './logo.svg';
import './App.css';

import CalenderDisplay from './components/CalenderDisplay/calenderDisplay';

function App() {

  return (
    <div className="app">
      <div className="header">
        <div className="title">
            eCalender
        </div>
      </div>
      <div className="mainContainer">
        <CalenderDisplay/>
        <div className="eventsDisplay"></div>
        </div>
        <div className="footer">
          This is the footer
        </div>
    </div>
  );
}
export default App;

import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {

let today = new Date();
let month = new Array();

month[0] = "Jan";
month[1] = "Feb";
month[2] = "March";
month[3] = "April";
month[4] = "May";
month[5] = "June";
month[6] = "July";
month[7] = "Aug";
month[8] = "Sept";
month[9] = "Oct";
month[10] = "Nov";
month[11] = "Dec";


let currentMonth = month[today.getMonth()];
let prevMonth = month[today.getMonth() - 1];
let nextMonth = month[today.getMonth() + 1];
let currentYear = today.getFullYear();


  return (
    <div className="app">
      <div className="header">
        <div className="title">
            eCalender
        </div>
      </div>
      <div className="mainContainer">
        <div className="calenderDisplay">
          <div className="currrentYear">{currentYear}</div>
          <div className="monthsDisplay">
            <div>{prevMonth}</div>
            <div><strong>{currentMonth}</strong></div>
            <div>{nextMonth}</div>
          </div>
          <div className="daysDisplay">
            <div>Mon</div>
            <div>Tues</div>
            <div>Weds</div>
            <div>Thurs</div>
            <div>Fri</div>
            <div>Sat</div>  
            <div>Sun</div>           
            <div className="day"></div>
            <div className="day"></div>
            <div className="day"></div>
            <div className="day"></div>
            <div className="day"></div>
            <div className="day"></div>
            <div className="day"></div>
            <div className="day"></div>
            <div className="day"></div>
            <div className="day"></div>
            <div className="day"></div>
            <div className="day"></div>
            <div className="day"></div>
            <div className="day"></div>
            <div className="day"></div>
            <div className="day"></div>
            <div className="day"></div>
            <div className="day"></div>
            <div className="day"></div>
            <div className="day"></div>
            <div className="day"></div>
            <div className="day"></div>
            <div className="day"></div>
            <div className="day"></div>
          </div>
        </div>
        <div className="eventsDisplay"></div>
        </div>
        <div className="footer">
          This is the footer
        </div>
    </div>
  );
}

export default App;

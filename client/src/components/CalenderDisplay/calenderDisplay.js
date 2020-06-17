import React from "react";
import "./calenderDisplay.styles.css";

let today = new Date();
let currentMonth = today.getMonth();
let currentYear = today.getFullYear();

const months = [
  "Jan",
  "Feb",
  "March",
  "April",
  "May",
  "June",
  "July",
  "Aug",
  "Sept",
  "Oct",
  "Nov",
  "Dec",
];

let days = [];

let prevMonth = months[currentMonth - 1];
let nextMonth = months[currentMonth + 1];

class CalenderDisplay extends React.Component {
  render() {
    let currentMonthDisplay = months[currentMonth];

    let startDayOfWeek = new Date(currentYear, currentMonth).getDay();
    let numOfDays = 32 - new Date(currentYear, currentMonth, 32).getDate();
    for (let i = 1; i <= numOfDays; i++) {
      days.push(i);
    }

    const daysToDisplay = [];

    for (let i = 0; i < 42; i++) {
      if (days[i] <= startDayOfWeek) {
        daysToDisplay.push(<div className="day"></div>);
      } else {
        daysToDisplay.push(<div className="day">{days.shift()}</div>);
      }
    }

    const prevBtn = () => {
      if (currentMonth === 1) {
        currentMonth--;
        prevMonth = "Dec";
        nextMonth = months[currentMonth + 1];
        this.forceUpdate();
      } else if (currentMonth === 0) {
        currentYear--;
        currentMonth = 11;
        prevMonth = months[currentMonth - 1];
        nextMonth = "Jan";
        this.forceUpdate();
      } else {
        currentMonth--;
        prevMonth = months[currentMonth - 1];
        nextMonth = months[currentMonth + 1];
        this.forceUpdate();
      }
    };
    const nextBtn = () => {
      if (currentMonth === 10) {
        currentMonth++;
        nextMonth = "Jan";
        prevMonth = months[currentMonth - 1];
        this.forceUpdate();
      } else if (currentMonth === 11) {
        currentYear++;
        currentMonth = 0;
        prevMonth = "Dec";
        nextMonth = months[currentMonth + 1];
        this.forceUpdate();
      } else {
        currentMonth++;
        prevMonth = months[currentMonth - 1];
        nextMonth = months[currentMonth + 1];
        this.forceUpdate();
      }
    };
    console.log(currentMonth);
    console.log(prevMonth);
    console.log(nextMonth);
    return (
      <div className="calenderDisplay">
        <div className="currrentYear">{currentYear}</div>
        <div className="monthsDisplay">
          <div>{prevMonth}</div>
          <div>{currentMonthDisplay}</div>
          <div>{nextMonth}</div>
        </div>
        <div className="daysOfWeekDisplay">
          <div>Sun</div>
          <div>Mon</div>
          <div>Tues</div>
          <div>Weds</div>
          <div>Thurs</div>
          <div>Fri</div>
          <div>Sat</div>
          {daysToDisplay}
        </div>
        <button onClick={prevBtn}>prev</button>
        <button onClick={nextBtn}>next</button>
      </div>
    );
  }
}

export default CalenderDisplay;

import React from "react";
import "./calenderDisplay.styles.css";

import leftArrow from "../../assets/left-arrow.svg";
import rightArrow from "../../assets/right-arrow.svg";

class CalenderDisplay extends React.Component {
  state = {
    currentMonth: new Date().getMonth(),
    currentYear: new Date().getFullYear(),
    prevMonth: this.props.months[new Date().getMonth() - 1],
    nextMonth: this.props.months[new Date().getMonth() + 1],
    currentMonthDisplay: this.props.months[new Date().getMonth()],
  };

  createCalendar() {
    let days = [];
    let startDayOfWeek = new Date(
      this.state.currentYear,
      this.state.currentMonth
    ).getDay();
    let numOfDays =
      32 -
      new Date(this.state.currentYear, this.state.currentMonth, 32).getDate();
    for (let i = 1; i <= numOfDays; i++) {
      days.push(i);
    }

    const daysToDisplay = [];

    for (let i = 0; i < 42; i++) {
      if (days[i] <= startDayOfWeek) {
        daysToDisplay.push(
          <div
            key={i}
            className={`${this.state.currentMonth} ${this.state.currentYear} day`}
          ></div>
        );
      } else {
        daysToDisplay.push(
          <div
            key={i}
            className={`${this.state.currentMonth} ${this.state.currentYear} day`}
          >
            {days.shift()}
          </div>
        );
      }
    }
    return daysToDisplay;
  }

  prevBtn = () => {
    if (this.state.currentMonth === 1) {
      this.setState((prevState) => ({
        currentMonth: prevState.currentMonth - 1,
        prevMonth: "Dec",
        nextMonth: this.props.months[prevState.currentMonth],
        currentMonthDisplay: this.props.months[prevState.currentMonth - 1],
      }));
    } else if (this.state.currentMonth === 0) {
      this.setState((prevState) => ({
        currentYear: prevState.currentYear - 1,
        currentMonth: 11,
        prevMonth: this.props.months[10],
        nextMonth: "Jan",
        currentMonthDisplay: this.props.months[11],
      }));
    } else {
      this.setState((prevState) => ({
        currentMonth: prevState.currentMonth - 1,
        prevMonth: this.props.months[prevState.currentMonth - 2],
        nextMonth: this.props.months[prevState.currentMonth],
        currentMonthDisplay: this.props.months[prevState.currentMonth - 1],
      }));
    }
  };

  nextBtn = () => {
    if (this.state.currentMonth === 10) {
      this.setState((prevState) => ({
        currentMonth: prevState.currentMonth + 1,
        nextMonth: "Jan",
        prevMonth: this.props.months[prevState.currentMonth],
        currentMonthDisplay: this.props.months[prevState.currentMonth + 1],
      }));
    } else if (this.state.currentMonth === 11) {
      this.setState((prevState) => ({
        currentYear: prevState.currentYear + 1,
        currentMonth: 0,
        prevMonth: "Dec",
        nextMonth: this.props.months[1],
        currentMonthDisplay: this.props.months[0],
      }));
    } else {
      this.setState((prevState) => ({
        currentMonth: prevState.currentMonth + 1,
        prevMonth: this.props.months[prevState.currentMonth],
        nextMonth: this.props.months[prevState.currentMonth + 2],
        currentMonthDisplay: this.props.months[prevState.currentMonth + 1],
      }));
    }
  };

  render() {
    return (
      <div className="calenderDisplayContainer">
        <div className="calenderDisplay">
          <div className="currentYear">{this.state.currentYear}</div>
          <div className="monthsDisplay">
            <div className="prevMonth">{this.state.prevMonth}</div>
            <div className="currentMonth">{this.state.currentMonthDisplay}</div>
            <div className="nextMonth">{this.state.nextMonth}</div>
          </div>
          <div
            className="daysOfWeekDisplay"
            onClick={(e) => this.props.onSelection(e)}
          >
            <div className="dayOfWeek">Su</div>
            <div className="dayOfWeek">Mo</div>
            <div className="dayOfWeek">Tu</div>
            <div className="dayOfWeek">We</div>
            <div className="dayOfWeek">Th</div>
            <div className="dayOfWeek">Fr</div>
            <div className="dayOfWeek">Sa</div>
            {this.createCalendar()}
          </div>
          <div className="prevButton" onClick={this.prevBtn}>
            <img src={leftArrow} alt="scroll to previous month"></img>
          </div>
          <div className="nextButton" onClick={this.nextBtn}>
            <img src={rightArrow} alt="scroll to next month"></img>
          </div>
        </div>
      </div>
    );
  }
}

export default CalenderDisplay;

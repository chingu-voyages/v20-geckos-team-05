import React from "react";
import "./calenderDisplay.styles.css";

import leftArrow from "../../assets/left-arrow.svg";
import rightArrow from "../../assets/right-arrow.svg";

class CalenderDisplay extends React.Component {
  state = {
    currentMonth: new Date().getMonth(),
    currentYear: new Date().getFullYear(),
    prevMonth: new Date().getMonth() - 1,
    prevYear: new Date().getFullYear() - 1,
    nextMonth: new Date().getMonth() + 1,
    nextYear: new Date().getFullYear() + 1,
    prevMonthString: this.props.months[new Date().getMonth() - 1],
    nextMonthString: this.props.months[new Date().getMonth() + 1],
    currentMonthDisplay: this.props.months[new Date().getMonth()],
  };

  createCalendar() {
    let today = new Date();
    let prevDays = [];
    let nextDays = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
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
    let numOfDaysPrevMonth =
      32 - new Date(this.state.currentYear, this.state.prevMonth, 32).getDate();

    for (let i = 0; i < startDayOfWeek; i++) {
      prevDays.push(numOfDaysPrevMonth);
      numOfDaysPrevMonth--;
    }

    const daysToDisplay = [];

    for (let i = 0; i < 42; i++) {
      let day = prevDays[0]
        ? prevDays[prevDays.length - 1]
        : days[0]
        ? days[0]
        : nextDays[0];
      let month = prevDays[0]
        ? this.state.prevMonth === -1
          ? "12"
          : this.state.prevMonth + 1
        : days[0]
        ? this.state.currentMonth + 1
        : this.state.nextMonth !== 12
        ? this.state.nextMonth + 1
        : "01";
      let year =
        this.state.currentMonth === 11 && month === "01"
          ? this.state.nextYear
          : this.state.currentMonth === 0 && month === "12"
          ? this.state.prevYear
          : this.state.currentYear;
      let loopingDay = `${year}-${
        this.state.currentMonth < 10 && month < 10 ? "0" : ""
      }${month}-${day < 10 ? "0" : ""}${day}`;
      let cond = false;
      for (let i = 0; i < this.props.appointments.length; i++) {
        if (
          loopingDay === this.props.appointments[i].startDate.substring(0, 10)
        ) {
          cond = true;
          break;
        }
      }
      if (days[i] <= startDayOfWeek) {
        daysToDisplay.push(
          <div
            key={i}
            className={`${this.state.prevMonth} ${
              this.state.prevMonth === 11
                ? this.state.prevYear
                : this.state.currentYear
            } day apart ${cond ? "indicator" : ""}`}
          >
            {prevDays.pop()}
          </div>
        );
      } else {
        let todaySelected = false;
        if (
          i === today.getDate() &&
          this.state.currentMonth === today.getMonth() &&
          this.state.currentYear === today.getFullYear()
        ) {
          todaySelected = true;
        }
        daysToDisplay.push(
          <div
            key={i}
            className={`${
              days.length > 0 ? this.state.currentMonth : this.state.nextMonth
            } ${
              this.state.nextMonth !== 0
                ? this.state.currentYear
                : this.state.nextYear
            } day ${days.length > 0 ? "" : "apart"} ${
              todaySelected ? "today" : ""
            }
            ${cond ? "indicator" : ""}`}
          >
            {days.length > 0 ? days.shift() : nextDays.shift()}
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
        prevMonth: prevState.prevMonth - 1,
        nextMonth: prevState.nextMonth - 1,
        prevMonthString: "Dec",
        nextMonthString: this.props.months[prevState.currentMonth],
        currentMonthDisplay: this.props.months[prevState.currentMonth - 1],
      }));
    } else if (this.state.currentMonth === 0) {
      this.setState((prevState) => ({
        currentYear: prevState.currentYear - 1,
        prevYear: prevState.prevYear - 1,
        nextYear: prevState.nextYear - 1,
        currentMonth: 11,
        prevMonth: 10,
        nextMonth: 12,
        prevMonthString: this.props.months[10],
        nextMonthString: "Jan",
        currentMonthDisplay: this.props.months[11],
      }));
    } else {
      this.setState((prevState) => ({
        currentMonth: prevState.currentMonth - 1,
        prevMonth: prevState.prevMonth - 1,
        nextMonth: prevState.nextMonth - 1,
        prevMonthString: this.props.months[prevState.currentMonth - 2],
        nextMonthString: this.props.months[prevState.currentMonth],
        currentMonthDisplay: this.props.months[prevState.currentMonth - 1],
      }));
    }
  };

  nextBtn = () => {
    if (this.state.currentMonth === 10) {
      this.setState((prevState) => ({
        currentMonth: prevState.currentMonth + 1,
        prevMonth: prevState.prevMonth + 1,
        nextMonth: prevState.nextMonth + 1,
        nextMonthString: "Jan",
        prevMonthString: this.props.months[prevState.currentMonth],
        currentMonthDisplay: this.props.months[prevState.currentMonth + 1],
      }));
    } else if (this.state.currentMonth === 11) {
      this.setState((prevState) => ({
        currentYear: prevState.currentYear + 1,
        prevYear: prevState.prevYear + 1,
        nextYear: prevState.nextYear + 1,
        currentMonth: 0,
        prevMonth: -1,
        nextMonth: 1,
        prevMonthString: "Dec",
        nextMonthString: this.props.months[1],
        currentMonthDisplay: this.props.months[0],
      }));
    } else {
      this.setState((prevState) => ({
        currentMonth: prevState.currentMonth + 1,
        prevMonth: prevState.prevMonth + 1,
        nextMonth: prevState.nextMonth + 1,
        prevMonthString: this.props.months[prevState.currentMonth],
        nextMonthString: this.props.months[prevState.currentMonth + 2],
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
            <div className="prevMonthString">{this.state.prevMonthString}</div>
            <div className="currentMonth">{this.state.currentMonthDisplay}</div>
            <div className="nextMonthString">{this.state.nextMonthString}</div>
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

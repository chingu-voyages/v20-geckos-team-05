import React from "react";
import "./calenderDisplay.styles.css";

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
        daysToDisplay.push(<div className="day"></div>);
      } else {
        daysToDisplay.push(<div className="day">{days.shift()}</div>);
      }
    }
    console.log(daysToDisplay);
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
      <div className="calenderDisplay">
        <div className="currrentYear">{this.state.currentYear}</div>
        <div className="monthsDisplay">
          <div>{this.state.prevMonth}</div>
          <div>{this.state.currentMonthDisplay}</div>
          <div>{this.state.nextMonth}</div>
        </div>
        <div className="daysOfWeekDisplay">
          <div>Sun</div>
          <div>Mon</div>
          <div>Tues</div>
          <div>Weds</div>
          <div>Thurs</div>
          <div>Fri</div>
          <div>Sat</div>
          {this.createCalendar()}
        </div>
        <button onClick={this.prevBtn}>prev</button>
        <button onClick={this.nextBtn}>next</button>
      </div>
    );
  }
}

CalenderDisplay.defaultProps = {
  months: [
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
  ],
};

export default CalenderDisplay;

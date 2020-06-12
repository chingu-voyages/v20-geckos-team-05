import React from 'react';
import './calenderDisplay.styles.css';


function CalenderDisplay() {

    let today = new Date();
    let currentMonth = today.getMonth();

    const months = [
      { key: 0, name: "Jan", days: 31, startday: 3 }, { key: 1, name: "Feb", days: 28, startday: 6 }, { key: 2, name: "March", days: 31, startday: 0},
      { key: 3, name: "April", days: 30, startday: 3}, { key: 4,name: "May",days: 31, startday: 5}, { key: 5,name: "June", days: 30, startday: 1},
      { key: 6, name: "July", days: 31, startday: 3}, { key: 7, name: "Aug", days: 31, startday: 6 }, { key: 8, name: "Sept", days: 30, startday: 2},
      { key: 9, name: "Oct", days: 30, startday: 4 }, { key: 10, name: "Nov", days: 30, startday: 0 }, { key: 11, name: "Dec", days: 31, startday: 2}
    ];

    let days = [];

    let currentMonthDisplay = months[currentMonth].name;
    let prevMonth = months[currentMonth - 1].name;
    let nextMonth = months[currentMonth + 1].name;
    let currentYear = today.getFullYear();

    let startDayOfWeek = months[currentMonth].startday;
    
    (function createDays() {
        months.map(month => {
            if(month.key === currentMonth) {
                for(let i = 0; i <= month.days; i++) {
                    days.push(i);
                } 
            }
        });
    })();

    const daysToDisplay = days.map(day =>
        {
            if (day < startDayOfWeek) {
                return <div className="day"></div>
            } else {
                return <div className="day">{day}</div>
            }
        }
    );

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
        </div>

      );
}    

export default CalenderDisplay;
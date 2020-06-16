import React from "react";
import "./Modal.css";

class Modal extends React.Component {
  state = {
    show: false,
  };

  showModal = () => {
    this.setState({ show: true });
  };

  hideModal = () => {
    this.setState({ show: false });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const appointment = {
      title: event.target.title.value,
      startDate: `${event.target.startDate.value}T${event.target.begins.value}`,
      endDate: `${event.target.endDate.value}T${event.target.ends.value}`,
      begins: `${event.target.startDate.value}T${event.target.begins.value}`,
      ends: `${event.target.endDate.value}T${event.target.ends.value}`,
      people: event.target.people.value,
      location: event.target.location.value,
      description: event.target.description.value,
    };
    fetch(process.env.REACT_APP_API_URL || "http://localhost:5000/api", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(appointment),
    });
    this.setState({ show: false });
    this.props.fetchAppointments();
  };

  render() {
    return (
      <div>
        <button onClick={this.showModal}>Add</button>
        <div
          className={
            this.state.show ? "modal display-block" : "modal display-none"
          }
        >
          {this.state.show && (
            <section className="modalMain">
              <div className="closeButton" onClick={this.hideModal}><strong>X</strong></div>
              <form onSubmit={(e) => this.handleSubmit(e)}>
                <div className="entryContainer" >
                  <div className="appointmentTitle">
                    <label>Title</label>
                    <input type="text" name="title"></input>
                  </div>
                  <div className="dates">
                    <div className="startDate">
                      <label>Start Date</label>
                      <input type="date" name="startDate"></input>
                    </div>
                    <div className="endDate ">
                      <label>End Date</label>
                      <input type="date" name="endDate"></input>
                    </div>
                  </div>  
                  <div className="times">
                    <div className="startTime">
                      <label>Begins</label>
                      <input type="time" name="begins"></input>
                    </div>
                    <div className="endTime">
                      <label>Ends</label>
                      <input type="time" name="ends"></input>
                    </div>                    
                  </div>
                  <div className="appointmentExtras">
                    <div className="peopleInput">
                      <label>People</label>
                      <input type="text" name="people"></input>
                    </div>
                    <div className="locationInput">
                      <label>Location</label>
                      <input type="text" name="location"></input>
                    </div>
                    <div className="descriptionInput">
                      <label>Description</label>
                      <input type="text" name="description"></input>
                    </div>
                  </div>
                </div>
                <div className="submitButton">
                    <button>Add event</button>
                </div>
              </form>
            </section>
          )}
        </div>
      </div>
    );
  }
}

export default Modal;

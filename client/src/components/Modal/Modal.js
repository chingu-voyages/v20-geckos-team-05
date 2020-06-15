import React from "react";
import "./Modal.css";

class Modal extends React.Component {
  state = {
    show: true,
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
            <section className="modal-main">
              <div className="close-button" onClick={this.hideModal}>X</div>
              <form onSubmit={(e) => this.handleSubmit(e)}>
                <div className="entry-container" >
                  <div className="appointment-title">
                    <label>Title</label>
                    <input type="text" name="title"></input>
                  </div>
                  <div className="dates-and-times">
                    <div>
                      <label>Start Date</label>
                      <input type="date" name="startDate"></input>
                    </div>
                    <div>
                      <label>End Date</label>
                      <input type="date" name="endDate"></input>
                    </div>
                    <div>
                      <label>Begins</label>
                      <input type="time" name="begins"></input>
                    </div>
                    <div>
                      <label>Ends</label>
                      <input type="time" name="ends"></input>
                    </div>
                  </div>  
                  <div className="appointment-extras">
                    <div>
                      <label>People</label>
                      <input type="text" name="people"></input>
                    </div>
                    <div>
                      <label>Location</label>
                      <input type="text" name="location"></input>
                    </div>
                    <div>
                      <label>Description</label>
                      <input type="text" name="description"></input>
                    </div>
                  </div>
                </div>
                <div className="submit-button">
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

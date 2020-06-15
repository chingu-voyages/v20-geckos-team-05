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
            <section className="modal-main">
              <button onClick={this.hideModal}>close</button>
              <form onSubmit={(e) => this.handleSubmit(e)}>
                <label>Title</label>
                <input type="text" name="title"></input>
                <label>Start Date</label>
                <input type="date" name="startDate"></input>
                <label>End Date</label>
                <input type="date" name="endDate"></input>
                <label>Begins</label>
                <input type="time" name="begins"></input>
                <label>Ends</label>
                <input type="time" name="ends"></input>
                <label>People</label>
                <input type="text" name="people"></input>
                <label>Location</label>
                <input type="text" name="location"></input>
                <label>Description</label>
                <input type="text" name="description"></input>
                <button>Add event</button>
              </form>
            </section>
          )}
        </div>
      </div>
    );
  }
}

export default Modal;

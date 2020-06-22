import React from "react";
import "./Modal.css";

class Modal extends React.Component {
  state = {
    showModal: false,
    title: "",
    startDate: "",
    endDate: "",
    begins: "",
    ends: "",
    people: "",
    location: "",
    description: "",
    errorTitle: "",
    errorStartDate: "",
    errorEndDate: "",
    errorBegins: "",
    errorEnds: "",
  };

  showModal = () => {
    this.setState({ showModal: true });
  };

  hideModal = () => {
    this.setState({
      showModal: false,
      title: "",
      startDate: "",
      endDate: "",
      begins: "",
      ends: "",
      people: "",
      location: "",
      description: "",
      errorTitle: "",
      errorStartDate: "",
      errorEndDate: "",
      errorBegins: "",
      errorEnds: "",
    });
  };

  validate = () => {
    let errorTitle = "";
    let errorStartDate = "";
    let errorEndDate = "";
    let errorBegins = "";
    let errorEnds = "";
    if (!this.state.title) {
      errorTitle = "Enter a title";
    }
    if (!this.state.startDate) {
      errorStartDate = "Enter a start date";
    }
    if (!this.state.endDate) {
      errorEndDate = "Enter an end date";
    }
    if (!this.state.begins) {
      errorBegins = "Enter a begin time";
    }
    if (!this.state.ends) {
      errorEnds = "Enter an end time";
    }

    if (
      errorTitle ||
      errorStartDate ||
      errorEndDate ||
      errorBegins ||
      errorEnds
    ) {
      this.setState({
        errorTitle,
        errorStartDate,
        errorEndDate,
        errorBegins,
        errorEnds,
      });
      return false;
    }
    return true;
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = async (event) => {
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
    if (this.validate()) {
      await fetch(
        process.env.REACT_APP_API_URL || "http://localhost:5000/api",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(appointment),
        }
      );
      this.setState({ showModal: false });
      this.props.fetchAppointments();
    }
  };

  render() {
    return (
      <div>
        <button onClick={this.showModal}>Add</button>
        <div
          className={
            this.state.showModal ? "modal display-block" : "modal display-none"
          }
        >
          {this.state.showModal && (
            <section className="modalMain">
              <div className="closeButton" onClick={this.hideModal}>
                <strong>X</strong>
              </div>
              <span className="error">{this.state.errorTitle} </span>
              <span className="error">{this.state.errorStartDate} </span>
              <span className="error">{this.state.errorEndDate} </span>
              <span className="error">{this.state.errorBegins} </span>
              <span className="error">{this.state.errorEnds}</span>
              <form onSubmit={(e) => this.handleSubmit(e)}>
                <div className="entryContainer">
                  <div className="appointmentTitle">
                    <label>Title *</label>
                    <input
                      type="text"
                      name="title"
                      onChange={this.handleChange}
                      value={this.state.title}
                    ></input>
                  </div>
                  <div className="dates">
                    <div className="startDate">
                      <label>Start Date *</label>
                      <input
                        type="date"
                        name="startDate"
                        onChange={this.handleChange}
                        value={this.state.startDate}
                      ></input>
                    </div>
                    <div className="endDate ">
                      <label>End Date *</label>
                      <input
                        type="date"
                        name="endDate"
                        onChange={this.handleChange}
                        value={this.state.endDate}
                      ></input>
                    </div>
                  </div>
                  <div className="times">
                    <div className="startTime">
                      <label>Begins *</label>
                      <input
                        type="time"
                        name="begins"
                        onChange={this.handleChange}
                        value={this.state.begins}
                      ></input>
                    </div>
                    <div className="endTime">
                      <label>Ends *</label>
                      <input
                        type="time"
                        name="ends"
                        onChange={this.handleChange}
                        value={this.state.ends}
                      ></input>
                    </div>
                  </div>
                  <div className="appointmentExtras">
                    <div className="peopleInput">
                      <label>People</label>
                      <input
                        type="text"
                        name="people"
                        onChange={this.handleChange}
                        value={this.state.people}
                      ></input>
                    </div>
                    <div className="locationInput">
                      <label>Location</label>
                      <input
                        type="text"
                        name="location"
                        onChange={this.handleChange}
                        value={this.state.location}
                      ></input>
                    </div>
                    <div className="descriptionInput">
                      <label>Description</label>
                      <input
                        type="text"
                        name="description"
                        onChange={this.handleChange}
                        value={this.state.description}
                      ></input>
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

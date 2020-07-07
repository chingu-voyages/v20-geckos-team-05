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
    isError: false,
    errorMessage: "** Please complete the highlighted sections below **",
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
      isError: false,
      errorTitle: "",
      errorStartDate: "",
      errorEndDate: "",
      errorBegins: "",
      errorEnds: "",
    });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    if (!this.state.title ) {
      this.setState({ isError: true });
    } else {
      const appointment = {
        title: event.target.title.value,
        startDate: `${event.target.startDate.value}T${event.target.begins.value}`,
        endDate: `${event.target.endDate.value}T${event.target.ends.value}`,
        begins: `${event.target.startDate.value}T${event.target.begins.value}`,
        ends: `${event.target.endDate.value}T${event.target.ends.value}`,
        people: event.target.people.value,
        location: event.target.location.value,
        description: event.target.description.value,
        userId: this.props.userId,
      };
      try {
        await fetch(
          process.env.REACT_APP_API_URL || "http://localhost:5000/api",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(appointment),
          }
        );
        console.log(appointment);
        this.setState({ showModal: false });
        this.props.fetchAppointments();
        this.hideModal();
      } catch (error) {
        console.log(error);
      }
    }
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {

    return (
      <div>
        {this.props.isLoggedIn && <button onClick={this.showModal}>Add</button>}
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
              {this.state.isError && (
                <div className="errorMessage">{this.state.errorMessage}</div>
              )}
              <form onSubmit={(e) => this.handleSubmit(e)}>
                <div className="entryContainer">
                  <div className="appointmentTitle">
                    <label>Title *</label>
                    <input
                      className={
                        this.state.isError && !this.state.title ? "error" : ""
                      }
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
                        value={
                          this.state.startDate
                            ? this.state.startDate
                            : `${this.props.currentDay.getFullYear()}-${
                                this.props.currentDay.getMonth() < 9 ? "0" : ""
                              }${this.props.currentDay.getMonth() + 1}-${
                                this.props.currentDay.getDate() < 10 ? "0" : ""
                              }${this.props.currentDay.getDate()}`
                        }
                      ></input>
                    </div>
                    <div className="endDate ">
                      <label>End Date *</label>
                      <input
                        type="date"
                        name="endDate"
                        onChange={this.handleChange}
                        value={
                          this.state.endDate
                            ? this.state.endDate
                            : this.state.startDate
                            ? this.state.startDate
                            : `${this.props.currentDay.getFullYear()}-${
                                this.props.currentDay.getMonth() < 9 ? "0" : ""
                              }${this.props.currentDay.getMonth() + 1}-${
                                this.props.currentDay.getDate() < 10 ? "0" : ""
                              }${this.props.currentDay.getDate()}`
                        }
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
                        value={this.state.begins
                          ? this.state.begins 
                          : `${this.props.currentDay.getHours()}:${
                              this.props.currentDay.getMinutes()}`
                        }
                      ></input>
                    </div>
                    <div className="endTime">
                      <label>Ends *</label>
                      <input
                        type="time"
                        name="ends"
                        onChange={this.handleChange}
                        value={this.state.ends
                          ? this.state.ends
                          : `${this.props.currentDay.getHours()}:${
                              this.props.currentDay.getMinutes() + 30}`
                        }
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

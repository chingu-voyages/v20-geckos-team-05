import React from "react";
import "./EditAppointment.css";

class EditAppointment extends React.Component {
  state = {
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

  updateState = () => {
    this.setState({
      title: this.props.appointment.title,
      startDate: this.props.appointment.startDate.substring(0, 10),
      endDate: this.props.appointment.endDate.substring(0, 10),
      begins: this.props.appointment.begins.substring(11, 16),
      ends: this.props.appointment.ends.substring(11, 16),
      people: this.props.appointment.people,
      location: this.props.appointment.location,
      description: this.props.appointment.description,
    });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    const id = this.props.editId;
    let url = process.env.REACT_APP_API_URL || "http://localhost:5000/api";
    if (!this.state.title) {
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
      };
      try {
        await fetch(`${url}/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(appointment),
        });
        console.log(appointment);
        this.props.onClose();
        this.props.fetchAppointments();
      } catch (error) {
        console.log(error);
      }
    }
  };

  handleDelete = async () => {
    const id = this.props.editId;
    let url = process.env.REACT_APP_API_URL || "http://localhost:5000/api";
    if (window.confirm("sure?")) {
      await fetch(`${url}/${id}`, {
        method: "DELETE",
      });
      await this.props.fetchAppointments();
      this.props.onClose();
    }
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    return (
      <div>
        <div
          className={
            this.props.showEdit ? "modal display-block" : "modal display-none"
          }
        >
          {this.props.showEdit && (
            <section className="modalMain">
              <div className="closeButton" onClick={this.props.onClose}>
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
                {/* <div className="buttonGroup"> */}
                <div className="submitButton">
                  <button>Update</button>
                </div>
                {/* </div> */}
                <div className="deleteButton" onClick={this.handleDelete}>
                  Delete
                </div>
              </form>
            </section>
          )}
        </div>
      </div>
    );
  }
}

export default EditAppointment;

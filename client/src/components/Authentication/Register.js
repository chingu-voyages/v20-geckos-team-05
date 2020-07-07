import React from "react";
import "./Register.css";

class Register extends React.Component {
  state = {
    username: "",
    password: "",
    errors: {},
    registered: false,
  };
  onChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };
  onSubmit = async (e) => {
    e.preventDefault();
    const newUser = {
      username: this.state.username,
      password: this.state.password,
      cookie: null
    };
    try {
      let response = await fetch(
        process.env.REACT_APP_API_REGISTER_URL ||
          "http://localhost:5000/api/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newUser),
        }
      );
      let data = await response.json();
      if (data._id) {
        console.log(data);
        this.setState({ registered: true });
      } else {
        console.log(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  showModal = () => {
    this.setState({ showModal: true });
  };

  hideModal = () => {
    this.setState({
      showModal: false,
      username: "",
      password: "",
    });
  };

  render() {
    return (
      <div>
        {!this.props.isLoggedIn && (
          <div className="signUpButton" onClick={this.showModal}>Sign up</div>
        )}
        <div
          className={
            this.state.showModal &&
            !this.props.isLoggedIn &&
            this.state.registered === false
              ? "modal display-block"
              : "modal display-none"
          }
        >
          {this.state.showModal && (
            <section className="modalMain">
              <div className="closeButton" onClick={this.hideModal}>
                <strong>X</strong>
              </div>
              <div className="formContainer">
                <form noValidate onSubmit={this.onSubmit}>
                <div className="userName formElement">
                  <label htmlFor="username">Username:</label>
                    <input
                      onChange={this.onChange}
                      value={this.state.username}
                      id="username"
                      type="text"
                    />
                  </div>
                  <div className="password formElement">
                  <label htmlFor="password">Password:</label>
                    <input
                      onChange={this.onChange}
                      value={this.state.password}
                      id="password"
                      type="password"
                    />
                  </div>
                  <div className='formElement'>
                    <button type="submit">Sign up</button>
                  </div>
                </form>
              </div>
            </section>
          )}
        </div>
      </div>
    );
  }
}

export default Register;

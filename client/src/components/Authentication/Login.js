import React from "react";
import "./Login.css";

class Login extends React.Component {
  state = {
    username: "",
    password: "",
    showModal: false,
  };
  onChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
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

    // console.log(this.props.isLoggedIn);

    // console.log(this.props.isLoggedIn);
    
    return (
      <div>
        {!this.props.isLoggedIn && (
          <button onClick={this.showModal}>Sign in</button>
        )}
        <div
          className={
            this.state.showModal && !this.props.userId
              ? "modal display-block"
              : "modal display-none"
          }
        >
          {this.state.showModal && (
            <section className="modalMain">
              <div className="closeButton" onClick={this.hideModal}>
                <strong>X</strong>
              </div>

              <form
                noValidate
                onSubmit={(e) =>
                  this.props.onLogin(
                    e,
                    this.state.username,
                    this.state.password
                  )
                }
              >
                <div>
                  <input
                    onChange={this.onChange}
                    value={this.state.username}
                    id="username"
                    type="username"
                  />
                  <label htmlFor="username">Username</label>
                </div>
                <div>
                  <input
                    onChange={this.onChange}
                    value={this.state.password}
                    id="password"
                    type="password"
                  />
                  <label htmlFor="password">Password</label>
                </div>
                <div>
                  <button type="submit">Login</button>
                </div>
              </form>
            </section>
          )}
        </div>
      </div>
    );
  }
}
export default Login;

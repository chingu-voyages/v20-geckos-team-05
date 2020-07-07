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
          <div className="signInButton" onClick={this.showModal}>Sign in</div>
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
              <div className="formContainer">
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
                <div className="userName formElement">
                <label htmlFor="username">Username:</label>
                  <input
                    onChange={this.onChange}
                    value={this.state.username}
                    id="username"
                    type="username"
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
                <input 
                  type="checkbox" 
                  id="remember-me" 
                  name="remember-me" 
                  value="Yes" 
                  checked={this.props.stayLoggedIn}
                  defaultChecked
                  onChange={this.props.handleLoggedInState}
                />
                <label htmlFor="remember-me">Stay logged in?</label>
                </div>
                <div className='formElement'>
                  <button type="submit">Login</button>
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
export default Login;

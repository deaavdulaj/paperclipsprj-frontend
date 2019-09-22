import React, { Component } from "react";
import axios from "axios";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: "",
      username: ""
    };
    this.formDisabled = this.formDisabled.bind(this);
    this.submit = this.submit.bind(this);
  }

  componentDidMount() {
    if (localStorage.getItem("token")) {
      this.props.history.push("/table");
    }
  }

  submit() {
    axios
      .post("http://localhost:3000/api/login", {
        password: this.state.password,
        username: this.state.username
      })
      .then(res => {
        localStorage.setItem("token", res.data.token);
        this.props.history.push("/table");
      })
      .catch(error => console.log(error));
  }

  formDisabled() {
    return !(this.state.username && this.state.password);
  }

  setValue(field, value) {
    this.setState({
      [field]: value
    });
  }

  render() {
    return (
      <div className="main-bg">
        <div className="box-conatiner">
          <div id="a">
            <div className="circle-ripple"></div>
          </div>

          <div className="row">
            <div className="col-md-6 col-sm-6">
              <h1 className="heading-left">
                Login with your github credentials
              </h1>
            </div>
            <div className="col-sm-6 col-md-6">
              <div className="wrap-login100">
                <span className="login100-form-title">Log In</span>
                <div className="login100-form validate-form p-l-55 p-r-55 p-t-20">
                  <div
                    className="wrap-input100 validate-input m-b-16"
                    data-validate="Please enter username"
                  >
                    <input
                      className="input100"
                      type="text"
                      name="username"
                      placeholder="Username"
                      value={this.state.username}
                      onChange={({ target: { value } }) =>
                        this.setValue("username", value)
                      }
                    />
                    <span className="focus-input100"></span>
                  </div>
                  <div
                    className="wrap-input100 validate-input"
                    data-validate="Please enter password"
                  >
                    <input
                      className="input100"
                      type="password"
                      name="pass"
                      value={this.state.password}
                      onChange={({ target: { value } }) =>
                        this.setValue("password", value)
                      }
                      placeholder="Password"
                    />
                    <span className="focus-input100"></span>
                  </div>
                  <br />
                  <div className="container-login100-form-btn">
                    <button
                      type="button"
                      className="login100-form-btn"
                      onClick={this.submit}
                      disabled={this.formDisabled()}
                    >
                      Log in
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

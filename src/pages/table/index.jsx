import React, { Component } from "react";
import axios from "axios";

export default class Table extends Component {
  constructor(props) {
    super(props);
    this.state = {
      repos: []
    };
    this.logout = this.logout.bind(this);
  }
  componentDidMount() {
    if (!localStorage.getItem("token")) {
      this.props.history.push("/");
    } else {
      axios
        .get("http://localhost:3000/api/repos")
        .then(({ data: { repos } }) => {
          this.setState({ repos });
        })
        .catch(err => console.log(err, err.response.data.err));
    }
  }

  logout() {
    localStorage.clear();
    this.props.history.push("/");
  }

  render() {
    return (
      <div className="content">
        <nav className="navbar navbar-light bg-light">
          <a className="navbar-brand">Navbar</a>
          <button
            type="button"
            className="btn btn-outline-success my-2 my-sm-0"
            type="button"
            onClick={this.logout}
          >
            Logout
          </button>
        </nav>
        <div className="container">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Full Name</th>
                <th scope="col">Name</th>
                <th scope="col">Privacy</th>
                <th scope="col">Owner</th>
                <th scope="col">Permissions</th>
              </tr>
            </thead>
            <tbody>
              {this.state.repos.map(repo => (
                <tr key={repo.id}>
                  <th scope="row">{repo.id}</th>
                  <td>
                    <a href={repo.url}>{repo.fullname}</a>
                  </td>
                  <td>{repo.name}</td>
                  <td>{repo.private ? "Private" : "Public"}</td>
                  <td>{repo.owner}</td>
                  <td>{JSON.parse(repo.permissions).join(",")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

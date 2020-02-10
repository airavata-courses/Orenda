import React, { Component } from "react";
import DashNav from "./dashboardnav";

export default class SessionView extends Component {
  render() {
    return (
      <div>
        <DashNav />

        <div className="mt-5 p-4">session</div>
      </div>
    );
  }
}

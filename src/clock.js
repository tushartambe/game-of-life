import React from "react";
import ReactDOM from "react-dom";

class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = { time: new Date().toTimeString(), milisecs: 1 };
    this.tick = this.tick.bind(this);
  }

  componentDidMount() {
    this.timerID = setInterval(this.tick, 1);
  }

  tick() {
    this.setState(state => ({
      time: new Date().toTimeString(),
      milisecs:
        state.milisecs > 1000 ? (state.milisecs = 1) : state.milisecs + 1
    }));
  }

  render() {
    return (
      <div>
        <h1>
          {this.state.time}:{this.state.milisecs}
        </h1>
      </div>
    );
  }
}
 exports default Clock;
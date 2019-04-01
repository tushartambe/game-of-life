import React from "react";
import gameOfLife from "./gameOfLife";

class GameTable extends React.Component {
  constructor(props) {
    super(props);
    this.table = [];
    this.state = { aliveCells: [] };
    this.bounds = { topLeft: [0, 0], bottomRight: [16, 16] };

    this.gameOfLife = gameOfLife;

    this.createTable = this.createTable.bind(this);
    this.placeInitialAliveCells = this.placeInitialAliveCells.bind(this);
    this.play = this.play.bind(this);
    this.nextGeneration = gameOfLife.nextGeneration.bind(this);
    this.displayNextGeneration = this.displayNextGeneration.bind(this);
  }

  placeInitialAliveCells(event) {
    let cellId = event.target.id;
    let cell = document.getElementById(cellId);
    this.state.aliveCells.push(cellId.split("_").map(x => +x));
    cell.style.backgroundColor = "orange";
  }

  displayNextGeneration() {
    let nextGenerationCells = this.nextGeneration(
      this.state.aliveCells,
      this.bounds
    );
    console.log(this.state.aliveCells);
    this.state.aliveCells.forEach(cell => {
      document.getElementById(cell.join("_")).style.background = "lightgray";
    });

    nextGenerationCells.forEach(cell => {
      document.getElementById(cell.join("_")).style.background = "orange";
    });
    this.setState(state => (state.aliveCells = nextGenerationCells));
  }

  play() {
    setInterval(this.displayNextGeneration, 1000);
  }

  createTable() {
    this.table = [];
    for (let index = 0; index < this.props.size; index++) {
      let row = [];
      for (let innerIndex = 0; innerIndex < this.props.size; innerIndex++) {
        let cellId = index + "_" + innerIndex;
        row.push(
          <td onClick={this.placeInitialAliveCells} id={cellId} key={cellId} />
        );
      }
      this.table.push(<tr key={index}>{row}</tr>);
    }
    return <tbody>{this.table}</tbody>;
  }

  render() {
    return (
      <div>
        <div class="heading">
          <h2>
            Welcome to <em>GAME OF LIFE</em>
          </h2>
        </div>
        <div class="table-view">
          <table>{this.createTable()}</table>
        </div>
        <div class="start-button">
          <button onClick={this.play}>Start</button>
        </div>
      </div>
    );
  }
}

export default GameTable;

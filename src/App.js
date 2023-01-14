import React, { Component } from 'react';
import Timer from './Timer'
import Controls from './Controls'

class App extends Component {

  state = {
    updateInterval: 1,
    timerIDs: []
  };

  componentDidMount() {
    this.handleAddTimer();
  };

  render() {
    console.log(this.state.timerIDs);
    return (
      <div className="App">
        <header>
          <h1>MultiTimer</h1>
          <Controls
            updateIntervalSetting={this.updateIntervalSetting}
            updateInterval={this.state.updateInterval}
            handleAddTimer={this.handleAddTimer}
          />
        </header>
        <div className="TimerGrid">
          {this.renderTimers()}
        </div>
      </div>
    );
  };

  renderTimers = () => {
    return this.state.timerIDs.map(({ id, updateInterval }) => {
      return (
        <Timer
          key={id}
          id={id}
          removeTimer={this.removeTimer}
          updateInterval={updateInterval}
        />
      );
    });
  };

  // adds a random number for timer ID
  handleAddTimer = () => {
    this.setState((prevState) => {
      return {
        timerIDs: [
          ...prevState.timerIDs,
          {
            updateInterval: prevState.updateInterval,
            id: Date.now()
          }
        ]
      };
    });
  };
  
  removeTimer = (id) => {
    this.setState((prevState) => {
      return {
        timerIDs: prevState.timerIDs.filter((timer) => timer.id !== id)
      };
    });
  };

  updateIntervalSetting = (increment) => {
    this.setState((prevState) => {
      if (prevState.updateInterval + increment <= 1) { 
        return { updateInterval: 1 };
      };
      return { updateInterval: prevState.updateInterval + increment };
    });
  };

};

export default App;
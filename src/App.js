import "./styles.scss";

import * as React from "react";

import SetTimer from "./components/SetTimer";
import Controls from "./components/Controls";
import Clock from "./components/Clock";

const audio = document.getElementById("beep");

class App extends React.Component {
  constructor(props) {
    super(props);
    this.loop = undefined;
  }

  state = {
    breakCount: 5,
    sessionCount: 25,
    clockCount: 25 * 60,
    currentTimer: "Session",
    isPlay: false
  };

  componentUnmount = () => {
    clearInterval(this.loop);
  };

  convertTimer = (count) => {
    let minutes = Math.floor(count / 60);
    let seconds = count % 60;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    return `${minutes}:${seconds}`;
  };

  handlePlayPause = () => {
    const { isPlay } = this.state;
    if (isPlay) {
      this.setState({
        isPlay: false
      });
      clearInterval(this.loop);
    } else {
      this.setState({
        isPlay: true
      });

      this.loop = setInterval(() => {
        const {
          clockCount,
          currentTimer,
          breakCount,
          sessionCount
        } = this.state;

        if (clockCount === 0) {
          this.setState({
            currentTimer: currentTimer === "Session" ? "Break" : "Session",
            clockCount:
              currentTimer === "Session" ? breakCount * 60 : sessionCount * 60
          });
          audio.play();
        } else {
          this.setState({
            clockCount: clockCount - 1
          });
        }
      }, 1000);
    }
  };

  handleReset = () => {
    this.setState({
      breakCount: 5,
      sessionCount: 25,
      clockCount: 25 * 60,
      currentTimer: "Session",
      isPlay: false
    });
    clearInterval(this.loop);
    audio.pause();
    audio.currentTime = 0;
  };

  handleBreakDecrement = () => {
    const { breakCount, isPlay, currentTimer } = this.state;
    if (breakCount > 1) {
      if (!isPlay && currentTimer === "Break") {
        this.setState({
          breakCount: breakCount - 1,
          clockCount: (breakCount - 1) * 60
        });
      } else {
        this.setState({
          breakCount: breakCount - 1
        });
      }
    }
  };

  handleBreakIncrement = () => {
    const { breakCount, isPlay, currentTimer } = this.state;
    if (breakCount < 60) {
      if (!isPlay && currentTimer === "Break") {
        this.setState({
          breakCount: breakCount + 1,
          clockCount: (breakCount + 1) * 60
        });
      } else {
        this.setState({
          breakCount: breakCount + 1
        });
      }
    }
  };

  handleSessionDecrement = () => {
    const { sessionCount, isPlay, currentTimer } = this.state;
    if (sessionCount > 1) {
      if (!isPlay && currentTimer === "Session") {
        this.setState({
          sessionCount: sessionCount - 1,
          clockCount: (sessionCount - 1) * 60
        });
      } else {
        this.setState({
          sessionCount: sessionCount - 1
        });
      }
    }
  };

  handleSessionIncrement = () => {
    const { sessionCount, isPlay, currentTimer } = this.state;
    if (sessionCount < 60) {
      if (!isPlay && currentTimer === "Session") {
        this.setState({
          sessionCount: sessionCount + 1,
          clockCount: (sessionCount + 1) * 60
        });
      } else {
        this.setState({
          sessionCount: sessionCount + 1
        });
      }
    }
  };

  render() {
    const {
      breakCount,
      sessionCount,
      clockCount,
      currentTimer,
      isPlay
    } = this.state;

    const breakProps = {
      idTitle: "break-label",
      idButtonDec: "break-decrement",
      idButtonInc: "break-increment",
      idCount: "break-length",
      title: "Break Length",
      count: breakCount,
      handleDecrement: this.handleBreakDecrement,
      handleIncrement: this.handleBreakIncrement
    };

    const sessionProps = {
      idTitle: "session-label",
      idButtonDec: "session-decrement",
      idButtonInc: "session-increment",
      idCount: "session-length",
      title: "Session Length",
      count: sessionCount,
      handleDecrement: this.handleSessionDecrement,
      handleIncrement: this.handleSessionIncrement
    };

    return (
      <div>
        <div className="main-title flex">Pomodoro (25 + 5) Clock </div>
        <div className="flex">
          <SetTimer {...breakProps} />
          <SetTimer {...sessionProps} />
        </div>
        <div className="clock-container">
          <Clock
            currentTimer={currentTimer}
            convertTimer={this.convertTimer(clockCount)}
          />
          <Controls
            handlePlayPause={this.handlePlayPause}
            isPlay={isPlay}
            handleReset={this.handleReset}
          />
        </div>
      </div>
    );
  }
}

export default App;

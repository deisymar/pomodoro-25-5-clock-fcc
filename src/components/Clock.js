const Clock = ({ currentTimer, convertTimer }) => (
  <div>
    <h1 id="timer-label">{currentTimer}</h1>
    <span id="time-left">{convertTimer}</span>
  </div>
);

export default Clock;

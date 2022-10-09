import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown, faArrowUp } from "@fortawesome/free-solid-svg-icons";

const SetTimer = (props) => (
  <div className="timer-container">
    <h2 id={props.idTitle}>{props.title}</h2>
    <div className="flex action-wrapper">
      <button id={props.idButtonDec} onClick={props.handleDecrement}>
        {" "}
        <FontAwesomeIcon icon={faArrowDown} />
      </button>
      <span id={props.idCount}>{props.count}</span>
      <button id={props.idButtonInc} onClick={props.handleIncrement}>
        <FontAwesomeIcon icon={faArrowUp} />
      </button>
    </div>
  </div>
);

export default SetTimer;

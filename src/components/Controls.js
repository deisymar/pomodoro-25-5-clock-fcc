import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faPause, faSync } from "@fortawesome/free-solid-svg-icons";

const Controls = (props) => {
  let iconFont = props.isPlay ? faPause : faPlay;
  return (
    <div className="flex">
      <button id="start_stop" onClick={props.handlePlayPause}>
        <FontAwesomeIcon icon={iconFont} />
      </button>
      <button id="reset" onClick={props.handleReset}>
        <FontAwesomeIcon icon={faSync} />
      </button>
    </div>
  );
};

export default Controls;

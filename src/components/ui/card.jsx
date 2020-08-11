import React from "react";

const Card = (props) => {
  return (
    <div className="player_card_wrapper">
      <div
        className="player_card_thmb"
        style={{ background: `#F2F9FF url(${props.bck})` }}
      ></div>
      <div className="player_card_nfo">
        <div className="player_card_number">{props.number}</div>
        <div className="player_card_name">
          <span>{props.name}</span>
          <span>{props.lname}</span>
        </div>
      </div>
    </div>
  );
};

export default Card;

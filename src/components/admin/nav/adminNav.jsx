import React from "react";
import { Link } from "react-router-dom";
import { ListItem } from "@material-ui/core";
import { auth } from "../../../firebase";

const AdminNav = () => {
  const links = [
    { title: "Matches", linkTo: "/admin_matches" },
    { title: "Add Match", linkTo: "/admin_matches/add_match" },
    { title: "Players", linkTo: "/admin_players" },
    { title: "Add Player", linkTo: "/admin_players/add_player" },
  ];

  const style = {
    color: "#FFFFFF",
    fontWeight: "300",
    borderBottom: "1px solid #353535",
  };

  const Items = () =>
    links.map((link) => (
      <Link key={link.title} to={link.linkTo}>
        <ListItem button style={style}>
          {link.title}
        </ListItem>
      </Link>
    ));

  const logoutHandler = () => {
    auth
      .signOut()
      .then(() => {
        console.log("Signed Out");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      {Items()}
      <ListItem button onClick={() => logoutHandler()} style={style}>
        Log out
      </ListItem>
    </div>
  );
};

export default AdminNav;

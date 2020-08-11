import React from "react";
import Layout from "./hoc/layout";
import { Switch } from "react-router-dom";

import Home from "./components/home/home";
import SignIn from "./components/signin/signin";
import Team from "./components/team/team";
import Match from "./components/match/match";
import NotFound from "./components/ui/notFound";

//Admin
import Admin from "./components/admin/admin";
import AdminMatches from "./components/admin/matches/matches";
import AddEditMatch from "./components/admin/matches/addEditMatche";
import AdminPlayers from "./components/admin/players/players";
import AddEditPlayer from "./components/admin/players/addEditPlayer";

import PrivateRoute from "./components/authRoutes/privateRoutes";
import PublicRoute from "./components/authRoutes/publicRoutes";
import Matches from "./components/home/matches/matches";

function App(props) {
  return (
    <Layout>
      <Switch>
        <PrivateRoute
          {...props}
          path={`/admin_players/add_player`}
          exact
          component={AddEditPlayer}
        />
        <PrivateRoute
          {...props}
          path={`/admin_players/edit_player/:id`}
          exact
          component={AddEditPlayer}
        />
        <PrivateRoute
          {...props}
          path={`/admin_players`}
          exact
          component={AdminPlayers}
        />
        <PrivateRoute
          {...props}
          path={`/admin_matches/add_match`}
          exact
          component={AddEditMatch}
        />
        <PrivateRoute
          {...props}
          path={`/admin_matches/edit_match/:id`}
          exact
          component={AddEditMatch}
        />
        <PrivateRoute {...props} path="/admin" exact component={Admin} />
        <PrivateRoute
          {...props}
          path="/admin_matches"
          exact
          component={AdminMatches}
        />
        <PublicRoute
          {...props}
          exact
          restricted={false}
          path="/"
          component={Home}
        />
        <PublicRoute
          {...props}
          exact
          restricted={false}
          path="/team"
          component={Team}
        />
        <PublicRoute
          {...props}
          exact
          restricted={false}
          path="/matches"
          component={Match}
        />
        <PublicRoute
          {...props}
          exact
          restricted={true}
          path="/signin"
          component={SignIn}
        />
        <PublicRoute {...props} restricted={false} component={NotFound} />
      </Switch>
    </Layout>
  );
}

export default App;

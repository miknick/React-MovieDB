import Signup from "./Signup";
import { AuthProvider } from "../Contexts/AuthContext";
import Home from "./Home"
import BasicNavbar from "./BasicNavbar"
import { Route, Switch } from "react-router";
import Login from "./Login";
import Account from "./Account";
import MovieDetails from "./MovieDetails";
import SearchResults from "./SearchResults"
import Watchlist from "./Watchlist";
function App() {
  return (
    <AuthProvider>
      <BasicNavbar></BasicNavbar>
      <Switch>
        <Route exact path="/">
          <Home></Home>

        </Route>
        <Route path="/signup">
          <Signup ></Signup>
        </Route>
        <Route path="/login">
          <Login ></Login>
        </Route>
        <Route path="/account">
          <Account ></Account>
        </Route>
        <Route path="/details-:id">
          <MovieDetails></MovieDetails>
        </Route>
        <Route path="/search-:movie">
          <SearchResults></SearchResults>
        </Route>
        <Route path="/watchlist">
          <Watchlist></Watchlist>
        </Route>
      </Switch>

    </AuthProvider>

  );
}

export default App;

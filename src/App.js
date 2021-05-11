import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import TVShows from "./Pages/Home/TVShows";
import Header from "./components/Header/Header";
import Movies from "./Pages/Home/Movies";
import MovieDetails from "./Pages/Details/MovieDetails";
import TVShowsDetails from "./Pages/Details/TVShowsDetails";


function App() {
  return (
    <Router>
      <div className="app">
        <Header />
        <Switch>
          <Route path="/" exact component={TVShows} />
          <Route path="/Movies" component={Movies} />
          <Route path="/MovieDetails/:id" component={MovieDetails} />
          <Route path="/TVShowsDetails/:id" component={TVShowsDetails} />

        </Switch>
      </div>
    </Router>
  );
}

export default App;

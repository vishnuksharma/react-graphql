import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import Cards from './components/Cards';
import Home from "./components/Home";
import NoMatch from './components/NoMatch';


const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/cards" element={<Cards/>}>
            <Route path=":slug" element={<Cards />} />  
          </Route>
          <Route path="/" element={<Home />}/>
          <Route path="*" element={<NoMatch />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;

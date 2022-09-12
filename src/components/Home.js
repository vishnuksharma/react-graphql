import { Link } from "react-router-dom"

const Home = () => {
    return (
        <div>
          <h2>Welcome to Sorare home page. </h2>
          <div><Link to="/cards/marco-verratti-2021-rare-1">Go to Marco Card</Link></div>
        </div>
      );
}

export default Home;
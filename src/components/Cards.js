import { useParams } from "react-router-dom";
import './Card.scss';
import Card from "./Card";
import NoMatch from "./NoMatch";


const Cards = ()=> {
    const { slug } = useParams();
    // console.log(slug)
    const slugParams = slug?.split(",");


  const displayCard = () => {
      if (!slugParams) return <NoMatch />
      return (slugParams || []).map((slug) => {
        return (
            slug && <Card key={slug} slugParam={[slug]} />
        )
      })
  }
    
    return(
        <div className="cards">
            <div className="card-wrapper">
                {displayCard()}
            </div>
        </div>
    );
}

export default Cards;
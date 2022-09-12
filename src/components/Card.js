import axios from "axios";
import { createRef, useEffect, useState } from "react";
import { getCardsQuery } from "../graphql/query/CardQuery";

import { FlagIcon } from 'react-flag-kit';
import { FaSave } from 'react-icons/fa';
import html2canvas from 'html2canvas';
import NoMatch from "./NoMatch";

const Card = ({slugParam}) => {
    const [reveal, setReveal] = useState(false);
    const [cardData, setCardData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (reveal) {
            setIsLoading(true)
            axios
              .post('/graphql', {
                query: getCardsQuery(slugParam),
              })
              .then((p) => {
                setCardData(p.data?.data?.cards[0]);
                setIsLoading(false);
              })
              .catch((error) => {
                if (error.response) {
                  console.log(error.response.data);
                }
              });
        }
      }, [reveal,slugParam]);

      const revealButtonHandler = (slug) => {
        setReveal(true);
      }

    const myRef = createRef();
    const getBg = () => {
        const endColor = (() => {
        switch (cardData?.rarity) {
            case 'rare':
            return 'rgba(248,49,47,1)';
            case 'super-rare':
            return 'rgba(0,116,186,1)';
            case 'unique':
            return 'rgba(250,235,215,1)';
            default:
            return 'rgba(252,213,63,1)';
        }
        })();
        return `linear-gradient(145deg, rgba(0,0,0,1) 0%, rgba(30,30,30,0.5) 0%, ${endColor} 100%)`;
    };

    const downloadImage = (blob, fileName) => {
        const fakeElement = window.document.createElement('a');
        fakeElement.style = 'display:none;';
        fakeElement.download = fileName;

        fakeElement.href = blob;

        document.body.appendChild(fakeElement);
        fakeElement.click();
        document.body.removeChild(fakeElement);

        fakeElement.remove();
    };

    // Will save only available images as the CORS one won't be able to load locally
    const saveAsImage = async () => {
        const canvas = await html2canvas(myRef.current, { useCORS: true, proxy: 'https://api.sorare.com/' });
        const image = canvas.toDataURL('image/png', 1.0);
        downloadImage(image, cardData.slug);
    };

    if (reveal && !isLoading && !cardData) {
        return <NoMatch />;
    }

      return (
        <div className="card-container">
            {reveal && !isLoading ? (
                <div className="real-card">
                    <div ref={myRef} className="card-image" style={{ background: getBg() }}>
                    <div className="top-detail">
                        <div>
                            <div>{cardData?.season?.name}</div>
                            <b>{cardData?.rarity?.toUpperCase()}</b>
                        </div>
                        <div>
                            <div>
                            <img alt={cardData?.team?.name} src={cardData?.team?.pictureUrl} width="28" height="28" />
                            </div>
                            <div>
                            <div className="align-center">{cardData.shirtNumber}</div>
                            </div>
                        </div>
                    </div>
                    <div className="card-details">
                    <div>
                        <div className="player-img card"/>
                    </div>
                    <div className="card-attributes">
                        <div className="player-name">
                        <h3>{cardData?.player?.displayName}</h3>
                        </div>
                        <div className="bottom-detail">
                            <div className="detail-col">
                                <div>Age</div>
                                <b className="detail-value">{cardData.age}</b>
                            </div>
                            <div className="detail-col">
                                <div>Position</div>
                                <b className="detail-value">{cardData.position}</b>
                            </div>
                            <div className="detail-col">
                                <div>Country</div>
                                <div className="detail-value">
                                    {cardData?.player && <FlagIcon style={{ borderRadius: '100%' }} code={cardData?.player?.country?.code.toUpperCase()} size={18} />}
                                </div>
                            </div>
                        </div>
                    </div>
                    </div>
                </div>
                <div title="Save as Image" className="save-button" onClick={() => saveAsImage()}>
                    <FaSave size="24px" />
                </div>
                </div>
            ): (
                <div className={`card-placeholder ${!reveal ? 'is-shown' : 'hide'}`}>
                    <div className="card">non</div>
                    <div className="reveal-btn">
                        <button onClick={revealButtonHandler}>
                            Reveal Card
                        </button>
                    </div>
                </div>
            )}
        </div>
      )
}




export default Card;
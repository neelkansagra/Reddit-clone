import './Reel.css'
import firstImage from '../../assests/Icons/first.webp';


const Reel = ({ReelImg, ReelDesc, ReelTitle, SubName, SubLogo}) => {
    return (
        <div className="Cards">
                            <li style={{margin: '0'}}>
                                <a className="cardLink">
                                    <img loading="lazy" src={ReelImg} sizes="280px" alt="r/popheads - Grammy Nominations 2025: See the Full List Here" className="cardImg" />
                                    <div className="cardInfo">
                                        <h2 className="cardTitle">{ReelTitle}</h2>
                                        <p className="cardDesc">{ReelDesc}</p>
                                        <div className="cardLogo">
                                            <span className="cardSubredditIcon">
                                                <img src={SubLogo} alt="r/popheads icon" className="" width="24" height="24" style={{color: "#F48E9B", backgroundColor: "#F48E9B",width: "24px",height: "24px", borderRadius: "999px"}} loading="lazy" />
                                            </span>
                                            <span className="cardSubName">{SubName}
                                            </span>
                                            <span className="andMore">and more
                                            </span>
                                        </div>
                                    </div>
                                </a>
                            </li>
        </div>
    )
};
export default Reel;
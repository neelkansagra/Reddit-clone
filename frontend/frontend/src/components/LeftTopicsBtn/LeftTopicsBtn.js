import './LeftTopicsBtn.css'

const LeftTopicsBtn = ({Text, Icon}) =>{

    return (
        <div className="Home">
            <li className="listHome">
                <a className="linkHome">
                    <span className="HomeMain">
                        <span className="HomeIcon">
                            <Icon />
                        </span>
                        <span className="HomeText">
                            <span>
                                {Text}
                            </span>
                        </span>
                    </span>
                </a>
            </li>
        </div>
        
    )
}
export default LeftTopicsBtn;
/* 
<div className="Home">
                                <li className="listHome">
                                    <a className="linkHome">
                                        <span className="HomeMain">
                                            <span className="HomeIcon">
                                                
                                            </span>
                                            <span className="HomeText">
                                                <span>
                                                    Popular
                                                </span>
                                            </span>
                                        </span>
                                    </a>
                                </li>
                            </div>
*/
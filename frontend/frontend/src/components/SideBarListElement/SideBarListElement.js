import "./SideBarListElement.css"

const SideBarListElement = ({SubImg, SubName, MemInfo}) => {
    return (
        <ul style={{marginBottom: '1rem',padding: '0'}}>
                                <li className="SubbItem">
                                    <a className="SubbLink">
                                        <span className="SubbMainSpan">
                                            <span className="SubbImgSpan">
                                            <img src={SubImg} alt="r/NoStupidQuestions icon" className="" width="32" height="32" style={{width: "32px",height: "32px"}} loading="lazy" />

                                            </span>
                                            <span className="SubbTextSpan">
                                                <span className="SubbText">{SubName}</span>
                                                <span className="SubbMem">{MemInfo} members</span>
                                            </span>
                                        </span>
                                    </a>
                                </li>
                            </ul>
    )
}
export default SideBarListElement;
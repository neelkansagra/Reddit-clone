import React from "react";
import './LeftScrollBar.css';
import LeftTopicsBtn from "../../components/LeftTopicsBtn/LeftTopicsBtn";
import LeftTopicsBtnWithDropDown from "../../components/LeftTopicsBtnWithDropDown/LeftTopicsBtnWithDropDown";
import {ReactComponent as HomeSvg} from '../../assests/images/Home.svg'
import {ReactComponent as PopularSvg} from '../../assests/images/Popular.svg'
import {ReactComponent as InternetSvg} from '../../assests/images/InternetIcon.svg'
import {ReactComponent as GamesSvg} from '../../assests/images/Games.svg'
import {ReactComponent as MoviesTvSvg} from '../../assests/images/MoviesTv.svg'
import {ReactComponent as PopSvg} from '../../assests/images/PopCulture.svg'
import {ReactComponent as QAIconSvg} from '../../assests/images/QAIcon.svg'
import {ReactComponent as TechnologySvg} from '../../assests/images/Technology.svg'
import {ReactComponent as AbtSvg} from '../../assests/images/AboutReddit.svg'
import {ReactComponent as Help} from "../../assests/images/Help.svg"
import {ReactComponent as Communities} from "../../assests/images/Communities.svg"
import {ReactComponent as CtntPolicy} from "../../assests/images/CtntPolicy.svg"
import {ReactComponent as Advertise} from "../../assests/images/Advertise.svg"
import {ReactComponent as Blog} from "../../assests/images/Blog.svg"
import {ReactComponent as BOFR} from "../../assests/images/BOFR.svg"
import {ReactComponent as Careers} from "../../assests/images/Careers.svg"
import {ReactComponent as Press} from "../../assests/images/Press.svg"
import {ReactComponent as PrivacyPolicy} from "../../assests/images/PrivacyPolicy.svg"
import {ReactComponent as Topics} from "../../assests/images/Topics.svg"
import {ReactComponent as UserAgreement} from "../../assests/images/UserAgreement.svg"    

const LeftScrollBar = () =>{
    return(
        <div className="leftSideBar">
            <div className="leftMain">
                <nav className="leftSub">
                    <nav className="topMenu">
                        <div style={{display: 'block'}}>
                            <LeftTopicsBtn Text={"Home"} Icon={HomeSvg} />
                            <LeftTopicsBtn Text={"Popular"} Icon={PopularSvg} />
                        </div>
                        <hr className="endLine" />
                    </nav>
                    <nav className="BottomMenu">
                        <hr className="endLine" />
                        <div className="topics">
                            <li className="LiTopic">
                                    <div className="LiDiv">
                                        <span className="SpanTopic">
                                            <span>TOPICS</span>
                                        </span>
                                        <span className="downButton">
                                            <span>
                                                <svg rpl="" fill="currentColor" height="20" icon-name="caret-down-outline" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg"><path d="M10 13.125a.624.624 0 0 1-.442-.183l-5-5 .884-.884L10 11.616l4.558-4.558.884.884-5 5a.624.624 0 0 1-.442.183Z"></path></svg>
                                            </span>
                                        </span>
                                    </div>
                            </li>
                            {/* <div className="topicsOptions">

                            </div> */}
                        </div>
                        <div>
                            <LeftTopicsBtnWithDropDown Text={"Internet Culture (Viral)"} Icon={InternetSvg}  />
                            <LeftTopicsBtnWithDropDown Text={"Games"} Icon = {GamesSvg} />
                            <LeftTopicsBtnWithDropDown Text={"Q&A"} Icon = {QAIconSvg} />
                            <LeftTopicsBtnWithDropDown Text={"Technology"} Icon = {TechnologySvg} />
                            <LeftTopicsBtnWithDropDown Text={"Pop Culture"} Icon = {PopSvg} />
                            <LeftTopicsBtnWithDropDown Text={"Movies & TV"} Icon = {MoviesTvSvg} />
                            <div className="seeMore">
                                <div className="seeMoreMain">
                                    <button className="seeMoreBtn">
                                        <span className="seeMoreSpan">
                                            <span style={{gap:'0.5rem'}}>See more</span>
                                        </span>
                                    </button>
                                </div>
                            </div>
                        </div>
                        
                        <hr className="endLine" />
                        <hr className="endLine" />
                        
                        <div className="topics">
                            <li className="LiTopic">
                                    <div className="LiDiv">
                                        <span className="SpanTopic">
                                            <span>RESOURCES</span>
                                        </span>
                                        <span className="downButton">
                                            <span>
                                                <svg rpl="" fill="currentColor" height="20" icon-name="caret-down-outline" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg"><path d="M10 13.125a.624.624 0 0 1-.442-.183l-5-5 .884-.884L10 11.616l4.558-4.558.884.884-5 5a.624.624 0 0 1-.442.183Z"></path></svg>
                                            </span>
                                        </span>
                                    </div>
                            </li>
                            {/* <div className="topicsOptions">

                            </div> */}
                        </div>

                        <div>
                            <LeftTopicsBtn Text={"About Reddit"} Icon={AbtSvg} />
                            <LeftTopicsBtn Text={"Advertise"} Icon={Advertise} />
                            <LeftTopicsBtn Text={"Help"} Icon={Help} />
                            <LeftTopicsBtn Text={"Blog"} Icon={Blog} />
                            <LeftTopicsBtn Text={"Careers"} Icon={Careers} />
                            <LeftTopicsBtn Text={"Press"} Icon={Press} />
                            <hr className="endLine" />
                        </div>
                        <div>
                            <LeftTopicsBtn Text={"Communities"} Icon={Communities} />
                            <LeftTopicsBtn Text={"Best of Reddit"} Icon={BOFR} />
                            <LeftTopicsBtn Text={"Topics"} Icon={Topics} />
                            <hr className="endLine" />
                        </div>
                        <div>
                            <LeftTopicsBtn Text={"Content Policy"} Icon={CtntPolicy} />
                            <LeftTopicsBtn Text={"Privacy Policy"} Icon={PrivacyPolicy} />
                            <LeftTopicsBtn Text={"User Agreement"} Icon={UserAgreement} />
                        </div>
                    </nav>
                </nav>

                <div className="RightsRes">
                    <a className="linkRights" href="https://redditinc.com">Reddit, Inc. © 2024. All rights reserved.</a>
                </div>
                
            </div>
        </div>
    )
};

export default LeftScrollBar;
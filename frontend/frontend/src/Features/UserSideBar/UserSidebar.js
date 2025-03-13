import "./UserSideBar.css"
import BannerImg from "../../assests/Icons/UserBanner.webp"
const UserSidebar = () =>{
    return (
        <div className="SubredditBar">
                        <div className="ImgPlaceholder">
                            <div style = {{backgroundImage: BannerImg}} className="BannerImgClass">
                            </div>
                        </div>
                        <div className="UserInfo">
                            <div className="UsernamePlaceholder">
                                <h2 className="UserNameClass">Username</h2>
                                <button className="userMoreOptionsBtn">
                                        <span className="userMoreOprtionsSub">
                                                <svg height="12" fill="currentColor" viewBox="0 0 20 20" width="12" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M6 10a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm6 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Z"></path>
                                                </svg>
                                        </span>
    
                                </button>
                            </div>
                            <div className="FollowBtnPlaceholder">
                                <div className="InsideFollowBtn">
                                    <div className="FollowBtn">
                                        <button className="FollowBtnLayout">
                                            <span className="FollowBtnSpan">
                                                <span className="FollowBtnIcon">
                                                    <svg fill="currentColor" height="16" icon-name="join-outline" viewBox="0 0 20 20" width="16" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M10.625 9.375H14v1.25h-3.375V14h-1.25v-3.375H6v-1.25h3.375V6h1.25v3.375ZM20 10A10 10 0 1 1 10 0a10.011 10.011 0 0 1 10 10Zm-1.25 0A8.75 8.75 0 1 0 10 18.75 8.76 8.76 0 0 0 18.75 10Z"></path>
                                                    </svg>
                                                </span>
                                                <span className="FollowBtnText">
                                                    Follow
                                                </span>
                                            </span>
                                        </button>
                                    </div>
                                    <div className="StartChatBtn">
                                        <button className="StartChatLayout">
                                            <span className="StartChatBtnSpan">
                                                <span className="StartChatIcon">
                                                        <svg fill="currentColor" height="16" viewBox="0 0 20 20" width="16" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M11.61 19.872a10.013 10.013 0 0 0 6.51-4.035A9.999 9.999 0 0 0 12.275.264c-1.28-.3-2.606-.345-3.903-.132a10.05 10.05 0 0 0-8.25 8.311 9.877 9.877 0 0 0 1.202 6.491l-1.24 4.078a.727.727 0 0 0 .178.721.72.72 0 0 0 .72.19l4.17-1.193A9.87 9.87 0 0 0 9.998 20c.54 0 1.079-.043 1.612-.128ZM1.558 18.458l1.118-3.69-.145-.24A8.647 8.647 0 0 1 1.36 8.634a8.778 8.778 0 0 1 7.21-7.27 8.765 8.765 0 0 1 8.916 3.995 8.748 8.748 0 0 1-2.849 12.09 8.763 8.763 0 0 1-3.22 1.188 8.68 8.68 0 0 1-5.862-1.118l-.232-.138-3.764 1.076ZM6.006 9a1.001 1.001 0 0 0-.708 1.707A1 1 0 1 0 6.006 9Zm4.002 0a1.001 1.001 0 0 0-.195 1.981 1 1 0 1 0 .195-1.98Zm4.003 0a1.001 1.001 0 1 0 0 2.003 1.001 1.001 0 0 0 0-2.003Z"></path>
                                                        </svg>
                                                </span>
                                                <span className="StartChatText">
                                                    Start Chat
                                                </span>
                                            </span>
                                        </button>
                                    </div>
                                </div>

                            </div>
                            <div className="DescriptionPlaceholder">
                                <p className="DescText">
                                    Apps Developer
                                </p>
                                <hr className="endLine2"></hr>

                            </div>
                            <div className="StatisticsPlaceholder">
                                <div className="postKarmaPlc">
                                    <p className="statsText">
                                        207,075
                                    </p>
                                    <p className="statsDesc">
                                        Post karma
                                    </p>


                                </div>
                                <div className="commentKarmaPlc">
                                    <p className="statsText">
                                        6,500
                                    </p>
                                    <p className="statsDesc">
                                        Comment karma
                                    </p>                                    
                                </div>
                                <div className="cakeDayPlc">
                                    <p className="statsText">
                                        Jun 1, 2018
                                    </p>
                                    <p className="statsDesc">
                                        Cake day
                                    </p>
                                    
                                </div>
                            </div>
                            <hr className="endLine2"></hr>
                        </div>
        </div>
    )
}
export default UserSidebar;
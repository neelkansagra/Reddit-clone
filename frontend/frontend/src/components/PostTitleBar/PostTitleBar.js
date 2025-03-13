import "./PostTitleBar.css"

const PostTitleBar = ( {SubLogo, SubName, TimeString} ) =>{
    return (
        <span className="PostTopBar">
                                <span className="PostTopSubInfo">
                                    <a className="PostLink">
                                        <span className="PostSubbImg">
                                            <img src={SubLogo} alt="r/japanlife icon" width="24" height="24" style={{width: "24px",height: "24px"}} loading="lazy" />
                                        </span>
                                        <span>
                                            {SubName}
                                        </span>
                                    </a>
                                    <span className="PostTime">
                                        <span>&#x2022;</span>
                                        <time dateTime="2024-11-09T05:44:09.915Z" title="Saturday, November 9, 2024 at 11:14:09 AM GMT+5:30">{TimeString}. ago</time>
                                    </span>
                                </span>
                                <span className="PostTopJoinBtn">
                                    <span className="PostJoinBtn">
                                        <button className="JoinBtnStyle" style={{lineHeight: '1', height: '24px'}}>Join</button>
                                    </span>
                                    <span style={{ display:'flex', alignContent: 'center'}}>
                                        <button className="PostTopBarOptions JoinBtnStyle">
                                        <span><svg rpl="" fill="currentColor" height="16" viewBox="0 0 20 20" width="16" xmlns="http://www.w3.org/2000/svg"><path d="M6 10a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm6 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Z"></path></svg></span>
                                        </button>
                                    </span>
                                </span>
                            </span>
    )
}
export default PostTitleBar;
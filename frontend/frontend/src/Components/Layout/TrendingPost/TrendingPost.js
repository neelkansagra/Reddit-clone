import "./TrendingPost.css"

let TrendingPost = ({ PostData }) => {

    return (
        <li className="trendingPostLi">
            <a href="/" className="trendingPostAnchor">
            <span className="PostDescription">
                <span className="PostTitle">
                    { PostData.PostTitle }
                </span>
                <span className="PostInfo">
                    { PostData.PostDescription }
                </span>
                <div className="SubredditDiv">
                    <span className="SubredditSVG">
                        <img alt="no" width="100%" height="100%" style={{borderRadius: "999px"}} src = {PostData.SubredditInfo.SubredditIcon} />
                    </span>
                    <span className="SubredditName">
                        {PostData.SubredditInfo.SubredditName}
                    </span>
                </div>
            </span>
            <span className="PostIMG">
                <span className="PostIMGSpan">
                    <img alt="hcdb" width="96" height="72" style={{borderRadius: "0.25rem" }} src = {PostData.PostImg} />
                </span>
            </span>
            </a>
        </li>
    )
}

export default TrendingPost;
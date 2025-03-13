import "./PostBody.css"

const PostBody = ({PostHeading, PostText}) => {
    return (
        <div>
        <div className="PostTitle">
                                <a href="/r/japanlife/comments/1gn3b5h/it_finally_happened/" id="post-title-t3_1gn3b5h" style={{textDecoration: "none",textDecorationLine: "none", color:"white"}} slot="title">
                                    {PostHeading}
                                </a>
                            </div>
                            <div className="PostText">
                                <a href="/r/japanlife/comments/1gn3b5h/it_finally_happened/" id="post-title-t3_1gn3b5h" style={{ textDecoration:'none'}}slot="text-body">
                                    <div className="PText">
                                        <p>{PostText}</p>
                                    </div>
                                </a>
                            </div>
        </div>
    )
}
export default PostBody;
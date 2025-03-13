import './Post.css'
import PostActionBar from '../../components/PostActionBar/PostActionBar'
import PostBody from '../../components/PostBody/PostBody'
import PostTitleBar from '../../components/PostTitleBar/PostTitleBar'

const Post = () =>{
    return (
        <article className="PostMain">
                        <div className="Post">
                            <PostTitleBar SubLogo = "https://styles.redditmedia.com/t5_2rg2o/styles/communityIcon_04pgtmcwecu41.png?width=48&amp;height=48&amp;frame=1&amp;auto=webp&amp;crop=48:48,smart&amp;s=afb38dc27a529e32cb8cd27922ecc7662ee59fa5"
                                                     SubName = {"r/japanlife"} TimeString = {"4 hr"}/>
                            <PostBody PostHeading = {"It finally happened."} PostText = {"Someone stole my Uber Eats. First of all, I hate putting food on the floor. Not only did the dude put it on the floor, he took a picture THEN took one of the bags! Half a decade in Japan and this is the first time I’ve experienced theft(aside from umbrellas, which are a natural phenomenon).Although there is a possibility it was my neighbor lol"}/>
                            <PostActionBar NoOfVotes={78} NoOfComments={46}/>
                        </div>
                    </article>
    )
}

export default Post;
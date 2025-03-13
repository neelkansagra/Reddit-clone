import "./MainContentPage.css"
import ReelBar from '../../Features/ReelBar/ReelBar'
import PostsBar from '../../Features/PostsBar/PostsBar'
import PostOptionsBar from "../PostOptionsBar/PostOptionsBar";
import SideBar from "../SideBar/SideBar";
const MainContentPage = () =>{
    return(
        <div className="rightSide">
            <div className="rightContent">
                <ReelBar />
                <div className="rightMain">
                    <main className="MainContent">
                    <PostOptionsBar />
                    <PostsBar />
                    
                    </main>
                    <SideBar SideBarTitle={"POPULAR COMMUNITIES"}/>
                </div>
            </div> 
        </div>
    )
};
export default MainContentPage;
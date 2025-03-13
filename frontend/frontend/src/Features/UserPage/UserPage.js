import "./UserPage.css"
import UserSideBar from "../UserSideBar/UserSidebar";
import UserMainContent from "../UserMainContent/UserMainContent";
const UserPage = () =>{


    return (
        <div className="rightSide">
            <div className="rightContent flex">
                <UserMainContent />
                <UserSideBar />
            </div>
        </div>
    )

}
export default UserPage;
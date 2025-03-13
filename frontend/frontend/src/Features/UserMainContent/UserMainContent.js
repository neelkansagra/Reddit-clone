import "./UserMainContent.css"

const UserMainContent = () =>{

    return (
        <main className="UserInfoBox">
            <div className="UserInfoBar">
                <div className="UserImgPlc">
                    <img style = {{height: "100%", display:"block", margin:"0", maxWidth:"100%"}} src="https://i.redd.it/snoovatar/avatars/5564ae9a-6530-47f2-83c1-cf5702f5fe23.png" className="ImgIcon"></img>
                </div>
                <div className="UserNamePlc">
                    <div className = "UserNameText">
                        Serhii Batovskyi
                    </div>
                    <p className="UserNameSiteName">
                        u/UserSergeyB
                    </p>
                </div>

            </div>
            <div className="UserProfileBtns">

            </div>
            <div className="UserPrfFeed">
                <div className="UserFeedPrefBtns">

                </div>
                <div className="UserFeed">
                    <artical>

                    </artical>
                    <hr></hr>
                    <artical>

                    </artical>
                </div>
            </div>
        </main>
    )

};
export default UserMainContent;
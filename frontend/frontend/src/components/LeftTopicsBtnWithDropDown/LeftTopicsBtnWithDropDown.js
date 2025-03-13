import './LeftTopicsBtnWithDropDown.css'

const LeftTopicsBtnWithDropDown =({Text, Icon}) =>{
        return (
            <div className="topics">
                                <li className="subTopics">
                                    <div className="subTopicsDiv">
                                        <span className="subTopicsMain">
                                            <span className="subTopicsIcon">
                                                <Icon />
                                            </span>
                                            <span className="subTopicsText">
                                                <span >{Text}</span>
                                            </span>
                                        </span>
                                        <span className="downButton">
                                            <span>
                                                <svg rpl="" fill="currentColor" height="20" icon-name="caret-down-outline" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg"><path d="M10 13.125a.624.624 0 0 1-.442-.183l-5-5 .884-.884L10 11.616l4.558-4.558.884.884-5 5a.624.624 0 0 1-.442.183Z"></path></svg>
                                            </span>
                                        </span>
                                    </div>
                                </li>
                            </div>
        )
};
//
export default LeftTopicsBtnWithDropDown;
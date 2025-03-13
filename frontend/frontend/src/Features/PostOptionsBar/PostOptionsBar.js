import "./PostOptionsBar.css"

const PostOptionsBar = () =>{
    return (
        <div>
        <div className="OptionsBar">
                        <div className="OptionsFlex">
                            <div className="SortOption">
                                <button className="SortBtn">
                                    <span className="SortSpan">
                                        <span className="SortIcon">
                                            Hot
                                        </span>
                                        <span className="SortText">
                                        <svg rpl="" fill="currentColor" height="16" icon-name="caret-down-outline" viewBox="0 0 20 20" width="16" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M10 13.125a.624.624 0 0 1-.442-.183l-5-5 .884-.884L10 11.616l4.558-4.558.884.884-5 5a.624.624 0 0 1-.442.183Z"></path>
 </svg>
                                        </span>
                                    </span>
                                </button>
                            </div>
                            <div className="Country">
                                <button className="SortBtn">
                                    <span className="SortSpan">
                                        <span className="SortIcon">
                                            Japan
                                        </span>
                                        <span className="SortText">
                                            <svg rpl="" fill="currentColor" height="16" icon-name="caret-down-outline" viewBox="0 0 20 20" width="16" xmlns="http://www.w3.org/2000/svg"><path d="M10 13.125a.624.624 0 0 1-.442-.183l-5-5 .884-.884L10 11.616l4.558-4.558.884.884-5 5a.624.624 0 0 1-.442.183Z"></path>
                                            </svg>
                                        </span>
                                    </span>
                                </button>
                            </div>
                            <div className="Layout">
                                <button className="SortBtn">
                                    <span className="SortSpan">
                                        <span className="SortIcon">
                                        <svg rpl="" fill="currentColor" height="16" icon-name="view-card-outline" viewBox="0 0 20 20" width="16" xmlns="http://www.w3.org/2000/svg">
      <path d="M17.882 1H2.118A1.12 1.12 0 0 0 1 2.119v15.762A1.119 1.119 0 0 0 2.118 19h15.764A1.12 1.12 0 0 0 19 17.881V2.119A1.12 1.12 0 0 0 17.882 1Zm-.132 16.75H2.25v-7.138h15.5v7.138ZM2.25 9.362V2.25h15.5v7.112H2.25Z"></path>
    </svg>
                                        </span>
                                        <span className="SortText">
                                            <svg rpl="" fill="currentColor" height="16" icon-name="caret-down-outline" viewBox="0 0 20 20" width="16" xmlns="http://www.w3.org/2000/svg"><path d="M10 13.125a.624.624 0 0 1-.442-.183l-5-5 .884-.884L10 11.616l4.558-4.558.884.884-5 5a.624.624 0 0 1-.442.183Z"></path>
                                            </svg>
                                        </span>
                                    </span>
                                </button>

                            </div>
                        </div>
                    </div>
                    <hr className="endLine2"></hr>
        </div>
    )
}
export default PostOptionsBar;
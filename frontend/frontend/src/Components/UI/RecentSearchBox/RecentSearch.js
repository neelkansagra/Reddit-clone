import "./RecentSearch.css";

let RecentSearchBox = ({ searchText }) =>{

    let linkText = "/search?query="+searchText;

    //Need useContext to change the recent search element

    let handleClick = (e) =>{
        e.preventDefault();
    }

    return (
        <li className="search-item">
            <a href = {linkText} className="search-anchor">
                <span className="search-icon">
                    <span>
                        <svg rpl="" fill="currentColor" height="16" viewBox="0 0 20 20" width="16" xmlns="http://www.w3.org/2000/svg"><path d="m13.558 14.442-4.183-4.183V4h1.25v5.741l3.817 3.817-.884.884ZM20 10a10 10 0 1 0-10 10 10.011 10.011 0 0 0 10-10Zm-1.25 0A8.75 8.75 0 1 1 10 1.25 8.76 8.76 0 0 1 18.75 10Z"></path>
                        </svg>
                    </span>
                </span>
                <span className="searchText">
                    { searchText }
                </span>
                <span className="searchClear" onClick={handleClick}>
                    <span>
                        <svg rpl="" fill="currentColor" height="16" viewBox="0 0 20 20" width="16" xmlns="http://www.w3.org/2000/svg"><path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 18.75A8.75 8.75 0 1 1 18.75 10 8.76 8.76 0 0 1 10 18.75Zm3.567-11.433L10.884 10l2.683 2.683-.884.884L10 10.884l-2.683 2.683-.884-.884L9.116 10 6.433 7.317l.884-.884L10 9.116l2.683-2.683.884.884Z"></path>
                        </svg>
                    </span>
                </span>
            </a>
        </li>
    )
};
export default RecentSearchBox;
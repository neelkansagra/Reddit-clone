import React,{ useState, useRef, useEffect, useCallback} from "react";
import './SearchBar.css'
import SearchDropDown from "../SearchDropDown/SearchDropDown";

const SearchBar = React.memo(()=>{
    const [isFocused, setIsFocused] = useState(false);
    const [searchVal, setSearchVal] = useState("");
    const searchValue = useRef("");
    const TopBox = useRef(null);
    const crossBtn = useRef(null);


    const handleMouseEnter = () => {
       TopBox.current.style.backgroundColor = "rgb(51,51,66)";
    }
    
    const handleMouseLeave = () => {
       TopBox.current.style.backgroundColor = "rgb(24, 28, 31)";
    };

    const handleChange = useCallback( (event) => {
        console.log("handlechange")
        const newValue = event.target.value;

        if(!crossBtn.current.classList.contains("showClearIcon") && newValue.length >0){
            crossBtn.current.classList.remove("hideClearIcon");
            crossBtn.current.classList.add("showClearIcon");
            setSearchVal(newValue);
        }
        else if(crossBtn.current.classList.contains("showClearIcon")){
            setSearchVal(newValue);
        }
        else if(newValue.length === 0){
            crossBtn.current.classList.remove("showClearIcon");
            crossBtn.current.classList.add("hideClearIcon");
        }
      },[])
      const InFocus = () =>{
        console.log("InFocus");
        TopBox.current.classList.remove("searchBar");
        TopBox.current.classList.add("searchBarBg");
        setIsFocused(true);
      }
      const outFocus = () =>{
        console.log("OutOfFocus");
        TopBox.current.classList.add("searchBar");
        TopBox.current.classList.remove("searchBarBg");
        setIsFocused(false);
        }
      const handleCross = () =>{
        console.log("on click");
        searchValue.current.value = "";
        crossBtn.current.classList.remove("showClearIcon");
        crossBtn.current.classList.add("hideClearIcon");
      }

    console.log("hello")
    return (
        <div className="searchMain">
            <div className='searchSub'>
                <div className='searchSubSub'>
                    <div className='searchBar' ref= {TopBox}>
                        <form autoComplete='off' className='searchForm'>
                            <label className='searchLabel'>
                                <div className='searchBoxPadding'>
                                    <span className="searchIcon">
                                        <svg rpl="" aria-hidden="true" fill="currentColor" height="16" icon-name="search-outline" viewBox="0 0 20 20" width="16" xmlns="http://www.w3.org/2000/svg"><path d="M19.5 18.616 14.985 14.1a8.528 8.528 0 1 0-.884.884l4.515 4.515.884-.884ZM1.301 8.553a7.253 7.253 0 1 1 7.252 7.253 7.261 7.261 0 0 1-7.252-7.253Z"></path>
                                        </svg>
                                    </span>
                                    <span className="inputContainer">
                                        <input type="text" name="q" placeholder="Search Reddit" autoComplete="off" inputMode="" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} onChange={handleChange} onFocus={InFocus} onBlur={outFocus} ref={searchValue}/>
                                    </span>
                                    <span className="hideClearIcon" onClick={handleCross} ref={crossBtn}>
                                        <svg rpl="" fill="currentColor" height="16" viewBox="0 0 20 20" width="16" xmlns="http://www.w3.org/2000/svg"><path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 18.75A8.75 8.75 0 1 1 18.75 10 8.76 8.76 0 0 1 10 18.75Zm3.567-11.433L10.884 10l2.683 2.683-.884.884L10 10.884l-2.683 2.683-.884-.884L9.116 10 6.433 7.317l.884-.884L10 9.116l2.683-2.683.884.884Z"></path>
                                        </svg>
                                    </span>
                                </div>
                            </label>
                        </form>
                        {isFocused && <SearchDropDown searchValue={searchVal}/>}
                    </div>
                    
                </div>
            </div>
        </div>
    )
})
export default SearchBar;
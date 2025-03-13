import React,{ useState } from "react";
import './SearchBar.css'

const SearchBar = ()=>{
    const [isHovered, setIsHovered] = useState(false);
    const [hasChanged, setHasChanged] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    const [isCrossed, setIsCrossed] = useState("");


    const handleMouseEnter = () => {
        setIsHovered(true);
      };
    
      // Event handler for mouse leave
      const handleMouseLeave = () => {
        setIsHovered(false);
      };

      const handleChange = (event) => {

        const newValue = event.target.value;

        if(newValue.length >0){
            setIsCrossed(newValue);
            setHasChanged(true);
        }
        else{
            setHasChanged(false);

        }
      }

      const InFocus = () =>{
            setIsFocused(true);
      }

      const outFocus = () =>{
        setIsFocused(false);
      }
      const handleCross = () =>{
        setIsCrossed("");
        setHasChanged(false);
      }

    return (
        <div className="searchMain">
            <div className='searchSub'>
                <div className='searchSubSub'>
                    <div className={isFocused ? 'searchBarBg':'searchBar'} style={{ backgroundColor: isHovered? "#333D42":"#2A3236"}}>
                        <form autoComplete='off' className='searchForm'>
                            <label className='searchLabel'>
                                <div className='searchBoxPadding'>
                                    <span className="searchIcon">
                                    <svg rpl="" aria-hidden="true" fill="currentColor" height="16" icon-name="search-outline" viewBox="0 0 20 20" width="16" xmlns="http://www.w3.org/2000/svg"><path d="M19.5 18.616 14.985 14.1a8.528 8.528 0 1 0-.884.884l4.515 4.515.884-.884ZM1.301 8.553a7.253 7.253 0 1 1 7.252 7.253 7.261 7.261 0 0 1-7.252-7.253Z"></path>
 </svg>
                                    </span>
                                    <span className="inputContainer">
                                    <input value={isCrossed} type="text" name="q" placeholder="Search Reddit" autoComplete="off" inputMode="" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} onChange={handleChange} onFocus={InFocus} onBlur={outFocus}/>
                                    </span>
                                    <span className={hasChanged ? "showClearIcon":"hideClearIcon"} onClick={handleCross}>
                                        <svg rpl="" fill="currentColor" height="16" viewBox="0 0 20 20" width="16" xmlns="http://www.w3.org/2000/svg"><path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 18.75A8.75 8.75 0 1 1 18.75 10 8.76 8.76 0 0 1 10 18.75Zm3.567-11.433L10.884 10l2.683 2.683-.884.884L10 10.884l-2.683 2.683-.884-.884L9.116 10 6.433 7.317l.884-.884L10 9.116l2.683-2.683.884.884Z"></path>
                                        </svg>
                                    </span>
                                </div>
                            </label>
                            
                        </form>
                    </div>
                   

                </div>
            </div>
        </div>
    )
};
export default SearchBar;
import "./SearchDropDown.css"
import {useState, useEffect, useRef} from "react";
import RecentSearchBox from "../../UI/RecentSearchBox/RecentSearch";
import TrendingPost from "../TrendingPost/TrendingPost";

const FetchStatus = {
    Loading: "LOADING",
    Success: "SUCCESS",
    Error: "ERROR"
};

let SearchDropDown = ({ searchValue }) =>{
    let [lastFive, setLastFive] = useState([]);
    let [trending, setTrending] = useState([]);
    let getStatus = useRef(FetchStatus.Loading);
    // let [currentSearchval, setSearchval] = useState(searchValue.current.value);
    
    // console.log(searchValue)
    useEffect (()=>{

        // let handleChange = () => { setSearchval(searchEle.value)};
        console.log("Child received updated value:", searchValue);
        // const searchEle = searchValue.current;
        // searchEle.addEventListener('onchange',handleChange);

        // return () =>{
        //     searchEle.removeEventListener('onchange',handleChange);
        // }
    },[searchValue]);
    // useEffect(()=>{
    //     fetch("/recent-searches")
    //     .then((res) =>{
    //         if(!res.ok){ 
    //             throw new Error("Network Error");
    //         }
    //         let json_res = res.json();
    //         setLastFive(json_res);
    //     })
    //     .catch((err) =>{
    //         console.error("Fetch error:", err);
    //     })
    //     .finally(

    //     fetch("/trending")
    //     .then((res) =>{
    //         if(!res.ok){
    //             throw new Error("Network error");
    //         }
    //         let json_res = res.json();
    //         getStatus.current = FetchStatus.Success;
    //         setTrending(json_res);
    //     })
    //     .catch((err) =>{
    //         console.error("Fetch error:", err);
    //         getStatus.current = FetchStatus.Error;
    //     })
    //     )
    // }, []);

    // if(getStatus === FetchStatus.Loading) return;
    // else if(getStatus === FetchStatus.Error) return (<div>Error</div>);

   
    let sampleRecentSearchData = ["hello", "ygdvcuhcbedhcbedi", "vdygdhsub", "udbcidwbcj", "wudcbwu"];
    let sampletrendingdata = [{
                                "PostTitle":"SomePost",
                                "PostDescription":"Houston Astros fan has been ejected after interfering with Mike Trout. The fan ripped the ball out Trout’s glove on a foul out to right field.",
                                "SubredditInfo":{
                                    "SubredditName":"r/som and more",
                                    "SubredditIcon":"https://b.thumbs.redditmedia.com/V3oOhkQE_SiCz2dvI2uA7TlbcfvaIMPw2AQjtIdqMUk.png"
                                },
                                "PostImg": "https://external-preview.redd.it/djMzNW1mc2F0aHVlMRyEDZwIwaEYfXBQM-KlLOVz8MRng17jkSi71TLPVmsj.png?width=140&height=78&crop=140:78,smart&format=jpg&v=enabled&lthumb=true&s=d557715de8c6998b8b75720446a6cefe889e3f49"
                              },
                              {
                                "PostTitle":"SomePost",
                                "PostDescription":"Somedescription",
                                "SubredditInfo":{
                                    "SubredditName":"SomeName",
                                    "SubredditIcon":"SomeLink"
                                },
                                "PostImg": "SomeLink"

                              },
                              {
                                "PostTitle":"SomePost",
                                "PostDescription":"Somedescription",
                                "SubredditInfo":{
                                    "SubredditName":"SomeName",
                                    "SubredditIcon":"SomeLink"
                                },
                                "PostImg": "SomeLink"

                              },
                              {
                                "PostTitle":"SomePost",
                                "PostDescription":"Somedescription",
                                "SubredditInfo":{
                                    "SubredditName":"SomeName",
                                    "SubredditIcon":"SomeLink"
                                },
                                "PostImg": "SomeLink"
                              }
                             ]
    return (
        <div className="SearchDropDown">
            <div className="RecentSearchBox">
                <ul className="RecentSearchUL">
                {
                    sampleRecentSearchData.map((s, i) =>(
                        <RecentSearchBox key ={i} searchText={s} />
                    ))
                }
                </ul>
            </div>
            <div className="TrendingTitle">
                <span style={{marginRight: "0.25rem"}}>
                    <svg rpl="" aria-hidden="true" class="mr-2xs" fill="currentColor" height="16" icon-name="rising-outline" viewBox="0 0 20 20" width="16" xmlns="http://www.w3.org/2000/svg"><path d="M3.554 17.826a1.124 1.124 0 0 1-.8-.33L.435 15.175a1.131 1.131 0 0 1 0-1.6l6.008-6.008a1.643 1.643 0 0 1 2.315 0l1.878 1.879 2.8-2.8-1.412-1.406A.726.726 0 0 1 12.54 4h6.736a.727.727 0 0 1 .726.727v6.735a.727.727 0 0 1-1.239.516l-1.41-1.411-5.56 5.56a1.64 1.64 0 0 1-2.313 0L7.6 14.248 4.354 17.5c-.213.21-.5.328-.8.326ZM1.4 14.376l2.151 2.151 4.05-4.047 2.76 2.763a.389.389 0 0 0 .547 0L17.352 8.8l1.4 1.4V5.25h-4.951l1.4 1.4-4.567 4.566-2.76-2.765a.391.391 0 0 0-.547 0L1.4 14.376Z"></path>
                    </svg>
                </span>
                <div>
                  TRENDING TODAY
                </div>
            </div>
            <div className="trendingSearchBox">
                <ul className="trendingSearchUL">
                {
                    sampletrendingdata.map((s, i) =>(
                        <TrendingPost key ={i} PostData={s} />
                    ))
                }
                </ul>

            </div>
        </div>
    )
}

export default SearchDropDown;
import React, { useState, useEffect, useRef } from "react";
import axios from 'axios';
import { useSelector } from 'react-redux';
import "../css/Header.css";
import "../css/Main.css";
import {uID} from "../redux/idReducer";

export default function Rank() {

  const uID = useSelector((state) => state.idReducer.uID);

  const [rank, setRank] = useState([])

  async function fetchRank() {
    await axios
      .get("/muleoba/bestuser")
      .then((response) => {
        setRank(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error)
      })
  }

  useEffect(() => {
    fetchRank();
    var i = 1;
  
    window.setInterval(function(){
      document.getElementById("header_ranking_textbox").style.transitionDuration = "400ms";
      document.getElementById("header_ranking_textbox").style.marginTop = (i*-2.13) + "em";
  
      i++;
      i%=5;
       
    },2500);
  }, [])

 


  return (

              <div className="header_ranking_box"  >
                {
                  rank
                    ? rank.map((rank, index) => {
                      return (
                        <div className="header_ranking_textbox" id="header_ranking_textbox" key={rank}>
                          <div className="header_rankingNumber">{index + 1}</div>
                          <div className="header_rankingNickname">
                            <div className="header_rank">
                              {rank}
                            </div>
                          </div>  
                        </div>
                      )
                    })
                    : null
                }
              </div>

  );
}

import "./findinput.css";
import { AiFillCaretLeft } from "react-icons/ai";
import { AiFillCaretRight } from "react-icons/ai";
import { IoMdClose } from "react-icons/io";
import React, { useEffect, useRef } from "react";

export const Findinput = ({
  handlecloseinput,
  handleinputchange,
  handleleftarrow,
  handlerightarrrow,
  currentindex,
  totaltextmatches,
  inputdata,
}) => {
  useEffect(() => {
    inputref.current.focus();
  }, []);

  const inputref = useRef();

  return (
    <div className="main-input-div">
      <div className="text-div">
        <input type="text" ref={inputref} onChange={handleinputchange} />
      </div>

      <div className="stats">
  {inputdata && 
  <>
      <h4>{currentindex}</h4>
      <h4>/</h4>
      <h4>{totaltextmatches}</h4>
      </>
  }
   </div>


      <div className="icon-div">
        <button onClick={handleleftarrow}>
          <AiFillCaretLeft />
        </button>
      </div>
      <div className="icon-div">
        <button onClick={handlerightarrrow}>
          <AiFillCaretRight />
        </button>
      </div>
      <div className="icon-div">
        <button onClick={handlecloseinput}>
          <IoMdClose />
        </button>
      </div>
    </div>
  );
};

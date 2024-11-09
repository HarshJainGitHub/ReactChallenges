import React, { useState } from "react";
import "../CShapedAnimation/CShaped.css";
import { useEffect } from "react";
import { useRef } from "react";

const CShaped = () => {

  const [grid, setGrid] = useState([
    { id: 1, isClicked: false, isVisible: true, order: -1 },
    { id: 2, isClicked: false, isVisible: true, order: -1 },
    { id: 3, isClicked: false, isVisible: true, order: -1 },
    { id: 4, isClicked: false, isVisible: true, order: -1 },
    { id: 5, isClicked: false, isVisible: false, order: -1 },
    { id: 6, isClicked: false, isVisible: false, order: -1 },
    { id: 7, isClicked: false, isVisible: true, order: -1 },
    { id: 8, isClicked: false, isVisible: true, order: -1 },
    { id: 9, isClicked: false, isVisible: true, order: -1 },
  ]);
  const counterRef = useRef(0);


  const handleClick = (boxIndex) => {
    counterRef.current++;
    const newGrid = [...grid];
    newGrid[boxIndex].isClicked = true;
    newGrid[boxIndex].order = counterRef.current;
    setGrid(newGrid);
    if(counterRef.current === 7) {
      resetGrid();
    }
  }

  const resetGrid = () => {
    const newGrid = [...grid];
    newGrid.sort((a,b) => a.order - b.order);
    newGrid.forEach((box,index) => {
      setTimeout(() => {
        setGrid((prevGrid) => prevGrid.map((item) => item.id === box.id ? { ...item, isClicked: false, order:-1} : item));
      }, index * 1000);
    });
    counterRef.current = 0;
  }

  return (
    <div className="container">
      {grid.map((gridBox, index) => {
        return gridBox.isVisible ? (
            <div
              key={index}
              className={`${gridBox.isClicked ? `box black` : `box white`}`}
              onClick={() => handleClick(index)}
            >
              {gridBox.id}
            </div>
        ) : (
          <div className="visibility-hidden" key={index}></div>
        );
      })}
    </div>
  );
};

export default CShaped;

/*
Problem Statement:
For UI - With 7 boxes create C-Shaped
Functionality - on clicking of box it should change it color and on clicking of allboxes it should change
its color to original color after a second delay
*/

/*
  Solution Explanation
  1) Create Grid of 9 and hide 5,6 id no to create c shaped
  2) we are using isVisible for showing purpose and isClicked to record
  its clicked and order for knowing the sequence in which its clicked.
  3) reset logic 1st creating shallow copy and then sorting data by order
  once order is sorted it will reset data based on newGrid and useState Grid if matched reset it else send it as it is.
*/
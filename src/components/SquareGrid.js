import React, { useEffect, useState } from "react";

export default function SquareGrid() {
  const [squareArray, setSquareArray] = useState([]);
  const [color, setColor] = useState([]);
  const [largestColor, setLargestColor] = useState();
  function getColor(n, x, y) {
    let colorArray = [];
    let sqrs = [];

    let i = 0;
    while (i < n) {
      var randomColor = Math.floor(Math.random() * 16777215).toString(16);
      if (!colorArray.includes(randomColor)) {
        colorArray.push("#" + randomColor);
        i++;
      }
    }
    setColor(colorArray);
    for (let i = 0; i < x; i++) {
      let row = [];
      for (let j = 0; j < y; j++) {
        let randomClrIdx = Math.floor(Math.random() * n);
        row.push(colorArray[randomClrIdx]);
      }
      sqrs.push(row);
    }
    setSquareArray(sqrs);
  }
  function isWithinGrid(row, col, numRows, numCols) {
    return row >= 0 && row < numRows && col >= 0 && col < numCols;
  }

  function searchRegion(row, col, grid, visited, color) {
    const numRows = grid.length;
    const numCols = grid[0].length;
    let regionSize = 1;
    visited[row][col] = true;

    const neighbors = [
      [row - 1, col], // up
      [row, col + 1], // right
      [row + 1, col], // down
      [row, col - 1], // left
    ];

    for (const neighbor of neighbors) {
      const [r, c] = neighbor;
      if (
        isWithinGrid(r, c, numRows, numCols) &&
        !visited[r][c] &&
        grid[r][c] === color
      ) {
        regionSize += searchRegion(r, c, grid, visited, color);
      }
    }

    return regionSize;
  }

  function findLargestRegion(grid, color) {
    const numRows = grid.length;
    const numCols = grid[0].length;
    const visited = new Array(numRows)
      .fill()
      .map(() => new Array(numCols).fill(false));
    let largestRegion = 0;

    for (let row = 0; row < numRows; row++) {
      for (let col = 0; col < numCols; col++) {
        if (!visited[row][col] && grid[row][col] === color) {
          const regionSize = searchRegion(row, col, grid, visited, color);
          if (regionSize > largestRegion) {
            largestRegion = regionSize;
          }
        }
      }
    }

    return largestRegion;
  }

  useEffect(() => {
    getColor(4, 8, 8);
  }, []);
  useEffect(() => {
    if (squareArray.length > 0) {
      let largestColorData = 0;
      let colorName = "";
      color.forEach((el) => {
        console.log("...colors box check", el, "...");
        let largerScore = findLargestRegion(squareArray, el);
        colorName = largestColorData < largerScore ? el : colorName;
        largestColorData =
          largestColorData < largerScore ? largerScore : largestColorData;

        console.log("....wl", el, largerScore);
      });
      console.log("....colorName", colorName, largestColorData);
      setLargestColor({
        name: colorName,
        regionSize: largestColorData,
      });
    }
  }, [squareArray]);
  return (
    <>
      <div
        style={{ display: "flex", margin: "0px", padding: "0px" }}
        className="App"
      >
        <div style={{ display: "flex" }}>
          {squareArray.map((items, index) => {
            return (
              <ul
                style={{ listStyleType: "none", margin: "0px", padding: "0px" }}
              >
                {items.map((subItems, sIndex) => {
                  console.log(subItems);
                  return (
                    <li
                      style={{
                        border: `1px solid black`,
                        backgroundColor: subItems,
                        width: "50px",
                        height: "50px",
                        listStyleType: "none",
                      }}
                    ></li>
                  );
                })}
              </ul>
            );
          })}
        </div>
      </div>
      <br />
      <div>
        {largestColor &&
          color.map((items) => {
            console.log("...", largestColor.name);
            return (
              <div style={{ display: "flex" }}>
                <div
                  style={{
                    border: `1px solid black`,
                    backgroundColor: items,
                    width: "50px",
                    height: "50px",
                    listStyleType: "none",
                    margin: "10px",
                  }}
                ></div>
                <p style={{ padding: "10px" }}>
                  {`Name: ${items}     ${
                    largestColor.name == items
                      ? `-  Size :${largestColor.regionSize} ` +
                        " ==>  This color has the largest Region"
                      : ""
                  }`}
                </p>
              </div>
            );
          })}
      </div>
    </>
  );
}
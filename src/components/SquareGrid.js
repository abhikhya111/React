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

    useEffect(() => {
        getColor(4, 8, 8);
    }, []);
    useEffect(  () => {
        if (squareArray.length > 0) {
            let largestColorData = 0;
            let colorName = "";

             color.forEach(async (el) => {
                let params = {}
                let largerScore;
                params.squares = JSON.stringify(squareArray)
                params.color = el
                console.log("my param",params);
                fetch('https://example.com?' + new URLSearchParams({
    foo: 'value',
    bar: 2,
}))
                await fetch(`http://localhost:5000/colors?color?=new URLSearchParams({
                    foo: 'value',
                    bar: 2,
                })`, 
                { 
                    method: "GET", params: params })
                    .then(response => {
                        return response.json()
                    })
                    .then(data => {
                        console.log(data);
                        largerScore = data.region_size;

                    })

                colorName = largestColorData < largerScore ? el : colorName;
                largestColorData =
                    largestColorData < largerScore ? largerScore : largestColorData;

            });
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
                                    {`Name: ${items}     ${largestColor.name == items
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

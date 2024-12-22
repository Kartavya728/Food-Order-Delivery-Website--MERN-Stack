import React, { useState, useEffect } from "react";
import "../Css/Foods.css";
import Card from "./Card";


function Foods({ category, foods, search }) {
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    // Simulating data loading delay
    const timer = setTimeout(() => setIsLoading(false), 1000); // 1 second delay
    return () => clearTimeout(timer); // Cleanup timer
  }, []);


  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  return (
    <div className="foods-container">
      {category.map((cat) => (
        <div key={cat._id} className="category-section">
          <h2 className="category-name">{cat.CategoryName}</h2>
          <div className="foods-row">
            {foods
              .filter(
                (food) =>
                  food.CategoryName === cat.CategoryName &&
                  food.name.toLowerCase().includes(search)
              )
              .map((food) => (
                <Card
                  key={food._id}
                  img={food.img}
                  id={food._id}
                  title={food.name}
                  sizeOptions={food.options[0]} // Passing size options
                />
              ))}
          </div>
          <div
            style={{
              width: "90%",
              height: "2px",
              marginTop: "20px",
              background:
                "linear-gradient(to right, rgba(128, 128, 128, 0), gray, gray, gray, gray, gray, rgba(128, 128, 128, 0))",
              border: "none",
            }}
          ></div>
        </div>
      ))}
    </div>
  );
}

export default Foods;

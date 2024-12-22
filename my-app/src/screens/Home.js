import React, { useEffect, useState } from "react";
import Carousel from "../components/Carousel";
import Foods from "../components/Foods";
import "../Css/Home.css";

function Home() {
  const [categories, setCategories] = useState([]);
  const [foods, setFoods] = useState([]);
  const [search,setSearch]= useState("")
  // Fetch categories
  const fetchCategories = async () => {
    try {
      const response = await fetch("http://localhost:5000/data/category", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const json = await response.json();
      setCategories(json); // Set categories in state
    } catch (error) {
      console.error("Error fetching categories:", error);
      alert("An error occurred while fetching categories.");
    }
  };

  // Fetch foods
  const fetchFoods = async () => {
    try {
      const response = await fetch("http://localhost:5000/data/food", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const json = await response.json();
      setFoods(json); // Set foods in state
    } catch (error) {
      console.error("Error fetching foods:", error);
      alert("An error occurred while fetching foods.");
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchCategories();
    fetchFoods();
  }, []);

  return (
    <div>
      <br />
      <br />
      <br />
      <Carousel />
      <form className="search-form d-flex" role="search">
        <input
          className="form-control me-2 search-input"
          type="search"
          placeholder="Search"
          aria-label="Search"
          value={search}
          onChange={(e)=>{
            setSearch(e.target.value)
          }}
        />
        <button className="btn btn-outline-success search-btn" type="submit">
          Search
        </button>
      </form>
      {/* Pass resolved data to Foods */}
      <Foods foods={foods} category={categories} search={search} />
    </div>
  );
}

export default Home;

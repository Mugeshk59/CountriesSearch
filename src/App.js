import React, { useEffect, useState } from "react";
import axios from "axios";
const App = () => {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://restcountries.com/v3.1/all");
        setCountries(response.data);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchData();
  }, []);

  const handleSearch = async (query) => {
    setSearch(query);
    try {
      const response = await axios.get("https://restcountries.com/v3.1/all");
      setCountries(
        response.data.filter((country) =>
          country.name.common.toLowerCase().includes(query.toLowerCase())
        )
      );
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };

  return (
    <div>
      <div className="inputdiv">
        <input
          type="text"
          value={search}
          placeholder="Search for countries"
          onChange={(e) => handleSearch(e.target.value)}
        ></input>
      </div>
      <div className="countries-container">
        {countries.map((country) => (
          <div key={country.cca3} className="countryCard">
            <img src={country.flags.svg} alt={country.name.common} />
            <span>{country.name.common}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;

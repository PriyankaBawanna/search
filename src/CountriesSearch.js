import React, { useState, useEffect } from "react";

const CountriesSearch = () => {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState("");
  const [error, setError] = useState(null);
  const [loading,setLoading]=useState(true)


  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch('https://countries-search-data-prod-812920491762.asia-south1.run.app/countries'); // Replace with your API endpoint
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setCountries(data);
      } catch (err) {
        setError('Error fetching countries');
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();
  }, []);

  const filteredCountries = countries.filter((country) =>
    country.common.toLowerCase().includes(search.toLowerCase())
  );
   if(loading){
    return<>Loading</>
   }
  return (
    <div className="container">
      <h1>Country Search</h1>
      <input
        type="text"
        placeholder="Search for countries..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-bar"
      />
      {error && <p data-testid="error-message" style={{ color: "red" }}>Error: {error}</p>}
      <div className="countries-grid">
        {filteredCountries.length > 0 ? (
          filteredCountries.map((country) => (
            <div key={country.common} data-testid="country-card" className="countryCard">
              <img src={country.png} alt={`${country.common} flag`}  className="country-flag" />
              <p className="country-name">{country.common}</p>
            </div>
          ))
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default CountriesSearch;



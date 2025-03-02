import React, { useState, useEffect } from "react";

const CountriesSearch = () => {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const res = await fetch('https://xcountries-backend.azurewebsites.net/all');
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const response = await res.json();
        setCountries(response);
      } catch (err) {
        setError('Error fetching countries');
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();
  }, []);

  const filteredCountries = countries.filter((country) =>
    country.name.toLowerCase().includes(search.toLowerCase())
  );

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
      
      {loading && <p>Loading...</p>}  {/* Loading message */}
      {error && <p data-testid="error-message" style={{ color: "red" }}>Error: {error}</p>}  {/* Error message */}
      
      <div className="countries-grid">
        {filteredCountries.length > 0 ? (
          filteredCountries.map((country) => (
            <div key={country.alpha3Code} data-testid="country-card" className="countryCard">
              <img src={country.flag} alt={`${country.name} flag`} className="country-flag" />
              <p className="country-name">{country.name}</p>
            </div>
          ))
        ) : (
          <> </>
        )}
      </div>
    </div>
  );
};

export default CountriesSearch;





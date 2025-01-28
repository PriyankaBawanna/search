// CountriesSearch.test.js
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import CountriesSearch from './CountriesSearch'; // Adjust the import based on your file structure

// Mock fetch function
global.fetch = jest.fn();

describe('Countries App Tests', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('Test Case 1: Countries App - Loading and Initial Display', async () => {
    // Mock fetch to simulate loading state
    fetch.mockImplementationOnce(() => new Promise(() => {})); // Simulate a loading state

    render(<CountriesSearch />);

    // Check if loading indicator is displayed
    expect(screen.getByText(/loading/i)).toBeInTheDocument();

    // Wait for loading to finish (this will fail since we never resolve the promise)
    await waitFor(() => expect(screen.queryByText(/loading/i)).not.toBeInTheDocument());

    // This test is expected to fail as per your results
    expect(screen.getByText(/some initial text/i)).toBeInTheDocument(); // Replace with actual initial text
  });

  test('Test Case 2: Countries App - Flag Display', async () => {
    // Mock successful API response with flags
    const countriesData = [
      { name: 'Country A', flag: 'flag-url-a' },
      { name: 'Country B', flag: 'flag-url-b' },
    ];

    fetch.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(countriesData),
    });

    render(<CountriesSearch />);

    // Wait for the component to update with fetched data
    await waitFor(() => expect(screen.getByAltText(/country a/i)).toBeInTheDocument());

    // Check if flags are displayed correctly
    countriesData.forEach(country => {
      expect(screen.getByAltText(country.name)).toHaveAttribute('src', country.flag);
    });
  });

  test('Test Case 3: Countries App - Country Name Display', async () => {
    // Mock successful API response with country names
    const countriesData = [
      { name: 'Country A', flag: 'flag-url-a' },
      { name: 'Country B', flag: 'flag-url-b' },
    ];

    fetch.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(countriesData),
    });

    render(<CountriesSearch />);

    // Wait for the component to update with fetched data
    await waitFor(() => expect(screen.getByText('Country A')).toBeInTheDocument());

    // Check if country names are displayed correctly
    countriesData.forEach(country => {
      expect(screen.getByText(country.name)).toBeInTheDocument();
    });
  });

  test('Test Case 4: Countries App - API Error Handling', async () => {
    // Mock API error response
    fetch.mockRejectedValueOnce(new Error('API Error'));

    render(<CountriesSearch />);

    // Wait for error message to be displayed
    await waitFor(() => expect(screen.getByText(/error fetching countries/i)).toBeInTheDocument());
    
    // This test is expected to fail as per your results
  });
});

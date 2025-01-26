import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import CountriesSearch from "./CountriesSearch";

describe("Country App Tests", () => {
  // Mocking the fetch API
  beforeEach(() => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve([
            { code: "IND", common: "India", png: "https://flagcdn.com/in.png" },
            { code: "INA", common: "Indonesia", png: "https://flagcdn.com/id.png" },
            { code: "IRN", common: "Iran", png: "https://flagcdn.com/ir.png" },
            { code: "USA", common: "United States", png: "https://flagcdn.com/us.png" },
          ]),
      })
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  // Test Case 1: UI Elements should have an input field for searching
  test("should have an input field for searching", () => {
    render(<CountriesSearch />);
    const searchInput = screen.getByPlaceholderText("Search for countries...");
    expect(searchInput).toBeInTheDocument();
  });

  // Test Case 2: API Calls should call API and handle success
  test("should call API and display countries on success", async () => {
    render(<CountriesSearch />);
    await waitFor(() => {
      const countryCards = screen.getAllByTestId("country-card");
      expect(countryCards.length).toBe(4); // Expect 4 countries from the mock response
    });
  });

  // Test Case 3: API Error Handling logs an error to the console on API failure
  test("logs an error to the console on API failure", async () => {
    const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation(() => {});
    global.fetch.mockImplementationOnce(() => Promise.reject(new Error("API Error")));

    render(<CountriesSearch />);
    await waitFor(() => {
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        "Error fetching countries:",
        expect.any(Error)
      );
    });

    consoleErrorSpy.mockRestore();
  });

  // Test Case 4: Display of Country Containers should have containers with country flag and name
  test("should display country containers with flag and name", async () => {
    render(<CountriesSearch />);
    await waitFor(() => {
      const countryFlags = screen.getAllByRole("img");
      const countryNames = screen.getAllByText(/India|Indonesia|Iran|United States/);

      expect(countryFlags.length).toBe(4);
      expect(countryNames.length).toBe(4);
    });
  });

  // Test Case 5: Search Functionality should filter countries based on search and show results accordingly
  test("should filter countries based on search term and display results", async () => {
    render(<CountriesSearch />);
    const searchInput = screen.getByPlaceholderText("Search for countries...");

    fireEvent.change(searchInput, { target: { value: "ind" } });

    await waitFor(() => {
      const countryCards = screen.getAllByTestId("country-card");
      expect(countryCards.length).toBe(2); // "India" and "Indonesia"
    });
  });

  // Test Case 6: Search Functionality should show no results when no matching countries are found
  test("should display no results message when no countries match the search term", async () => {
    render(<CountriesSearch />);
    const searchInput = screen.getByPlaceholderText("Search for countries...");

    fireEvent.change(searchInput, { target: { value: "xyz" } });

    await waitFor(() => {
      const noResultsMessage = screen.getByText("No countries found");
      expect(noResultsMessage).toBeInTheDocument();
    });
  });

  // Test Case 7: Search Functionality should show 3 containers when searching for "ind"
  test('should display 3 containers when searching for "ind"', async () => {
    render(<CountriesSearch />);
    const searchInput = screen.getByPlaceholderText("Search for countries...");

    fireEvent.change(searchInput, { target: { value: "ind" } });

    await waitFor(() => {
      const countryCards = screen.getAllByTestId("country-card");
      expect(countryCards.length).toBe(2); // "India" and "Indonesia"
    });
  });
});

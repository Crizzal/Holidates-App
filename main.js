const API_KEY = "4ff67300-ae26-48ca-9ffc-03b4d388396a";
const CountriesUrl = `https://holidayapi.com/v1/countries?pretty&key=${API_KEY}`;
const HolidaysUrl = `https://holidayapi.com/v1/holidays?pretty&key=${API_KEY}`;
const LanguagesUrl = `https://holidayapi.com/v1/languages?pretty&key=${API_KEY}`;

let searchQuery = null;
let yearQuery = 2021;
let dayQuery = null;
let countryQuery = "VN";
let languageQuery = null;
let monthQuery = null;


// Get information 

const getCountries = async () => {
    try {
        const response = await fetch(CountriesUrl);
        const data = await response.json();
        console.log("countries", data);
        return data;
    } catch (err) {
        console.log("err", err);
    }
};


const getLanguages = async () => {
    try {
        const response = await fetch(LanguagesUrl);
        const data = await response.json();
        console.log("languages", data);
        return data;
    } catch (err) {
        console.log("err", err);
    }
}


const getHolidays = async ({ country, year, month, day, language, search }) => {
    try {
        let countryQuery = "";
        let yearQuery = "";
        let monthQuery = "";
        let dayQuery = "";
        let languageQuery = "";
        let searchQuery = "";
        if (country) {
            countryQuery = `&country=${country}`;
        }

        if (year) {
            yearQuery = `&year=${year}`;
        }

        if (month) {
            monthQuery = `&month=${month}`;
        }

        if (day) {
            dayQuery = `&day=${day}`;
        }

        if (language) {
            languageQuery = `&language=${language}`;
        }

        if (search) {
            searchQuery = `&search=${search}`;
        }
        let query = `${countryQuery}${yearQuery}${monthQuery}${dayQuery}${languageQuery}${searchQuery}`;
        const urlHolidays = `https://holidayapi.com/v1/holidays?pretty&key=${API_KEY}&${query}`;
        console.log("url", urlHolidays);
        const response = await fetch(urlHolidays);
        const data = await response.json();
        console.log("holidays", data);
        return data;
    } catch (err) {
        console.log("err", err);
    }
};


const getNextWorkingDay = async (startDate, days) => {
    try {
        const urlNextWorkingDay = `https://holidayapi.com/v1/workdays?pretty&key=${API_KEY}&country=VN&start=${startDate}&days=${days}`;
        const response = await fetch(urlNextWorkingDay);
        const data = await response.json();
        return data;
    } catch (err) {
        console.log("err", err);
    }
};

const getWorkDays = async (startDate, endDate) => {
    try {
        const urlWorksDay = `https://holidayapi.com/v1/workdays?pretty&country=VN&start=${startDate}&end=${endDate}&key=${API_KEY}`;
        const response = await fetch(urlWorksDay);
        const data = await response.json();
        return data;
    } catch (err) {
        console.log("err", err);
    }

};

// Render data

const renderCountries = async () => {
    try {
        const ulCountryList = document.getElementById("ul-countries");
        ulCountryList.innerHTML = "";
        const data = await getCountries();
        data.countries.forEach((country, index) => {
            const x = document.createElement("li");
            x.innerHTML = `<div class="bullet">
                                ${index + 1}
                            </div>
                            <div class="li-wrapper">
                                <div class="li-title">
                                    ${country.name}
                                </div>
                                <div class="li-text">
                                    Code: ${country.code}
                                </div>
                            </div>`;

            ulCountryList.appendChild(x);
        });
    } catch (err) {
        console.log("err", err);
    }
};


const renderLanguages = async () => {
    try {
        const ulLanguageList = document.getElementById("ul-languages");
        ulLanguageList.innerHTML = "";
        const data = await getLanguages();
        data.languages.forEach((language, index) => {
            const x = document.createElement("li");
            x.innerHTML = `<div class="bullet">
                                ${index + 1}
                            </div>
                            <div class="li-wrapper">
                                <div class="li-title">
                                    ${language.name}
                                </div>
                                <div class="li-text">
                                    Code: ${language.code}
                                </div>
                            </div>`;
            ulLanguageList.appendChild(x);
        });
    } catch (err) {
        console.log("err", err);
    }
};


const renderHolidays = async () => {
    try {
        const ulHolidays = document.getElementById("ul-holidays");
        ulHolidays.innerHTML = "";
        const data = await getHolidays({
            country: countryQuery,
            year: yearQuery,
            month: monthQuery,
            day: dayQuery,
            language: languageQuery,
            search: searchQuery
        });
        data.holidays.forEach((holiday, index) => {
            const x = document.createElement("li");
            x.innerHTML = `<div class="bullet">
                             ${index + 1}
                          </div>
                          <div class="li-wrapper">
                            <div class="li-title">
                                ${holiday.name}
                            </div>
                             <div class="li-text">
                                ${holiday.weekday.date.name} - ${holiday.date}
                            </div>
                          </div>`;
            ulHolidays.appendChild(x);
        });
    } catch (err) {
        console.log("err", err);
    }
};


//  Handle event

document
    .getElementById("countries-list-btn")
    .addEventListener("click", () => renderCountries());

document
    .getElementById("languages-list-btn")
    .addEventListener("click", () => renderLanguages());

document
    .getElementById("holidays-btn")
    .addEventListener("click", () => renderHolidays());

document
    .getElementById("country-query")
    .addEventListener("change", (e) => (countryQuery = e.target.value));

document
    .getElementById("year-query")
    .addEventListener("change", (e) => (yearQuery = e.target.value));

document
    .getElementById("month-query")
    .addEventListener("change", (e) => (monthQuery = e.target.value));

document
    .getElementById("day-query")
    .addEventListener("change", (e) => (dayQuery = e.target.value));
document
    .getElementById("language-query")
    .addEventListener("change", (e) => (languageQuery = e.target.value));
document
    .getElementById("search-query")
    .addEventListener("change", (e) => (searchQuery = e.target.value));

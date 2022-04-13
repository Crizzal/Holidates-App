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
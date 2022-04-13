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

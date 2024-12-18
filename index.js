let isDOBOpen = false;
let dateOfBirth = null;
let timer = null;

const settingCogEl = document.getElementById("settingIcon");
const settingContentEl = document.getElementById("settingsContent");
const initialTextEl = document.getElementById("initialText");
const afterDOBBtnTxtEl = document.getElementById("afterDOBBtnTxt");
const dobButtonEl = document.getElementById("dobButton");
const dobInputEl = document.getElementById("dobInput");

const yearEl = document.getElementById("year");
const monthEl = document.getElementById("month");
const dayEl = document.getElementById("day");
const hourEl = document.getElementById("hour");
const minuteEl = document.getElementById("minute");
const secondEl = document.getElementById("second");

const makeTwoDigit = (number) => {
    return number > 9 ? number : `0${number}`;
};

const toggleDateOfBirthSelector = () => {
    if (isDOBOpen) {
        settingContentEl.classList.add("hide");
    } else {
        settingContentEl.classList.remove("hide");
    }
    isDOBOpen = !isDOBOpen;
    console.log("Toggle", isDOBOpen);
};

const updateAge = () => {
    if (!dateOfBirth) return;

    const currentDate = new Date();
    let years = currentDate.getFullYear() - dateOfBirth.getFullYear();
    let months = currentDate.getMonth() - dateOfBirth.getMonth();
    let days = currentDate.getDate() - dateOfBirth.getDate();

    // Adjust months and years if months are negative
    if (months < 0) {
        years--;
        months += 12; // Add 12 months to fix the negative value
    }

    // Adjust days and months if days are negative
    if (days < 0) {
        const prevMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0); // Get the last day of the previous month
        days += prevMonth.getDate();
        months--;
    }

    // Display the results
    const hour = currentDate.getHours();
    const minute = currentDate.getMinutes();
    const second = currentDate.getSeconds();

    yearEl.innerHTML = makeTwoDigit(years);
    monthEl.innerHTML = makeTwoDigit(months);
    dayEl.innerHTML = makeTwoDigit(days);
    hourEl.innerHTML = makeTwoDigit(hour);
    minuteEl.innerHTML = makeTwoDigit(minute);
    secondEl.innerHTML = makeTwoDigit(second);
};

const localStorageGetter = () => {
    const year = parseInt(localStorage.getItem("year"), 10);
    const month = parseInt(localStorage.getItem("month"), 10);
    const date = parseInt(localStorage.getItem("date"), 10);

    if (year && month >= 0 && date) {
        dateOfBirth = new Date(year, month - 1, date); // Adjust for zero-based month.
    }
};

const contentToggler = () => {
    if (dateOfBirth) {
        initialTextEl.classList.add("hide");
        afterDOBBtnTxtEl.classList.remove("hide"); // Becomes visible.

        if (!timer) {
            timer = setInterval(updateAge, 1000);
        }
    } else {
        afterDOBBtnTxtEl.classList.add("hide");
        initialTextEl.classList.remove("hide");
    }
};

const setDOBHandler = () => {
    const dateString = dobInputEl.value;

    if (dateString) {
        dateOfBirth = new Date(dateString);

        if (!isNaN(dateOfBirth.getTime())) {
            localStorage.setItem("year", dateOfBirth.getFullYear());
            localStorage.setItem("month", dateOfBirth.getMonth() + 1); // Store as 1-based.
            localStorage.setItem("date", dateOfBirth.getDate());
        } else {
            console.error("Invalid date input.");
            return;
        }
    } else {
        dateOfBirth = null;
    }

    updateAge();
    contentToggler();
};

localStorageGetter();
contentToggler();

settingCogEl.addEventListener("click", toggleDateOfBirthSelector);
dobButtonEl.addEventListener("click", setDOBHandler);

console.log("here we go!!");

//--------------- Dom Elements ---------------------------------//

const step2Heading = document.querySelector(".new-selected-heading");
const step3Heading = document.querySelector(".finale-selected-heading");

const priceOne = document.querySelector(".step-1-price-1");
const priceTwo = document.querySelector(".step-1-price-2");
const stepTwoImg = document.querySelector(".step-2-img");
const stepThreeImg = document.querySelector(".step-3-img");

const form = {
  currentStep: 1,
  steps: document.querySelectorAll(".tab"),
  // nextButtons: document.querySelectorAll('[id^="next"]'),
  prevButtons: document.querySelectorAll(".prev-button"),
  submitButton: document.getElementById("submit"),
};

//--------------- Bike selection ---------------------//

const selectedBike = {
  type: "",
  priceOneDay: "",
  PriceExtra: "",
  imgURL: "",
};

const bikes = document.querySelectorAll(".main-bike-link");

bikes.forEach((bike) => {
  bike.addEventListener("click", (event) => {
    event.preventDefault();

    const bikeType = bike.getAttribute("data-bike-type");
    const bikePriceOneDay = bike.getAttribute("data-price-1-day");
    const bikePriceExtra = bike.getAttribute("data-price-extra");
    const bikeImgURL = bike.getAttribute("data-img-url");

    selectedBike.type = bikeType;
    selectedBike.priceOneDay = bikePriceOneDay;
    selectedBike.PriceExtra = bikePriceExtra;
    selectedBike.imgURL = bikeImgURL;

    step2Heading.innerHTML = selectedBike.type;
    priceOne.innerHTML = selectedBike.priceOneDay;
    priceTwo.innerHTML = selectedBike.PriceExtra;
    stepTwoImg.src = selectedBike.imgURL;

    const currentStep = document.querySelector(".tab.active");
    const nextStep = document.querySelector(
      `.tab[data-step="${form.currentStep + 1}"]`,
    );

    currentStep.classList.remove("active");
    currentStep.classList.add("hidden");

    nextStep.classList.remove("hidden");
    nextStep.classList.add("active");

    form.currentStep++;

    console.log(selectedBike);
  });
});

//--------------- Next & Prev button ---------------------//

const nextButton = document.getElementById("next");

nextButton.addEventListener("click", (event) => {
  event.preventDefault();

  const currentStep = document.querySelector(".tab.active");
  const nextStep = document.querySelector(
    `.tab[data-step="${form.currentStep + 1}"]`,
  );

  step3Heading.innerHTML = selectedBike.type;
  stepThreeImg.src = selectedBike.imgURL;

  currentStep.classList.remove("active");
  currentStep.classList.add("hidden");

  nextStep.classList.remove("hidden");
  nextStep.classList.add("active");

  form.currentStep++;
});

form.prevButtons.forEach((button) => {
  button.addEventListener("click", (event) => {
    event.preventDefault();

    const currentStep = document.querySelector(".tab.active");
    const nextStep = document.querySelector(
      `.tab[data-step="${form.currentStep - 1}"]`,
    );

    currentStep.classList.remove("active");
    currentStep.classList.add("hidden");

    nextStep.classList.remove("hidden");
    nextStep.classList.add("active");

    form.currentStep--;
  });
});

//--------------- add-ons ---------------------//
const check1 = document.getElementById("check1");
const check2 = document.getElementById("check2");
const check3 = document.getElementById("check3");

const checks = [check1, check2, check3];

//--------------- flatPickr + calculations ---------------------//

const inputDate = document.getElementById("input-date");
const inputTime = document.getElementById("input-time");
const durationDays = document.getElementById("days");


const totalPrice1 = document.querySelector(".total-price-calc");

const openingTimes = {
  Monday: { open: "14:00", close: "17:45" },
  Tuesday: { open: "10:00", close: "17:45" },
  Wednesday: { open: "10:00", close: "17:45" },
  Thursday: { open: "10:00", close: "17:45" },
  Friday: { open: "15:00", close: "17:45" },
  Saturday: { open: "10:00", close: "16:45" },
  Sunday: { open: "", close: "" },
};

const fp = flatpickr("#input-date", {
  minDate: "today",
  altInput: true,
  altFormat: "M j, Y",
  dateFormat: "d-m-Y",
  disable: [
    function (date) {
      return date.getDay() === 0 || date.getDay() === 7;
    },
  ],

  onchange: function (selectedDates, dateStr, instance) {
    const dayOfWeek = selectedDates[0].toLocaleDateString("en-US", {
      weekday: "long",
    });
    const openingTime = openingTimes[dayOfWeek].open;
    const closingTime = openingTimes[dayOfWeek].close;
    const times = generateTimeSlots(openingTime, closingTime, 30);
    populateTimeSlots(pickupTimeSelect, times);
  },
});

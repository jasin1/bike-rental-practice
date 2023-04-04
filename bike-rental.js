console.log("here we go!!");

//--------------- Dom Elements ---------------------------------//

const step2Heading = document.querySelector(".new-selected-heading");

const priceOne = document.querySelector(".step-1-price-1");
const priceTwo = document.querySelector(".step-1-price-2");
const stepTwoImg = document.querySelector(".step-2-img");

const counterMin = document.querySelector(".counter-minus");
const counterPlus = document.querySelector(".counter-plus");
const counterNum = document.querySelector(".count-num");
const countElement = document.querySelector(".counter-amount");

const durationDays = document.getElementById("days");
function disableDurationDays() {
  durationDays.disabled = true;
}
function enableDurationDays() {
  durationDays.disabled = false;
}

const inputDate = document.getElementById("input-date");

const inputTime = document.getElementById("input-time");
function resetInputTime() {
  inputTime.selectedIndex = 0;
  inputTime.options[0].text = "Select a time";
  inputTime.style.backgroundColor = "#f3f3f3";
}



const nextButton = document.getElementById("next");

const totalPrice1 = document.querySelector(".total-price-calc");

//--------------- add-ons ---------------------//
const check1 = document.getElementById("check1");
const check2 = document.getElementById("check2");
const check3 = document.getElementById("check3");

const checks = [check1, check2, check3];

const form = {
  currentStep: 1,
  steps: document.querySelectorAll(".tab"),
  // nextButtons: document.querySelectorAll('[id^="next"]'),
  prevButtons: document.querySelectorAll(".prev-button"),
  submitButton: document.getElementById("submit"),
};

// ------- tab 3 elements -------- //
const totalPrice2 = document.querySelector(".total-price-calc-2");
const step3Heading = document.querySelector(".finale-selected-heading");
const stepThreeImg = document.querySelector(".step-3-img");
const finaleDate = document.querySelector(".step-2-date");
const finaleTime = document.querySelector(".step-2-time");
const finaleDuration = document.querySelector(".step-2-duration");
const finaleBikeAmount = document.querySelector(".step-2-total-bikes");

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

    // Resets elements on tab 2
    disableDurationDays();
    inputTime.disabled = true;
    resetInputTime();
    counterMin.style.pointerEvents = "none";
    counterPlus.style.pointerEvents = "none";
    countElement.style.backgroundColor = "#f3f3f3";
    checks.forEach((check) => {
      check.disabled = true;
    });

    checks.forEach((check) => {
      check.checked = false;
    });

    nextButton.disabled = true;
    nextButton.style.opacity = 0.5;
    nextButton.style.pointerEvents = "none";
    console.log("Is nextButton disabled " + nextButton.disabled);
    counterNum.innerHTML = 1;

    //------------------------------------------

    const bikeType = bike.getAttribute("data-bike-type");
    const bikePriceOneDay = bike.getAttribute("data-price-1-day");
    const bikePriceExtra = bike.getAttribute("data-price-extra");
    const bikeImgURL = bike.getAttribute("data-img-url");

    selectedBike.type = bikeType;
    selectedBike.priceOneDay = bikePriceOneDay;
    selectedBike.PriceExtra = bikePriceExtra;
    selectedBike.imgURL = bikeImgURL;

    durationDays.value = durationDays.options[0].value;
    durationDays.options[0].selected = true;

    step2Heading.innerHTML = selectedBike.type;
    priceOne.innerHTML = selectedBike.priceOneDay;
    priceTwo.innerHTML = selectedBike.PriceExtra;
    stepTwoImg.src = selectedBike.imgURL;
    totalPrice1.innerHTML = selectedBike.priceOneDay;

    const currentStep = document.querySelector(".tab.active");
    const nextStep = document.querySelector(
      `.tab[data-step="${form.currentStep + 1}"]`,
    );

    currentStep.classList.remove("active");
    currentStep.classList.add("hidden");

    nextStep.classList.remove("hidden");
    nextStep.classList.add("active");

    form.currentStep++;

    //console.log(selectedBike);
  });
});

//--------------- Next & Prev button ---------------------//


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

//-------------------------- calculations ---------------------//

//------------ Bike amount counter ----------//

let bikeCount = 1;

function updateBikeCount(value) {
  bikeCount += value;
  counterNum.innerHTML = bikeCount;
  calculateTotalPrice();
}

counterMin.addEventListener("click", () => {
  if (bikeCount > 1) {
    updateBikeCount(-1);
  }
});

counterPlus.addEventListener("click", () => {
  updateBikeCount(1);
});

function calculateTotalPrice() {
  const days = durationDays.value;
  const basePrice = Number(selectedBike.priceOneDay);
  const extraPrice = Number(selectedBike.PriceExtra);

  let totalPrice = basePrice;

  if (days > 1) {
    totalPrice += extraPrice * (days - 1);
  }

  checks.forEach((check) => {
    if (check.checked) {
      totalPrice += Number(check.getAttribute("data-price"));
      //totalPrice *= bikeCount;
    }
  });

  totalPrice *= bikeCount;
  totalPrice1.innerHTML = totalPrice;
  totalPrice2.innerHTML = totalPrice1.innerHTML;
}

durationDays.addEventListener("change", calculateTotalPrice);

checks.forEach((check) => {
  check.addEventListener("change", calculateTotalPrice);
});

calculateTotalPrice();

const selectedDurationOption = durationDays.options[durationDays.selectedIndex];
const selectedDurationText = selectedDurationOption.textContent;

//------------ calculating opening times ----------//
const openingTimes = {
  Monday: { open: "14:00", close: "17:45" },
  Tuesday: { open: "10:00", close: "17:45" },
  Wednesday: { open: "10:00", close: "17:45" },
  Thursday: { open: "10:00", close: "17:45" },
  Friday: { open: "15:00", close: "17:45" },
  Saturday: { open: "10:00", close: "16:45" },
  Sunday: { open: "", close: "" },
};

//-----Generate Time slots---------//

function formatTime(date) {
  var hours = date.getHours();
  var minutes = date.getMinutes();
  hours = hours < 10 ? "0" + hours : hours;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  return hours + ":" + minutes;
}

function generateTimeSlots(start, end, interval) {
  const times = [];
  let current = new Date(`2000-01-01T${start}`);

  while (current <= new Date(`2000-01-01T${end}`)) {
    times.push(formatTime(current));
    current = new Date(current.getTime() + interval * 60000);
  }

  return times;
}

function populateTimeSlots(select, times) {
  select.innerHTML = "";

  times.forEach((time) => {
    const option = document.createElement("option");
    option.text = time;
    option.value = time;
    select.appendChild(option);
  });
}

inputTime.addEventListener("change",()=>{
  finaleTime.textContent = inputTime.value;
});

//------------ flatpickr -------//

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

  onChange: function (selectedDates, dateStr, instance) {
    const dayOfWeek = selectedDates[0].toLocaleDateString("en-US", {
      weekday: "long",
    });
    const openingTime = openingTimes[dayOfWeek].open;
    const closingTime = openingTimes[dayOfWeek].close;
    const times = generateTimeSlots(openingTime, closingTime, 30);
    populateTimeSlots(inputTime, times);

    finaleTime.textContent = inputTime.value;

    //enabling  inputTime checks durationDays and bike amount
    counterMin.style.pointerEvents = "auto";
    counterPlus.style.pointerEvents = "auto";
    inputTime.removeAttribute("disabled");
    inputTime.style.backgroundColor = "white";
    countElement.style.backgroundColor = "white";
    nextButton.disabled = false;
    nextButton.style.opacity = 1;
    nextButton.style.pointerEvents = "auto";
    enableDurationDays();
    checks.forEach((check) => {
      check.removeAttribute("disabled");
    });
  },
});

//--------------- Tab 3 fill  ----------------------- //




nextButton.addEventListener("click", (event) => {
  event.preventDefault();

  const currentStep = document.querySelector(".tab.active");
  const nextStep = document.querySelector(
    `.tab[data-step="${form.currentStep + 1}"]`,
  );

  step3Heading.innerHTML = selectedBike.type;
  stepThreeImg.src = selectedBike.imgURL;
  finaleDuration.textContent = selectedDurationText;
  finaleBikeAmount.textContent = counterNum.textContent;

  currentStep.classList.remove("active");
  currentStep.classList.add("hidden");

  nextStep.classList.remove("hidden");
  nextStep.classList.add("active");

  form.currentStep++;


  console.log("duration is "+ selectedDurationText);
  console.log("pickup time is "+ inputDate.value);
  console.log("pickup time is " + finaleTime.textContent);
  console.log(counterNum.textContent);
  
  //counterNum
});
//Mobile menu 
const burger = document.querySelector('.js-burger');
const menu = document.querySelector('.js-navigation');
const shadow = document.querySelector('.shadow')

burger.addEventListener("click", () => {
  if (menu.style.display === "block") {
    burger.classList.toggle("active")
    shadow.classList.toggle("active")
    menu.style.display = "none"
  }
  else {
    burger.classList.toggle("active")
    shadow.classList.toggle("active")
    menu.style.display = "block"
  }
})

//Bookmark toggle
const bookmark = document.getElementById('bookmark-container');
const checkBox = document.getElementById('bookmark');
// Morao sam ovde da menjam ikonicu, iz nekog razloga nije htelo preko css-a
bookmark.addEventListener('click', () => {
  if (checkBox.checked) {
    checkBox.checked = false;
    bookmark.style.backgroundImage = "url(/images/icon-bookmark.svg)"
  } else {
    checkBox.checked = true;
    bookmark.style.backgroundImage = "url(/images/icon-bookmark-green.svg)"
  }
});

//Main buttons open Pop-up
const body = document.querySelector('body')
const mainButtons = document.querySelectorAll("main button");
const popUp = document.querySelector(".pop-up");
const headPopUp = document.querySelector(".head-pop-up");

mainButtons.forEach((button) => {
  button.addEventListener("click", () => {
    let option = button.getAttribute("data-option");
    openPopUp(option);
  });
});

function openPopUp(option) {
  body.style.overflow = "hidden"
  popUp.style.top = "0";
  popUp.style.opacity = "1";
  headPopUp.classList.add("active");
  popUpOptions.classList.add("active");
  let selected = document.querySelector(
    '.payment-option[data-option="' + option + '"]'
  );
  selected.focus();
}

// Pop-up close
const closePopUp = document.getElementById("close-pop-up");
const end = document.getElementById("end");
const congratsPopUp = document.querySelector(".congrats-pop");

end.addEventListener("click", popUpClose);
closePopUp.addEventListener("click", popUpClose);
const popUpOptions = document.querySelector(".pop-up-options");

function popUpClose() {
  body.style.overflow = "visible"
  popUp.style.opacity = "0";
  headPopUp.classList.remove("active");
  popUpOptions.classList.remove("active");
  congratsPopUp.classList.remove("active");
  popUp.style.top = "-1000px";
}

//checking radio-input to true when element is in focus
const selectedOptions = document.querySelectorAll(".pop-up-options .payment-option");

selectedOptions.forEach((option) => {
  option.addEventListener("focus", () => {
    option.querySelector('input[type="radio"]').checked = true;
  });
});

// Initializing money status and updating display after bidding
const bank = document.getElementById("backed");
const backers = document.getElementById("backers");
const fundingMeter = document.getElementById("funding-meter");
const leftOne = document.querySelectorAll('[data-left="1"]');
const leftTwo = document.querySelectorAll('[data-left="2"]');

let totalAchieved = 89914;
let totalBackers = 5007;
let optionRemainings = [0, 101, 64];

function finish() {
  bank.textContent = `$${(totalAchieved / 1000).toFixed(3)}`;
  backers.textContent = `${(totalBackers / 1000).toFixed(3)}`;
  fundingMeter.value = totalAchieved;
  leftOne.forEach((option) => {
    option.innerHTML = `${optionRemainings[1]}<span> left</span>`;
  });
  leftTwo.forEach((option) => {
    option.innerHTML = `${optionRemainings[2]}<span> left</span>`;
  });
}

//Making bid functionalities and counting options and money
const optionButtons = document.querySelectorAll(".pop-up-options button");

optionButtons.forEach((button) => {
  button.addEventListener("click", () => {
    let option = parseFloat(button.getAttribute("data-option"));
    let input = document.querySelector('input[data-option="' + option + '"]');
    let deposit = parseFloat(input.value);
    totalAchieved += deposit;
    totalBackers += 1;
    optionRemainings[option] -= 1;
    finish();
    displayCongratsPop();
  });
});

//Final message after bidding
function displayCongratsPop() {
  headPopUp.classList.remove("active");
  popUpOptions.classList.remove("active");
  congratsPopUp.classList.add("active");
}





const pokewalker = document.querySelector(".pokewalker");
const screen = document.querySelector('.screen');
const onButton = document.querySelector('.btn-wrap.middle');
const walkingButton = document.querySelector("button.walking");
const stepsDiv = document.querySelector('.steps');
const numberSpan = stepsDiv.querySelector('.steps span');
var count = parseInt(stepsDiv.getAttribute('data-count'));
var pressTimer;
var pressLength = 1500;
var strideLength = 1500;
var isOff = true;
var intervalId;

function startWalking() {
  walkingButton.classList.add("active");
  pokewalker.classList.add("walking");

  intervalId = setInterval(function() {
    count++;
    stepsDiv.setAttribute('data-count', count);
    numberSpan.textContent = count;
  }, strideLength);
}

function stopWalking() {
  walkingButton.classList.remove("active");
  pokewalker.classList.remove("walking");

  if (intervalId) {
    clearInterval(intervalId);
  }
}

walkingButton.addEventListener("click", function() {
  if (walkingButton.classList.contains("active")) {
    stopWalking();
    walkingButton.textContent = "Walk";
  } else {
    startWalking();
    walkingButton.textContent = "Stop";
  }
});

walkingButton.addEventListener("touchstart", function(event) {
  event.preventDefault(); // Prevent click event after touch
  if (walkingButton.classList.contains("active")) {
    stopWalking();
    walkingButton.textContent = "Walk";
  } else {
    startWalking();
    walkingButton.textContent = "Stop";
  }
});

onButton.addEventListener("click", function() {
  if (isOff) {
    screen.classList.remove("off");
    screen.classList.add("mode-home");
    isOff = false;
  } else {
    screen.classList.add("off");
    screen.classList.remove(screen.classList.value.match(/\bmode-\S+/)[0]);
    isOff = true;
  }
});

onButton.addEventListener("touchstart", function() {
  pressTimer = setTimeout(function() {
    if (isOff) {
      screen.classList.remove("off");
      screen.classList.add("mode-home");
      isOff = false;
    } else {
      screen.classList.add("off");
      screen.classList.remove(screen.classList.value.match(/\bmode-\S+/)[0]);
      isOff = true;
    }
  }, pressLength);
});

onButton.addEventListener("touchend", function() {
  clearTimeout(pressTimer);
});
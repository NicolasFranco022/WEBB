const display = document.getElementById("display");
const boxes = document.querySelectorAll(".box");
const colorButtons = document.querySelectorAll(".color");
const shapeButtons = document.querySelectorAll(".shape");
const sizeInput = document.getElementById("size-input");
const flexDirection = document.getElementById("flex-direction");
const justifyContent = document.getElementById("justify-content");
const alignItems = document.getElementById("align-items");

colorButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    boxes.forEach(box => box.style.backgroundColor = btn.dataset.color);
  });
});

shapeButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    boxes.forEach(box => {
      if (btn.dataset.shape === "circle") {
        box.classList.add("circle");
      } else {
        box.classList.remove("circle");
      }
    });
  });
});

sizeInput.addEventListener("input", () => {
  boxes.forEach(box => {
    box.style.width = `${sizeInput.value}px`;
    box.style.height = `${sizeInput.value}px`;
  });
});

flexDirection.addEventListener("change", () => {
  display.style.flexDirection = flexDirection.value;
});

justifyContent.addEventListener("change", () => {
  display.style.justifyContent = justifyContent.value;
});

alignItems.addEventListener("change", () => {
  display.style.alignItems = alignItems.value;
});

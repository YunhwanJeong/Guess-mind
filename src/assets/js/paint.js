import { getSocket } from "./socket";

const canvas = document.getElementById("jsCanvas");
const colors = document.getElementsByClassName("jsColor");
const controls = document.getElementById("jsControls");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const save = document.getElementById("jsSave");

const ctx = canvas.getContext("2d");

const INITIAL_STYLE = "#2d3436";

ctx.lineWidth = 2.5;
ctx.fillStyle = "white";
ctx.fillRect(0, 0, canvas.width, canvas.height);
ctx.strokeStyle = INITIAL_STYLE;
ctx.fillStyle = INITIAL_STYLE;

let isPainting = false;
let isFilling = false;

const stopPainting = () => {
  isPainting = false;
};

const startPainting = () => {
  isPainting = true;
};

const beginPath = (x, y) => {
  ctx.beginPath();
  ctx.moveTo(x, y);
};

const strokePath = (x, y, color = null) => {
  let currentStyle = ctx.strokeStyle;
  if (color !== null) {
    ctx.strokeStyle = color;
  }
  ctx.lineTo(x, y);
  ctx.stroke();
  ctx.strokeStyle = currentStyle;
};

const onMouseMove = event => {
  const x = event.offsetX;
  const y = event.offsetY;
  if (!isPainting) {
    beginPath(x, y);
    getSocket().emit(window.events.beginPath, { x, y });
  } else {
    strokePath(x, y);
    getSocket().emit(window.events.strokePath, {
      x,
      y,
      color: ctx.strokeStyle
    });
  }
};

const handleClickedColor = event => {
  const color = event.target.style.backgroundColor;
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
};

const handleRange = event => {
  const size = event.target.value;
  ctx.lineWidth = size;
};

const handleMode = () => {
  if (!isFilling) {
    isFilling = true;
    mode.innerText = "Paint";
  } else {
    isFilling = false;
    mode.innerText = "Fill";
  }
};

const fill = (color = null) => {
  let currentColor = ctx.fillStyle;
  if (color !== null) {
    ctx.fillStyle = color;
  }
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = currentColor;
};

const handleFilling = () => {
  if (isFilling) {
    fill();
    getSocket().emit(window.events.fill, { color: ctx.fillStyle });
  }
};

const handleContextMenu = event => {
  event.preventDefault();
};

const handleSave = () => {
  const image = canvas.toDataURL();
  const link = document.createElement("a");
  link.href = image;
  link.download = "My Drawing 🖌";
  link.click();
};

const canvasInit = () => {
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", stopPainting);
  canvas.addEventListener("click", handleFilling);
  canvas.addEventListener("contextmenu", handleContextMenu);
};

const controlsInit = () => {
  range.addEventListener("input", handleRange);
  mode.addEventListener("click", handleMode);
  Array.from(colors, color =>
    color.addEventListener("click", handleClickedColor)
  );
  save.addEventListener("click", handleSave);
};

if (canvas) {
  canvasInit();
}

if (controls) {
  controlsInit();
}

export const handleBeganPath = ({ x, y }) => beginPath(x, y);
export const handleStrokedPath = ({ x, y, color }) => strokePath(x, y, color);
export const handleFilled = ({ color }) => fill(color);

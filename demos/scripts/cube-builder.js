let cubeFaces = ["front", "back", "left", "right", "top", "bottom"];
let cube_container = document.getElementById("cubeParent");
let cube = document.querySelector("cube");

let currentTool = 0;

let cubeColor;
let cubeOpacity;
let borderColor;
let borderWidth;
// Global vars
let cubePlacementOffset = 100;
let perspective = 300;
let sceneRotationX = 0;
let sceneRotationY = 0;
let rotationIncrement = 45;
let shiftpressed = false;
document.onkeydown = function (e) {
  if (e.key == "a") {
    sceneRotationY -= rotationIncrement;
    document.documentElement.style.setProperty(
      "--ySceneRotation",
      sceneRotationY + "deg"
    );
  }
  if (e.key == "d") {
    sceneRotationY += rotationIncrement;
    document.documentElement.style.setProperty(
      "--ySceneRotation",
      sceneRotationY + "deg"
    );
  }
  if (e.key == "w") {
    sceneRotationX += rotationIncrement;
    document.documentElement.style.setProperty(
      "--xSceneRotation",
      sceneRotationX + "deg"
    );
  }
  if (e.key == "s") {
    sceneRotationX -= rotationIncrement;
    document.documentElement.style.setProperty(
      "--xSceneRotation",
      sceneRotationX + "deg"
    );
  }
  if (e.key == "e") {
    perspective += 100;
    document.documentElement.style.setProperty(
      "--perspective",
      perspective + "px"
    );
  }
  if (e.key == "q") {
    perspective -= 100;
    document.documentElement.style.setProperty(
      "--perspective",
      perspective + "px"
    );
  }
  if (e.key == "Shift") {
    shiftpressed = true;
  } else {
    shiftpressed = false;
  }
  if (e.key == "1") {
    ChangeTool(0);
  }
  if (e.key == "2") {
    ChangeTool(1);
  }
  if (e.key == "3") {
    ChangeTool(2);
  }
};

function ChangeTool(tool) {
  switch (tool) {
    case 0:
      console.log("Changing tool to 0");
      currentTool = 0;
      break;
    case 1:
      console.log("Changing tool to 1");
      currentTool = 1;
      break;
    case 2:
      console.log("Changing tool to 2");
      currentTool = 2;
      break;
  }
}

function CreateCube(x, y, z, color, opacity, bcolor, bwidth) {
  let cubeElement = document.createElement("div");
  cubeElement.classList.add("cube");

  for (let i = 0; i < 6; i++) {
    let cubeFace = document.createElement("div");

    cubeFace.classList.add("cube-face", cubeFaces[i]);
    cubeFace.style.borderColor = bcolor;
    cubeFace.style.borderWidth = bwidth + "px";
    cubeFace.style.borderStyle = "solid";
    cubeFace.style.backgroundColor = color;
    cubeFace.style.opacity = opacity;
    cubeFace.onclick = function () {
      let style = window.getComputedStyle(this.parentElement);
      let matrix = new DOMMatrixReadOnly(style.transform);
      //   X
      let currentCubeX = matrix.m41;
      let currentCubeY = matrix.m42;
      let currentCubeZ = matrix.m43;
      switch (currentTool) {
        case 0:
          document.documentElement.style.setProperty(
            "--xSceneOffset",
            currentCubeX * -1 + "px"
          );
          document.documentElement.style.setProperty(
            "--ySceneOffset",
            currentCubeY * -1 + "px"
          );
          document.documentElement.style.setProperty(
            "--zSceneOffset",
            currentCubeZ * -1 + "px"
          );
          break;
        case 1:
          console.log(
            "clicked cube coords are x:",
            currentCubeX,
            "y:",
            currentCubeY,
            "z:",
            currentCubeZ
          );
          //   Y
          console.log(matrix.m42);
          if (this.classList.contains("front")) {
            CreateCube(
              currentCubeX + "px",
              currentCubeY + "px",
              currentCubeZ + cubePlacementOffset + "px",
              cubeColor,
              cubeOpacity,
              borderColor,
              borderWidth
            );
          }
          if (this.classList.contains("back")) {
            CreateCube(
              currentCubeX + "px",
              currentCubeY + "px",
              currentCubeZ - cubePlacementOffset + "px",
              cubeColor,
              cubeOpacity,
              borderColor,
              borderWidth
            );
          }
          if (this.classList.contains("left")) {
            CreateCube(
              currentCubeX - cubePlacementOffset + "px",
              currentCubeY + "px",
              currentCubeZ + "px",
              cubeColor,
              cubeOpacity,
              borderColor,
              borderWidth
            );
          }
          if (this.classList.contains("right")) {
            CreateCube(
              currentCubeX + cubePlacementOffset + "px",
              currentCubeY + "px",
              currentCubeZ + "px",
              cubeColor,
              cubeOpacity,
              borderColor,
              borderWidth
            );
          }
          if (this.classList.contains("top")) {
            CreateCube(
              currentCubeX + "px",
              currentCubeY - cubePlacementOffset + "px",
              currentCubeZ + "px",
              cubeColor,
              cubeOpacity,
              borderColor,
              borderWidth
            );
          }
          if (this.classList.contains("bottom")) {
            CreateCube(
              currentCubeX + "px",
              currentCubeY + cubePlacementOffset + "px",
              currentCubeZ + "px",
              cubeColor,
              cubeOpacity,
              borderColor,
              borderWidth
            );
          }
          break;
        case 2:
          this.parentElement.remove();
          break;
      }
    };
    cubeElement.appendChild(cubeFace);
  }
  cubeElement.style.transform =
    "translateX(" + x + ") translateY(" + y + ") translateZ(" + z + ")";

  cube_container.appendChild(cubeElement);
}

function UpdateValues() {
  let cubeColorInput = document.getElementById("colorInput");
  cubeColor = cubeColorInput.value;
  let cubeOpacityInput = document.getElementById("opacityInput");
  cubeOpacity = parseFloat(cubeOpacityInput.value);
  let cubeBorderColorInput = document.getElementById("borderColorInput");
  borderColor = cubeBorderColorInput.value;
  let cubeBorderWidthInput = document.getElementById("borderWidthInput");
  borderWidth = parseFloat(cubeBorderWidthInput.value);
}
UpdateValues();
CreateCube(0, 0, 0, cubeColor, cubeOpacity, borderColor, borderWidth);
document.getElementById("select-tool").classList.add("selected");

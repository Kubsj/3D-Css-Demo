let cubeFaces = ["front", "back", "left", "right", "top", "bottom"];
let cube_container = document.getElementById("cubeParent");
let cube = document.querySelector("cube");

// Global vars
let perspective = 300;
let sceneRotationX = 0;
let sceneRotationY = 0;
let rotationIncrement = 45;

let currentCubeOffsetX = 0;
let currentCubeOffsetY = 0;

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
};

function CreateCube(x, y, color) {
  let cubeElement = document.createElement("div");
  cubeElement.classList.add("cube");
  for (let i = 0; i < 6; i++) {
    let cubeFace = document.createElement("div");

    cubeFace.classList.add("cube-face", cubeFaces[i]);

    cubeFace.style.backgroundColor = color;

    cubeFace.onclick = function () {
      const style = window.getComputedStyle(this.parentElement);
      const matrix = new DOMMatrixReadOnly(style.transform);
      //   X
      console.log(matrix.m41);
      //   Y
      console.log(matrix.m42);
    };
    cubeElement.appendChild(cubeFace);
  }
  cubeElement.style.transform = "translateX(" + x + ") translateY(" + y + ")";

  cube_container.appendChild(cubeElement);
}
CreateCube(0, 0, "#00ff00");

function getTranslateXY(element) {
  const style = window.getComputedStyle(element);
  const matrix = new DOMMatrixReadOnly(style.transform);
  return {
    translateX: matrix.m41,
    translateY: matrix.m42,
  };
}

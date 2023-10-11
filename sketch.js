let width = 800,
  height = 600;

class BubbleSortAnimation {
  constructor({ array, codeLines, origin }) {
    this.array = array;
    this.codeLines = codeLines;
    this.origin = origin;
  }

  _drawArray({ array }) {
    if (!array) return;
    // generic drawing of the array as boxes
    let x = this.origin.x,
      y = this.origin.y;
    let boxWidth = 50,
      boxHeight = 50;
    let boxMargin = 10;
    let boxColor = color(255, 255, 255);
    let boxStrokeWeight = 2;
    let boxStrokeColor = color(122, 122, 122);
    let boxTextColor = color(122, 122, 122);
    let boxTextSize = 20;
    let boxTextFont = "monospace";
    let boxTextStrokeWeight = 0;
    let boxTextStrokeColor = color(255, 0, 0);

    y = height / 2 - boxHeight * 2;
    for (let i = 0; i < array.length; i++) {
      let boxX = x + i * (boxWidth + boxMargin);

      let boxY = y;
      let boxText = array[i];

      // draw box
      stroke(boxStrokeColor);
      strokeWeight(boxStrokeWeight);
      fill(boxColor);
      rect(boxX, boxY, boxWidth, boxHeight);

      // draw box text
      stroke(boxTextStrokeColor);
      strokeWeight(boxTextStrokeWeight);
      fill(boxTextColor);
      textFont(boxTextFont);
      textSize(boxTextSize);
      text(
        boxText,
        boxX + boxWidth / 2 - boxMargin / 2,
        boxY + boxHeight / 2 + boxMargin / 2
      );
    }
  }

  _drawVariables({ variables }) {
    // draw variables
    let x = this.origin.x,
      y = height / 2 - 30;
    let boxWidth = 150,
      boxHeight = 50;

    let boxMargin = 10;
    let boxColor = color(255, 255, 255);
    let boxStrokeWeight = 2;
    let boxStrokeColor = color(122, 122, 122);
    let boxTextColor = color(122, 122, 122);
    let boxTextSize = 20;
    let boxTextFont = "monospace";
    let boxTextStrokeWeight = 0;
    let boxTextStrokeColor = color(255, 0, 0);

    let keys = Object.keys(variables);
    keys.sort();

    for (let i = 0; i < keys.length; i++) {
      let variable = keys[i];
      if (variable === "array") {
        continue;
      }
      let boxX = x;
      let boxY = y;
      let boxText = `${variable}: ${
        variables[variable] === undefined ? "" : variables[variable]
      }`;

      // draw box
      stroke(boxStrokeColor);
      strokeWeight(boxStrokeWeight);
      fill(boxColor);
      rect(boxX, boxY, boxWidth, boxHeight);

      // draw box text
      stroke(boxTextStrokeColor);
      strokeWeight(boxTextStrokeWeight);
      fill(boxTextColor);
      textFont(boxTextFont);
      textSize(boxTextSize);
      text(
        boxText,
        boxX + 20 - boxMargin / 2,
        boxY + boxHeight / 2 + boxMargin / 2
      );

      y += boxHeight + boxMargin;
    }
  }

  draw({ currentTrace }) {
    this._drawArray({ array: currentTrace.variables?.array });
    this._drawVariables({
      variables: currentTrace.variables,
    });
  }
}

class SortingAlgorithmViewer {
  constructor({ array, algorithm }) {
    this.array = array;
    this.algorithm = algorithm;

    if (this.algorithm === "bubbleSort") {
      this.codeLines = [
        "int bubbleSort(int arr[], int n)",
        "{",
        "   int trocou, temp;", // 2
        "   for (int i = 0; i < n-1; i++)", // 3
        "   {",
        "     trocou = 0;", // 4
        "     for (j = 0; j < n-i-1; j++)", // 5
        "     {",
        "        if (arr[j] > arr[j+1])", // 6
        "        {",
        "           temp = arr[j];", // 7
        "           arr[j] = arr[j+1];", // 8
        "           arr[j+1] = temp;", // 9
        "           trocou = 1;", // 10
        "        }",
        "     }",
        "     if (trocou == 0)", // 11
        "        break;", // 12
        "   }",
        "   ",
        "   return 0;", // 13
        "}",
      ];
      this.tracer = [
        {
          lineIndex: 0,
          variables: {
            array: this.array,
          },
        },
      ];
      this.bubbleSort([...this.array], this.tracer);
      this.debugger = new CodeDebugger({
        codeLines: this.codeLines,
        tracer: this.tracer,
      });
      this.animation = new BubbleSortAnimation({
        array: [...this.array],
        codeLines: this.codeLines,
        origin: { x: width / 2, y: 0 },
      });
    }
  }

  next() {
    this.debugger.next();
  }

  prev() {
    this.debugger.prev();
  }

  /**
   * "int bubbleSort(int arr[], int n)",
      "{",
      "   int trocou, temp;", // 2
      "   for (int i = 0; i < n-1; i++)", // 3
      "   {",
      "     trocou = 0;", // 5
      "     for (j = 0; j < n-i-1; j++)", // 6
      "     {",
      "        if (arr[j] > arr[j+1])", // 8
      "        {",
      "           temp = arr[j];", // 10
      "           arr[j] = arr[j+1];", // 11
      "           arr[j+1] = temp;", // 12
      "           trocou = 1;", // 13
      "        }",
      "     }", // 15
      "     if (trocou == 0)", // 16
      "        break;", // 17
      "   }",
      "   ",
      "   return 0;", // 20
      "}",
   * @param {*} v 
   * @param {*} stepTracer 
   */
  bubbleSort(v, stepTracer) {
    let variables = {
      i: undefined,
      j: undefined,
      trocou: undefined,
      temp: undefined,
      array: [...v],
    };

    let trocou, temp, i, j;

    stepTracer.push({
      lineIndex: 2,
      variables: variables,
    });

    for (i = 0; i < v.length - 1; i++) {
      stepTracer.push({
        lineIndex: 3,
        variables: {
          i: i + 0,
          j: j,
          trocou: trocou,
          temp: temp,
          array: [...v],
        },
      });
      trocou = 0;

      stepTracer.push({
        lineIndex: 5,
        variables: {
          i: i,
          j: j,
          trocou: trocou,
          temp: temp,
          array: [...v],
        },
      });

      for (j = 0; j < v.length - i - 1; j++) {
        stepTracer.push({
          lineIndex: 6,
          variables: {
            i: i,
            j: j,
            trocou: trocou,
            temp: temp,
            array: [...v],
          },
        });

        stepTracer.push({
          lineIndex: 8,
          variables: {
            i: i,
            j: j,
            trocou: trocou,
            temp: temp,
            array: [...v],
          },
        });
        if (v[j] > v[j + 1]) {
          temp = v[j];
          stepTracer.push({
            lineIndex: 10,
            variables: {
              i: i,
              j: j,
              trocou: trocou,
              temp: v[j],
              array: [...v],
            },
          });
          v[j] = v[j + 1];
          stepTracer.push({
            lineIndex: 11,
            variables: {
              i: i,
              j: j,
              trocou: trocou,
              temp: temp,
              array: [...v],
            },
          });
          v[j + 1] = temp;
          stepTracer.push({
            lineIndex: 12,
            variables: {
              i: i,
              j: j,
              trocou: trocou,
              temp: temp,
              array: [...v],
            },
          });
          trocou = 1;
          stepTracer.push({
            lineIndex: 13,
            variables: {
              i: i,
              j: j,
              trocou: 1,
              temp: temp,
              array: [...v],
            },
          });
        }
      }
      stepTracer.push({
        lineIndex: 15,
        variables: {
          i: i,
          j: j,
          trocou: trocou,
          temp: temp,
          array: [...v],
        },
      });
      if (trocou == 0) {
        stepTracer.push({
          lineIndex: 16,
          variables: {
            i: i,
            j: j,
            trocou: trocou,
            temp: temp,
            array: [...v],
          },
        });
        stepTracer.push({
          lineIndex: 17,
          variables: {
            i: i,
            j: j,
            trocou: trocou,
            temp: temp,
            array: [...v],
          },
        });
        break;
      }
    } // 13
    stepTracer.push({
      lineIndex: 20,
      variables: {
        i: i,
        j: j,
        trocou: trocou,
        temp: temp,
        array: [...v],
      },
    });
  }

  draw({ x, y, size, textColor }) {
    this.debugger.draw({ x, y, size, textColor });
    this.animation.draw({ currentTrace: this.debugger.currentLine() });
  }
}

class CodeDebugger {
  constructor({ codeLines, tracer }) {
    this.lines = codeLines;
    this.stepper = 0;
    this.highlightedLine = { x: 0, y: 0 };
    this.code = this.toString();
    this.tracer = tracer;
  }

  _execute() {}

  addLine(line) {
    this.lines?.push(line);
  }

  toString() {
    return this.lines.join("\n");
  }

  currentLine() {
    return this.tracer[this.stepper];
  }

  next() {
    this.stepper++;

    if (this.stepper >= this.tracer.length) {
      this.stepper = this.stepper;
    }
  }

  prev() {
    this.stepper--;
    this.stepper = this.stepper < 0 ? 0 : this.stepper;
  }

  // private method that draws the code
  _drawCode({ x, y, size, textColor }) {
    let code = this.toString();
    textFont("monospace");
    textSize(size);
    strokeWeight(0);
    fill(textColor);

    text(code, x, y);
  }

  // check how many blank spaces are in the beginning of the string
  _getBlankSpaces(str) {
    let blankSpaces = 0;
    for (let i = 0; i < str.length; i++) {
      if (str[i] === " " || str[i] === "\t") {
        blankSpaces++;
      } else {
        break;
      }
    }

    return blankSpaces;
  }

  _drawHighlightedLine({ x, y, size }) {
    for (let i = 0; i < this.lines.length; i++) {
      let currentLine = this.lines[i];
      let currentLineX = x + this._getBlankSpaces(currentLine) * 6.7;
      let currentLineY = y + i * size - size / 1.2;
      let currentLineTextWidth = textWidth(currentLine);
      currentLineTextWidth -= this._getBlankSpaces(currentLine) * 2.7;
      if (i === this.tracer[this.stepper].lineIndex) {
        this.highlightedLine = {
          x: currentLineX,
          y: currentLineY,
          width: currentLineTextWidth,
        };
        break;
      }
      y += 3.8;
    }

    // draw red rectangle to show line
    stroke(255, 0, 0);
    strokeWeight(2);
    noFill();
    rect(
      this.highlightedLine.x,
      this.highlightedLine.y,
      this.highlightedLine.width,
      size
    );
  }

  draw({ x, y, size, textColor }) {
    if (y === "middle") {
      y = height / 2 - (this.lines.length * size) / 2;
    }

    this._drawCode({ x, y, size, textColor });
    this._drawHighlightedLine({ x, y, size });
  }
}

let sortingViewer, txtArray;

function setup() {
  createCanvas(width, height);
  sortingViewer = new SortingAlgorithmViewer({
    array: [6, 4, 5, 1, 7, 8],
    algorithm: "bubbleSort",
  });

  txtArray = createInput("");
  txtArray.position(width / 2, 10);
  txtArray.size(200);

  button = createButton("recomeçar");
  button.position(width / 2 + 210, 10);
  button.mousePressed(resetArray);
}

function resetArray() {
  let valArray = txtArray.value();
  if (valArray) {
    let array = valArray.split(",").map((v) => parseInt(v));
    if (array.length > 0) {
      sortingViewer = new SortingAlgorithmViewer({
        array: array,
        algorithm: "bubbleSort",
      });
    }

    // clean txtArray value
    txtArray.value("");
  }
}

function draw() {
  background(255);

  sortingViewer.draw({
    x: 30,
    y: "middle",
    size: 15,
    textColor: 0,
  });
}

// listen to keyboard
function keyPressed(keyCode) {
  if (keyCode.key === "ArrowLeft") {
    sortingViewer.prev();
  } else if (keyCode.key === "ArrowRight") {
    sortingViewer.next();
  }
}

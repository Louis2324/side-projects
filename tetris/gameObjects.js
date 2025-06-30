const TETROMINO_SHAPES = {
    I: [[1,1,1,1]],
    O: [[1,1],[1,1]],
    T: [[0,1,0],[1,1,1]],
    S: [[0,1,1],[1,1,0]],
    Z: [[1,1,0],[0,1,1]],
    J: [[1,0,0],[1,1,1]],
    L: [[0,0,1],[1,1,1]],
    B: [[0,0,0],[0,0,1]],
    C: [[1,1,1],[1,0,1]],
    F: [[1,1,1],[1,1,1]],
    LI:[[1,1,1,1,1,1]]
  };
  
  const TETROMINO_COLORS = {
    I:  "#5BC0EB",  // Sky Blue (calm for I)
    O:  "#FDE74C",  // Bright Yellow (solid O)
    T:  "#9D4EDD",  // Vibrant Purple (smart T)
    S:  "#00D26A",  // Bright Green (energetic S)
    Z:  "#FF5964",  // Sharp Red (aggressive Z)
    J:  "#4F86F7",  // Deep Blue (anchored J)
    L:  "#FFA630",  // Warm Orange (energetic L)
    B:  "#CBAACB",  // Soft Purple (weird little B)
    C:  "#FFB400",  // Golden Orange (protective C)
    F:  "#37474F",  // Heavy Dark Gray (unstoppable F)
    LI: "#673AB7"   // Royal Deep Purple (infinite LI)
  };
  
  export class GameObject {
    constructor(canvas, blockSize, context, shapeName, grid, totalCols, totalRows) {
      this.canvas    = canvas;
      this.blockSize = blockSize;
      this.context   = context;
      this.grid      = grid;        // grid[row][col] = occupied?
      this.totalCols = totalCols;   // width in blocks
      this.totalRows = totalRows;   // height in blocks
  
      // deep copy of shape matrix
      this.matrix = TETROMINO_SHAPES[shapeName].map(row => row.slice());
      this.color  = TETROMINO_COLORS[shapeName];
  
      // start centered at top
      const shapeWidth  = this.matrix[0].length;
      const startCol    = Math.floor((totalCols - shapeWidth) / 2);
      this.position = { col: startCol, row: 0 };  
    }
  
    draw() {
      this.context.fillStyle   = this.color;
      this.context.strokeStyle = "black";
  
      // for each cell in the shape matrix
      this.matrix.forEach((matrixRow, rowIndex) => {
        matrixRow.forEach((cell, colIndex) => {
          if (cell) {
            // compute pixel position
            const pixelX = (this.position.col + colIndex) * this.blockSize;
            const pixelY = (this.position.row + rowIndex) * this.blockSize;
  
            this.context.fillRect(pixelX, pixelY, this.blockSize, this.blockSize);
            this.context.strokeRect(pixelX, pixelY, this.blockSize, this.blockSize);
          }
        });
      });
    }
  
    moveLeft() {
      const newCol = this.position.col - 1;
      if (!this._collision(this.matrix, newCol, this.position.row)) {
        this.position.col = newCol;
      }
    }
  
    moveRight() {
      const newCol = this.position.col + 1;
      if (!this._collision(this.matrix, newCol, this.position.row)) {
        this.position.col = newCol;
      }
    }
  
    moveDown() {
      const newRow = this.position.row + 1;
      if (!this._collision(this.matrix, this.position.col, newRow)) {
        this.position.row = newRow;
        return true;
      } else {
        this.lock();
        return false;
      }
    }
  
    rotate() {
      const M = this.matrix;
      const rotated = M[0].map((_, c) =>
        M.map(row => row[c]).reverse()
      );
      if (!this._collision(rotated, this.position.col, this.position.row)) {
        this.matrix = rotated;
      }
    }
  
    lock() {
      this.matrix.forEach((matrixRow, rowIndex) => {
        matrixRow.forEach((cell, colIndex) => {
          if (cell) {
            const gridCol = this.position.col + colIndex;
            const gridRow = this.position.row + rowIndex;
            if (
              gridRow >= 0 &&
              gridRow < this.totalRows &&
              gridCol >= 0 &&
              gridCol < this.totalCols
            ) {
              this.grid[gridRow][gridCol] = true;
            }
          }
        });
      });
    }
  
    _collision(matrix, testCol, testRow) {
      for (let rowIndex = 0; rowIndex < matrix.length; rowIndex++) {
        for (let colIndex = 0; colIndex < matrix[rowIndex].length; colIndex++) {
          if (!matrix[rowIndex][colIndex]) continue;
  
          const gridCol = testCol + colIndex;
          const gridRow = testRow + rowIndex;
          if (
            gridCol < 0 ||
            gridCol >= this.totalCols ||
            gridRow >= this.totalRows
          ) {
            return true;
          }
          if (gridRow >= 0 && this.grid[gridRow][gridCol]) {
            return true;
          }
        }
      }
      return false;
    }
  }
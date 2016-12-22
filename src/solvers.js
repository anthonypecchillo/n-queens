/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other



window.findNRooksSolution = function(n) {
  var row;
  var solution = [];
  for (var i = 0; i < n; i++) {
    row = new Array(n).fill(0);
    row[i] = 1;
    solution.push(row);
  }

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var factorial = function(n) {
    if (n === 0) {
      return 1;
    } else {
      return n * factorial(n - 1);
    }
  };
  var solutionCount = factorial(n);
  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var board, solution;

  var generateEmptyBoard = function() {
    var emptyBoard = [];
    for (var i = 0; i < n; i++) {
      row = new Array(n).fill(0);
      emptyBoard.push(row);
    }
    return emptyBoard;
  };

  var generateBoard = function() {
    var solution = generateEmptyBoard();
    
    for (var i = 0; i < n; i++) {
      newRow = new Array(n).fill(0);
      newRow[Math.floor(Math.random() * n)] = 1;
      solution[i] = newRow;
      board = new Board(solution);
      var hasConflict = board.hasAnyQueensConflicts();
      
      if (hasConflict) {
        solution = generateEmptyBoard();
        i = -1;           
      }
    
    }
    return solution;
  };
  
  solution = generateBoard();
  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};

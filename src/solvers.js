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

//-------------------------------------------------------------------------------------
// THIS WAS OUR FIRST IDEA:
//-------------------------------------------------------------------------------------
// It generates random boards and checks them over and over until 
// we arrive at a possible solution with no conflicts

// window.findNQueensSolution = function(n) {
//   var board, solution;

//   var generateEmptyBoard = function() {
//     var emptyBoard = [];
//     for (var i = 0; i < n; i++) {
//       row = new Array(n).fill(0);
//       emptyBoard.push(row);
//     }
//     return emptyBoard;
//   };

//   var generateBoard = function() {
//     var solution = generateEmptyBoard();
    
//     for (var i = 0; i < n; i++) {
//       newRow = new Array(n).fill(0);
//       newRow[Math.floor(Math.random() * n)] = 1;
//       solution[i] = newRow;
//       board = new Board(solution);
//       var hasConflict = board.hasAnyQueensConflicts();
      
//       if (hasConflict) {
//         solution = generateEmptyBoard();
//         i = -1;           
//       }
    
//     }
//     return solution;
//   };
  
//   solution = generateBoard();
//   console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
//   return solution;
// };
//-------------------------------------------------------------------------------------


//-------------------------------------------------------------------------------------
// SECOND IDEA WRITTEN DURING LUNCH:
//-------------------------------------------------------------------------------------
// It iterates through a pre-made board with a queen starting at position
// [0][1].  At each position of the board, a 0 is toggled to a 1, a check
// for conflicts runs, and if found the 1 is toggled back to a 0.  We run
// through the entire board doing this until we arrive at a solution.
//
// This idea works for n = 4, n = 5, but cannot find a solution at n = 6.
//
// Conclusion: 
// -----------
// The second queen placed without conflict is the last attempt we ever make
// at placing that queen.  If we don't arrive at a solution with that
// for the second queen, its game over.  We need a recursive function here to
// take us back to the second queen if/when that position doesn't work out 
// downstream so that we can start over placing the second queen at a position
// directly to the right of the attempted position.

// window.findNQueensSolution = function(n) {

//   var generateStarterBoard = function() {
//     var emptyBoard = [];
//     var starterBoard;

//     for (var i = 0; i < n; i++) {
//       row = new Array(n).fill(0);
//       emptyBoard.push(row);
//     }
//     starterBoard = emptyBoard;
//     starterBoard[0][1] = 1; 
//     return starterBoard;
//   };

//   var board = new Board(generateStarterBoard());
//   var solution = [];
    
//   for (var i = 0; i < n; i++) {
//     var j = (i === 0) ? 2 : 0;
//     for (j; j < n; j++) {
//       board.togglePiece(i, j);
//       if (board.hasAnyQueensConflicts()) {
//         board.togglePiece(i, j);
//       }      
//     }
//   }

//   console.log(board);

//   for (var k = 0; k < n; k++) {
//     solution.push(board.attributes[k]);
//   }
  
//   return solution;

// };

//-------------------------------------------------------------------------------------

//-------------------------------------------------------------------------------------
// THIRD IDEA WRITTEN DURING LUNCH:
//-------------------------------------------------------------------------------------
// The idea here is to implement a recursive function as described
// in Anthony's Second Idea Conclusion and inject it into that code
// to solve the second queen problem.
//
// Conclusion: 
// -----------
// We'll see what happens after I try it!

window.findNQueensSolution = function(n) {
  
  var generateStarterBoard = function() {
    var emptyBoard = [];
    var starterBoard;

    for (var i = 0; i < n; i++) {
      row = new Array(n).fill(0);
      emptyBoard.push(row);
    }
    starterBoard = emptyBoard;
    starterBoard[0][1] = 1; 
    return starterBoard;
  };

  // ----------------
  var board = new Board(generateStarterBoard());
  var solution = [];
  // ----------------    

  var recursiveFunction = function(inputBoard, startPosition) {
    for (j; j < n; j++) {
      board.togglePiece(i, j);
      if (board.hasAnyQueensConflicts()) {
        board.togglePiece(i, j);
      }

    }
    return board;
  };

  // ----------------
  for (var i = 0; i < n; i++) {
    var j = (i === 0) ? 2 : 0;
    board = recursiveFunction(board, j);
  }
  // ----------------

  
  console.log(board);
  for (var k = 0; k < n; k++) {
    solution.push(board.attributes[k]);
  }
  return solution;

};

// var recursiveFunction = function(inputBoard, startPosition) {
//     for (j; j < n; j++) {
//       board.togglePiece(i, j);
//       if (board.hasAnyQueensConflicts()) {
//         board.togglePiece(i, j);
//         recursiveFunction(board, j + 1);
//         return;
//       }
//     }
//     return board;
//   };
  


//   for (var i = 0; i < n; i++) {
//     var j = (i === 0) ? 2 : 0;
//     recursiveFunction(board, j);
//   }

//   var j = (i === 0) ? 2 : 0;

//   return solution;
// };
//-------------------------------------------------------------------------------------





// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};

import React from 'react';
import Circle from './Circle.jsx';

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state= {
      blackIsNext: true,
      gameIsDone: false,
      winner: '',
      col1: Array(7).fill(null),
      col2: Array(7).fill(null),
      col3: Array(7).fill(null),
      col4: Array(7).fill(null),
      col5: Array(7).fill(null),
      col6: Array(7).fill(null),
      col7: Array(7).fill(null)
    };
    this.handleClick = this.handleClick.bind(this);
    this.hasWinnerInCol = this.hasWinnerInCol.bind(this);
    this.hasAnyColWinners = this.hasAnyColWinners.bind(this);
    this.hasWinnerInRow = this.hasWinnerInRow.bind(this);
    this.hasAnyRowWinners = this.hasAnyRowWinners.bind(this);
    this.hasWinnerInMajorDiagonal = this.hasWinnerInMajorDiagonal.bind(this);
    this.hasAnyMajorDiagonalWin = this.hasAnyMajorDiagonalWin.bind(this);
    this.hasWinnerInMinorDiagonal = this.hasWinnerInMinorDiagonal.bind(this);
    this.hasAnyMinorDiagonalWin = this.hasAnyMinorDiagonalWin.bind(this);
    this.checkWinner = this.checkWinner.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }

  checkWinner(lastPiece) {
    this.hasAnyColWinners(lastPiece);
    this.hasAnyRowWinners(lastPiece); 
    this.hasAnyMajorDiagonalWin(lastPiece);
    this.hasAnyMinorDiagonalWin(lastPiece);
  }

  hasWinnerInMinorDiagonal(index) {
    let idx = index;
    let streak = '';
    let arrayOfCols = [];
    arrayOfCols.push(this.state.col1);
    arrayOfCols.push(this.state.col2);
    arrayOfCols.push(this.state.col3);
    arrayOfCols.push(this.state.col4);
    arrayOfCols.push(this.state.col5);
    arrayOfCols.push(this.state.col6);
    arrayOfCols.push(this.state.col7);
    for(let i = 0; i < arrayOfCols.length; i++) {
      if(arrayOfCols[i][idx]) {
        streak += arrayOfCols[i][idx];
      } else {
        streak += 'N';
      }
      idx--;
    }
    if(streak.includes('BBBB') || streak.includes('RRRR')) {
      return true;
    } else {
      return false;
    }
  }

  hasAnyMinorDiagonalWin(lastPiece) {
    let winMessage = lastPiece === 'B' ? 'BLACK' : 'RED';
    for(let i = 13; i >= 0; i--) {
      if(this.hasWinnerInMinorDiagonal(i)) {
        this.setState({
          gameIsDone: true,
          winner: winMessage
        });
      }
    }
  }

  hasWinnerInMajorDiagonal(index) {
    let idx = index;
    let streak = '';
    let arrayOfCols = [];
    arrayOfCols.push(this.state.col1);
    arrayOfCols.push(this.state.col2);
    arrayOfCols.push(this.state.col3);
    arrayOfCols.push(this.state.col4);
    arrayOfCols.push(this.state.col5);
    arrayOfCols.push(this.state.col6);
    arrayOfCols.push(this.state.col7);
    for(let i = 0; i < arrayOfCols.length; i++) {
      if(arrayOfCols[i][idx]) {
        streak += arrayOfCols[i][idx];
      } else {
        streak += 'N';
      }
      idx++;
    }
    if(streak.includes('BBBB') || streak.includes('RRRR')) {
      return true;
    } else {
      return false;
    }
  }

  hasAnyMajorDiagonalWin(lastPiece) {
    let winMessage = lastPiece === 'B' ? 'BLACK' : 'RED';
    for(let i = -13; i <= 0; i++) {
      if(this.hasWinnerInMajorDiagonal(i)) {
        this.setState({
          gameIsDone: true,
          winner: winMessage
        });
      }
    }
  }

  hasWinnerInCol(col) {
    for(let i = 0; i < col.length; i++) {
      if((col[i] !== null) && (col[i] === col[i+1] && col[i+1] === col[i+2] && col[i+2] === col[i+3])) {
        return true;
      }
    }
    return false;
  }

  hasAnyColWinners(lastPiece) {
    let winMessage = lastPiece === 'B' ? 'BLACK' : 'RED';
    if(this.hasWinnerInCol(this.state.col1) || this.hasWinnerInCol(this.state.col2) || this.hasWinnerInCol(this.state.col3) || this.hasWinnerInCol(this.state.col4) || this.hasWinnerInCol(this.state.col5) || this.hasWinnerInCol(this.state.col6) || this.hasWinnerInCol(this.state.col7)) {
      this.setState({
        gameIsDone: true,
        winner: winMessage
      });
    }
  }

  hasWinnerInRow(idx) {
    let row = [];
    row.push(this.state.col1[idx]);
    row.push(this.state.col2[idx]);
    row.push(this.state.col3[idx]);
    row.push(this.state.col4[idx]);
    row.push(this.state.col5[idx]);
    row.push(this.state.col6[idx]);
    row.push(this.state.col7[idx]);
    for(let i = 0; i < row.length; i++) {
      if((row[i] !== null) && (row[i] === row[i+1] && row[i+1] === row[i+2] && row[i+2] === row[i+3])) {
        return true;
      }
    }
    return false;
  }

  hasAnyRowWinners(lastPiece) {
    let winMessage = lastPiece === 'B' ? 'BLACK' : 'RED';
    for(let i = 0; i < 6; i++) {
      if(this.hasWinnerInRow(i)) {
        this.setState({
          gameIsDone: true,
          winner: winMessage
        });
      }
    }
  }

  handleClick(column) {
    if(this.state.gameIsDone) {
      return;
    } 
    let i=0;
    while(this.state[column][i] !== null) {
      i++;
    }
    let col = this.state[column].slice();
    col[i] = this.state.blackIsNext ? 'B': 'R';
    this.setState({
      [column]: col,
      blackIsNext: !this.state.blackIsNext
    }, 
    () => { 
      this.checkWinner(col[i]);
    });     
  }

  handleReset() {
    this.setState({
      blackIsNext: true,
      gameIsDone: false,
      winner: '',
      col1: Array(7).fill(null),
      col2: Array(7).fill(null),
      col3: Array(7).fill(null),
      col4: Array(7).fill(null),
      col5: Array(7).fill(null),
      col6: Array(7).fill(null),
      col7: Array(7).fill(null)
    });
  }

  render() {
    const resetBtn = this.state.winner.length ? 
      <button onClick={this.handleReset} className="reset-btn">
        Play Again
      </button> : null;

    let winnerBanner;
    if(this.state.winner === 'BLACK') {
      winnerBanner = <h1><span className="black-msg">BLACK</span> WINS!</h1>;
    } else if(this.state.winner === 'RED') {
      winnerBanner = <h1><span className="red-msg">RED</span> WINS!</h1>;
    } else {
      winnerBanner = null;
    }

    return(
      <div>        
        <h1 className="title">MATCH FOUR IN A ROW</h1>
        <div className="container">
          <div className="button-row">
            <button onClick={(col) => this.handleClick("col1")}>
              Place piece
              <img src="https://www.thrivingparish.org/wp-content/uploads/2018/01/white-down-arrow-png-2-300x300.png"></img>
            </button>
            <button onClick={() => this.handleClick("col2")}>
              Place piece
              <img src="https://www.thrivingparish.org/wp-content/uploads/2018/01/white-down-arrow-png-2-300x300.png"></img>
            </button>
            <button onClick={() => this.handleClick("col3")}>
              Place piece
              <img src="https://www.thrivingparish.org/wp-content/uploads/2018/01/white-down-arrow-png-2-300x300.png"></img>
            </button>
            <button onClick={() => this.handleClick("col4")}>
              Place piece
              <img src="https://www.thrivingparish.org/wp-content/uploads/2018/01/white-down-arrow-png-2-300x300.png"></img>
            </button>
            <button onClick={() => this.handleClick("col5")}>
              Place piece
              <img src="https://www.thrivingparish.org/wp-content/uploads/2018/01/white-down-arrow-png-2-300x300.png"></img>
            </button>
            <button onClick={() => this.handleClick("col6")}>
              Place piece
              <img src="https://www.thrivingparish.org/wp-content/uploads/2018/01/white-down-arrow-png-2-300x300.png"></img>
            </button>
            <button onClick={() => this.handleClick("col7")}>
              Place piece
              <img src="https://www.thrivingparish.org/wp-content/uploads/2018/01/white-down-arrow-png-2-300x300.png"></img>
            </button>
          </div>
          <div className="skeleton">
            <div className="row">
              <Circle value={this.state.col1[5]} />
              <Circle value={this.state.col2[5]} />
              <Circle value={this.state.col3[5]} />
              <Circle value={this.state.col4[5]} />
              <Circle value={this.state.col5[5]} />
              <Circle value={this.state.col6[5]} />
              <Circle value={this.state.col7[5]} />
            </div>
            <div className="row">
              <Circle value={this.state.col1[4]} />
              <Circle value={this.state.col2[4]} />
              <Circle value={this.state.col3[4]} />
              <Circle value={this.state.col4[4]} />
              <Circle value={this.state.col5[4]} />
              <Circle value={this.state.col6[4]} />
              <Circle value={this.state.col7[4]} />
            </div>
            <div className="row">
              <Circle value={this.state.col1[3]} />
              <Circle value={this.state.col2[3]} />
              <Circle value={this.state.col3[3]} />
              <Circle value={this.state.col4[3]} />
              <Circle value={this.state.col5[3]} />
              <Circle value={this.state.col6[3]} />
              <Circle value={this.state.col7[3]} />
            </div>
            <div className="row">
              <Circle value={this.state.col1[2]} />
              <Circle value={this.state.col2[2]} />
              <Circle value={this.state.col3[2]} />
              <Circle value={this.state.col4[2]} />
              <Circle value={this.state.col5[2]} />
              <Circle value={this.state.col6[2]} />
              <Circle value={this.state.col7[2]} />
            </div>
            <div className="row">
              <Circle value={this.state.col1[1]} />
              <Circle value={this.state.col2[1]} />
              <Circle value={this.state.col3[1]} />
              <Circle value={this.state.col4[1]} />
              <Circle value={this.state.col5[1]} />
              <Circle value={this.state.col6[1]} />
              <Circle value={this.state.col7[1]} />
            </div>
            <div className="row">
              <Circle value={this.state.col1[0]} />
              <Circle value={this.state.col2[0]} />
              <Circle value={this.state.col3[0]} />
              <Circle value={this.state.col4[0]} />
              <Circle value={this.state.col5[0]} />
              <Circle value={this.state.col6[0]} />
              <Circle value={this.state.col7[0]} />
            </div>
          </div>
          {winnerBanner}
          {resetBtn}
        </div>
      </div>
    );
  }
}

export default Board;


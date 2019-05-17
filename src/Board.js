import React from 'react';

import Square from './Square';

import './Board.css';

class Board extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      size: 2,
      grid: Array(2).fill(0).map(x=>Array(2).fill("+")),
      noSolution: null,
      currentView: 1,
      solutions: [""],
      fileReader: ""
    };

    this.onBackward = this.onBackward.bind(this);
    this.onForward = this.onForward.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.generateSolutions = this.generateSolutions.bind(this);
    this.before = this.before.bind(this);
    this.after = this.after.bind(this);
    this.occupyBoard = this.occupyBoard.bind(this);
    this.handleFileChosen = this.handleFileChosen.bind(this);
  }


  onBackward() {
    if(this.state.size > 1) {
      let temp = this.state.size-1;
      this.setState({size: temp}); 
      this.setState({grid: Array(temp).fill(0).map(x=>Array(temp).fill("+"))});
    }
    
  }

  onForward() {
    let temp = this.state.size+1;
    this.setState({size: temp});
    this.setState({grid: Array(temp).fill(0).map(x=>Array(temp).fill("+"))});
  }

  handleInput(e) {
    this.setState({size: parseInt(e.target.value, 10)});
    if(e.target.value !== ""){
      this.setState({grid: Array(parseInt(e.target.value, 10)).fill(0).map(x=>Array(parseInt(e.target.value, 10)).fill("+"))})  
    }
    
  }

  after() {
    if(this.state.currentView+1 <= this.state.noSolution){
      let temp = this.state.currentView + 1;
      this.setState({currentView: temp});
      this.occupyBoard();
    }
  }

  before() {
    if(this.state.currentView-1 > 0){
      let temp = this.state.currentView - 1;
      this.setState({currentView: temp});
      this.occupyBoard();
    }
  }

   occupyBoard() {
    let temp = new Array(this.state.size);
    //generating board
    for(let m = 0; m < this.state.size; m++) {
      //pseudocode
      //this.state.grid[i][this.state.solutions[this.state.currentView-1][i]-1] = <Square key={i+"_"+(this.state.solutions[this.state.currentView-1][i]-1)} value="C"/>;
      
      // console.log(this.state.grid.map((r, i) => {return 
      //     {r.find((d, j) => { return
      //       (d.key === (m+"_"+(this.state.solutions[this.state.currentView-1][m]-1)
      //         ))})}}
      //   ));
      temp[m] = new Array(this.state.size);
      //occupy first with "+"
      for(let n = 0; n < this.state.size; n++) {
        temp[m][n] = "+";
      }
      //place chancies
      temp[m][this.state.solutions[this.state.currentView-1][m]-1] = "C";
    }

    this.setState({grid: temp});
  }

  handleFileChosen(file) {
    let temp = new FileReader();
    temp.readAsText(file);
    this.setState({fileReader: temp});
    console.log("hello");
    console.log(this.state.fileReader);
  }

  generateSolutions() {
    let initialized_arr = new Array(this.state.size);
    let start = 0;
    let move = 0;
    let nopts = new Array(this.state.size+2);
    let option = new Array(this.state.size+2);
    let i = 0;
    let candidate = 0;
    let duplicate_temp = 0;
    let candidate_count = 0;
    let candidate_sequence = 0;
    let duplicate_invalid = 0;
    let count = 0;
    let noSolutions = 0;
    let tempSolutions = [];
    let solution = "";

    //created 2D array for stack
    for (let i = 0; i < (this.state.size+2); i++ ) {
      option[i] = new Array(this.state.size+2);   
    }

    nopts[start] = 1;

    while(nopts[start] > 0) { //while dummy stack is not empty
      if(nopts[move] > 0) {
        move++;
        nopts[move] = 0; //initialize new move
        if(move === this.state.size + 1) { //solution found
            candidate_sequence = 0;
            for (let i = 1; i < move ; i++) {
              if(option[i][nopts[i]] === initialized_arr[i-1] || initialized_arr[i-1] === 0) {
//no block of code                
              } else {
                candidate_sequence = 1;
                duplicate_invalid = 1;
              }
            }
            if(candidate_sequence !== 0) {
              duplicate_invalid = 0;
              count++;
              solution = "";
              for(let i = 1; i < move; i++) {
                  //prints a solution to a string
                  solution = solution + option[i][nopts[i]];
              }
              //adds to array of solutions
              tempSolutions[noSolutions] = solution;
              noSolutions++;
            }
            duplicate_temp = 0;
            candidate_count = 0;
        } else if (move === 1) {
          for(candidate = this.state.size; candidate >= 1; candidate--) {
            nopts[move]++;
            option[move][nopts[move]] = candidate;
          }
        } else {
          for (candidate = this.state.size; candidate >= 1; candidate--) {
          for(i = move-1; i>=1; i--) {
            if(candidate === option[i][nopts[i]]) break;
          } 
          if((!(i>=1)) && Math.abs(option[move-1][nopts[move-1]] - candidate) !== 2) {
            if(option[move-2][nopts[move-2]] === 0) {
              option[move][++nopts[move]] = candidate;
              candidate_count += 1;
            } else if(Math.abs(option[move-2][nopts[move-2]] - candidate) !== 1) {
              option[move][++nopts[move]] = candidate;
              candidate_count += 1;
            }
          }           
          }

        }
      } else {
        move--;
        nopts[move]--;
      }
    }

    const arr = [...tempSolutions, ...this.state.solutions];
    this.setState({
      currentView: 1,
      noSolution: count 
    });
    this.setState({solutions: arr}, () => this.occupyBoard());

    this.occupyBoard();
  }

  render() {
    const style = {
        margin:'auto',
        width: "auto",
        height:"auto",
        backgroundColor:'darkorange',
        color:'white',
        fontSize:"3em"
      }
      const rows = this.state.grid.map((r, i) => {return (
        <tr key={"row_"+i}>
          {r.map((d, j) => {return(
            (this.state.grid[i][j] === "C")?
            <Square
              key={i+"_"+j}
              value="C"/>
            :            
            <Square
              key={i+"_"+j}
              value=""/>
                )
              }
            )
          }
          </tr>)
          }
        );
    return(
    <div>
      <div>
        Board Size
        <button onClick={this.onBackward}> - </button>
        <input type="number" value={this.state.size} onChange={this.handleInput}/>
        <button onClick={this.onForward}> + </button>
      </div>
      <div>
        <button onClick={this.generateSolutions}> Generate Solutions </button>
        {this.state.noSolution? 
          <div>
            <button onClick={this.before}> - </button>
            {this.state.currentView} of {this.state.noSolution}
            <button onClick={this.after}> + </button>
          </div>
          : null}
      </div>
      <div className="container">
            <table cellSpacing="0" id="table" style={style}>
              <tbody>
                {rows}
              </tbody>
            </table>
        </div>
        <div>
          <input type="file"
                  id="file"
                  className="input-file"
                  accept=".txt"
                  onChange={e => this.handleFileChosen(e.target.files[0])}
                  />
        </div>
    </div>);
  }
}

export default Board;
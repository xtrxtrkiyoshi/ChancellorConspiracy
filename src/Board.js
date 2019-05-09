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
			currentView: 1
		};

		this.onBackward = this.onBackward.bind(this);
  	this.onForward = this.onForward.bind(this);
  	this.handleInput = this.handleInput.bind(this);
		this.generateSolutions = this.generateSolutions.bind(this);
		this.before = this.before.bind(this);
		this.after = this.after.bind(this);
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
    if(this.state.currentView+1 <= this.state.size){
      let temp = this.state.currentView + 1;
      this.setState({currentView: temp});
    }
  }

  before() {
    if(this.state.currentView-1 > 0){
      let temp = this.state.currentView - 1;
      this.setState({currentView: temp});
  
    }
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
    let solutions = [];
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
              solutions[noSolutions] = solution;
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

    for(i = 0; i < this.state.size; i++) {
      this.state.grid[i][solutions[this.state.currentView-1][i]-1] = <Square key={i+"_"+(solutions[this.state.currentView-1][i]-1)} value="C"/>;
      console.log(solutions[this.state.currentView-1][i]);
    }

  	this.setState({noSolution: count, currentView: 1});
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
			Increase Board Size
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
		</div>);
	}
}

export default Board;
import React from 'react';

export class Square extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    console.log(this.props.value);
    return (
        <td
          style={this.props.value?{
            overflow:'hidden',
            width:'50px',
            height:'50px',
            backgroundColor:'#000000',
            color:'red',
            boarderColor: 'black',
            border:".5px solid black"
            }:{
            overflow:'hidden',
            width:'50px',
            height:'50px',
            backgroundColor:'#ffffff',
            color:'red',
            boarderColor: 'black',
            border:".5px solid black"
          }}>
          <button>
          </button>
        </td>
        
      
    )
  }
}
export default Square;
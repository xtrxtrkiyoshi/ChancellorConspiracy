import React from 'react';

export class Square extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      value: this.props.value
    }
  }
  render(){
    console.log(this.state.value);
    return (
        <td
          style={this.state.value?{
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
        </td>
        
      
    )
  }
}
export default Square;
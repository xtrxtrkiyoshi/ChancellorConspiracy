import React from 'react';

export class Square extends React.Component{
  render(){
    const color_ = this.props.color;
    return (
      <td
        style={{
          overflow:'hidden',
          width:'50px',
          height:'50px',
          backgroundColor:'#e4e4a1',
          color:'red',
          boarderColor: 'black',
          border:".5px solid black"
        }}>
      </td>
    )
  }
}
export default Square;
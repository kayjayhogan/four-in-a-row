import React from 'react';

class Circle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      row: this.props.row,
      column: this.props.column
    };
  }

  render() {
    return(
      <div className={`circle ${this.props.value === 'B' ? 'black' : this.props.value === 'R' ? 'red' : 'default'}`}>
      </div>
    );
  }
}


export default Circle;
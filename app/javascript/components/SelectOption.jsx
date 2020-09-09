import React from 'react'

export default class SelectOption extends React.Component {
  constructor(props) {
    super(props)
  }

  handleClick = () => {
    this.props.handleClick(this.props.option)
  }

  render() {
    return (
      <div className="SelectOption" onClick={this.handleClick}>
        {this.props.option}
      </div>
    )
  }
}

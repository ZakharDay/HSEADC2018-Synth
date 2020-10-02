import React from 'react'

export default class Button extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { text, handleClick } = this.props

    return (
      <div className="Button" onClick={handleClick}>
        {text}
      </div>
    )
  }
}

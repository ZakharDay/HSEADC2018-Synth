import React from 'react'

export default class Button extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        Button {this.props.name} {this.props.rap}!
      </div>
    )
  }
}

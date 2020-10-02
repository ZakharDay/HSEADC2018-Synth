import React from 'react'

export default class Slider extends React.Component {
  constructor(props) {
    super(props)
    this.input = React.createRef()
  }

  componentDidMount() {
    const { current } = this.props
    this.input.current.value = current
  }

  render() {
    const { min, max, handleChange } = this.props

    return (
      <div className="Slider">
        <input
          ref={this.input}
          type="range"
          className="slider"
          min={min}
          max={max}
          onInput={() => handleChange(this.input.current.value)}
        />
      </div>
    )
  }
}

import React from 'react'

export default class Knob extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      deg: '-140deg',
      mouseDown: false,
      cursorY: 0
    }
  }

  componentDidMount() {
    document.addEventListener('mouseup', this.handleMouseUp)
    document.addEventListener('mousemove', this.handleMouseMove)
  }

  handleMouseDown = (e) => {
    e.preventDefault()

    this.setState({
      mouseDown: true,
      cursorY: e.screenY
    })
  }

  handleMouseMove = (e) => {
    e.preventDefault()

    if (this.state.mouseDown) {
      this.setState({
        cursorY: e.screenY
      })
    }
  }

  handleMouseUp = (e) => {
    e.preventDefault()

    this.setState({
      mouseDown: false,
      cursorY: 0
    })
  }

  render() {
    const { deg } = this.state

    const styles = {
      transform: `rotate(${deg})`
    }

    return (
      <div
        className="Knob"
        style={styles}
        onMouseDown={this.handleMouseDown}
      ></div>
    )
  }
}

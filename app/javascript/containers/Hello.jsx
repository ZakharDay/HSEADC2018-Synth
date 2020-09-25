import React from 'react'
import Button from '../components/Button'
import Select from '../components/Select'
import Total from '../components/Total'

export default class Hello extends React.Component {
  constructor(props) {
    super(props)

    let { menu } = props

    // create web audio api context
    let audioCtx = new (window.AudioContext || window.webkitAudioContext)()

    // create Oscillator node
    let oscillator = audioCtx.createOscillator()

    oscillator.type = 'square'
    oscillator.frequency.setValueAtTime(440, audioCtx.currentTime) // value in hertz
    oscillator.connect(audioCtx.destination)
    // oscillator.start()

    menu.map((item) => {
      item.isOpened = false
      item.currentOption = item.options[0]

      return item
    })

    this.state = {
      menu: menu,
      audioContext: audioCtx,
      oscillator: {
        isPlaying: false,
        isStarted: false,
        instrument: oscillator
      }
    }

    console.log(oscillator)
  }

  handleOptionClick = (id, option) => {
    let menu = [...this.state.menu]

    menu[id].isOpened = !menu[id].isOpened
    menu[id].currentOption = option

    this.setState({
      menu
    })
  }

  toggleSelect = (id) => {
    let menu = [...this.state.menu]

    menu.map((item) => {
      item.isOpened = false
    })

    menu[id].isOpened = !menu[id].isOpened

    this.setState({
      menu
    })
  }

  handleTogglePlay = () => {
    const { oscillator, audioContext } = this.state

    if (oscillator.isPlaying) {
      oscillator.instrument.disconnect(audioContext.destination)
    } else {
      oscillator.instrument.connect(audioContext.destination)

      if (!oscillator.isStarted) {
        oscillator.isStarted = true
        oscillator.instrument.start()
      }
    }

    oscillator.isPlaying = !oscillator.isPlaying

    this.setState({
      oscillator
    })
  }

  handleFrequencyChange = (frequency) => {
    const { oscillator, audioContext } = this.state

    oscillator.instrument.frequency.setValueAtTime(
      frequency,
      audioContext.currentTime
    )
  }

  render() {
    const { menu } = this.state
    let selectElements = []

    console.log(menu)

    menu.forEach((item, i) => {
      selectElements.push(
        <Select
          key={i}
          handleSelectClick={this.toggleSelect}
          handleOptionClick={this.handleOptionClick}
          id={i}
          {...item}
        />
      )
    })

    return (
      <div>
        {selectElements}
        <Total menu={menu} />
        <div onClick={this.handleTogglePlay}>Play/Stop</div>
        <div onClick={() => this.handleFrequencyChange(220)}>1</div>
        <div onClick={() => this.handleFrequencyChange(440)}>2</div>
        <div onClick={() => this.handleFrequencyChange(880)}>3</div>
      </div>
    )
  }
}

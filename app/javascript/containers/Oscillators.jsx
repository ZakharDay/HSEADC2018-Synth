import React from 'react'
import Oscillator from '../components/Oscillator'

export default class Oscillators extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      oscillators: []
    }
  }

  createAudioContext = () => {
    let audioContext = new (window.AudioContext || window.webkitAudioContext)()

    this.setState({
      audioContext
    })
  }

  createOscillator = () => {
    let { audioContext, oscillators } = this.state

    let instrument = audioContext.createOscillator()
    instrument.type = 'square'
    instrument.frequency.setValueAtTime(440, audioContext.currentTime)
    instrument.connect(audioContext.destination)

    let oscillator = {
      isPlaying: false,
      isStarted: false,
      octave: 0,
      instrument
    }

    // oscillators = [...oscillators]

    oscillators.push(oscillator)

    this.setState({
      oscillators
    })
  }

  handleTogglePlay = (name) => {
    const { audioContext, oscillators } = this.state
    let newOscillators = []

    oscillators.forEach((oscillator, i) => {
      if (i === name) {
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
      }

      newOscillators.push(oscillator)
    })

    this.setState({
      oscillators: newOscillators
    })
  }

  handleTypeChange = (name, type) => {
    const { audioContext, oscillators } = this.state
    let newOscillators = []

    oscillators.forEach((oscillator, i) => {
      if (i === name) {
        oscillator.instrument.type = type
      }

      newOscillators.push(oscillator)
    })

    this.setState({
      oscillators: newOscillators
    })
  }

  handleFrequencyChange = (name, frequency) => {
    const { audioContext, oscillators } = this.state
    let newOscillators = []

    oscillators.forEach((oscillator, i) => {
      if (i === name) {
        if (!oscillator.isPlaying) {
          this.handleTogglePlay(name)
        }

        oscillator.instrument.frequency.setValueAtTime(
          frequency,
          audioContext.currentTime
        )
      }

      newOscillators.push(oscillator)
    })

    this.setState({
      oscillators: newOscillators
    })
  }

  handleOctaveChange = (name, octave) => {
    const { audioContext, oscillators } = this.state
    let newOscillators = []

    oscillators.forEach((oscillator, i) => {
      if (i === name) {
        oscillator.octave = octave
      }

      newOscillators.push(oscillator)
    })

    this.setState({
      oscillators: newOscillators
    })
  }

  renderOscillators = () => {
    if (this.state.audioContext) {
      const { oscillators } = this.state
      let oscillatorElements = []

      oscillators.forEach((oscillator, i) => {
        oscillatorElements.push(
          <Oscillator
            oscillator={oscillator}
            handleTogglePlay={this.handleTogglePlay}
            handleTypeChange={this.handleTypeChange}
            handleOctaveChange={this.handleOctaveChange}
            handleFrequencyChange={this.handleFrequencyChange}
            name={i}
            key={i}
          />
        )
      })

      return (
        <div>
          <div onClick={this.createOscillator}>Create Oscillator</div>
          {oscillatorElements}
        </div>
      )
    } else {
      return <div onClick={this.createAudioContext}>Project Start</div>
    }
  }

  render() {
    return <div>{this.renderOscillators()}</div>
  }
}

import React from 'react'
import Oscillator from '../components/Oscillator'
import Knob from '../components/Knob'

export default class Oscillators extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      oscillators: []
    }
  }

  // handleKnobValueChange = (value) => {
  //   this.setState({
  //     knobValue: value
  //   })
  // }

  createAudioContext = () => {
    let audioContext = new (window.AudioContext || window.webkitAudioContext)()

    this.setState({
      audioContext
    })
  }

  createOscillator = () => {
    let { audioContext, oscillators } = this.state

    let instrument = audioContext.createOscillator()
    // instrument.type = 'square'
    instrument.connect(audioContext.destination)

    let oscillator = {
      isPlaying: false,
      isStarted: false,
      octave: 0,
      type: 'square',
      frequency: 440,
      detune: 0,
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
        oscillator.type = type
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
        oscillator.frequency = frequency

        if (!oscillator.isPlaying) {
          this.handleTogglePlay(name)
        }
      }

      newOscillators.push(oscillator)
    })

    this.setState({
      oscillators: newOscillators
    })
  }

  handleDetuneChange = (name, detune) => {
    const { audioContext, oscillators } = this.state
    let newOscillators = []

    oscillators.forEach((oscillator, i) => {
      if (i === name) {
        oscillator.detune = detune

        if (!oscillator.isPlaying) {
          this.handleTogglePlay(name)
        }
      }

      newOscillators.push(oscillator)
    })

    this.setState({
      oscillators: newOscillators
    })
  }

  handleOctaveChange = (name, octave) => {
    console.log(octave)
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
      const { audioContext, oscillators } = this.state
      let oscillatorElements = []

      oscillators.forEach((oscillator, i) => {
        oscillatorElements.push(
          <Oscillator
            audioContext={audioContext}
            oscillator={oscillator}
            name={i}
            handleTogglePlay={this.handleTogglePlay}
            handleTypeChange={this.handleTypeChange}
            handleOctaveChange={this.handleOctaveChange}
            handleFrequencyChange={this.handleFrequencyChange}
            handleDetuneChange={this.handleDetuneChange}
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

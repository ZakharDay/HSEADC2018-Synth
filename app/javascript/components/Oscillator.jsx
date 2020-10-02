import { notes } from '../utilities/notes'

import React from 'react'
import Slider from '../components/Slider'
import Knob from '../components/Knob'

export default class Oscillator extends React.Component {
  constructor(props) {
    super(props)
  }

  handleSliderChange = (frequency) => {
    console.log('yo')
    const { name, handleFrequencyChange } = this.props
    handleFrequencyChange(name, frequency)
  }

  handleKnobChange = (detune) => {
    const { name, handleDetuneChange } = this.props
    handleDetuneChange(name, detune)
  }

  renderStopButton = () => {
    const { handleTogglePlay, oscillator, name } = this.props
    console.log(name)

    if (oscillator.isPlaying) {
      return <div onClick={() => handleTogglePlay(name)}>Stop</div>
    }
  }

  setInstrumentValues = () => {
    const { audioContext, oscillator } = this.props

    oscillator.instrument.type = oscillator.type

    oscillator.instrument.frequency.setValueAtTime(
      oscillator.frequency,
      audioContext.currentTime
    )

    oscillator.instrument.detune.setValueAtTime(
      oscillator.detune,
      audioContext.currentTime
    )
  }

  renderWaveButtons = () => {
    const { name, handleTypeChange } = this.props
    const waveTypes = ['sine', 'square', 'triangle', 'sawtooth']
    let buttonElements = []

    waveTypes.forEach((waveType, i) => {
      buttonElements.push(
        <span onClick={() => handleTypeChange(name, waveType)} key={i}>
          {waveType}
        </span>
      )
    })

    return buttonElements
  }

  renderOctaveButtons = () => {
    const { name, handleOctaveChange } = this.props
    let buttonElements = []

    for (var i = 0; i < 8; i++) {
      const octave = i

      buttonElements.push(
        <span onClick={() => handleOctaveChange(name, octave)} key={i}>
          {i}
        </span>
      )
    }

    return buttonElements
  }

  renderNoteButtons = () => {
    const { name, oscillator, handleFrequencyChange } = this.props
    let buttonElements = []

    Object.keys(notes).forEach((key, i) => {
      const frequency = notes[key][oscillator.octave]

      buttonElements.push(
        <span onClick={() => handleFrequencyChange(name, frequency)} key={i}>
          {key}
        </span>
      )
    })

    return buttonElements
  }

  render() {
    const { oscillator } = this.props
    this.setInstrumentValues()

    return (
      <div>
        <div>
          {this.renderStopButton()}

          <div>{this.renderWaveButtons()}</div>
          <div>{this.renderOctaveButtons()}</div>

          <Slider
            min="0"
            max="4000"
            current={oscillator.frequency}
            handleChange={this.handleSliderChange}
          />

          <Knob
            min="-1000"
            max="1000"
            current={oscillator.detune}
            handleChange={this.handleKnobChange}
          />

          <div>{this.renderNoteButtons()}</div>
        </div>
      </div>
    )
  }
}

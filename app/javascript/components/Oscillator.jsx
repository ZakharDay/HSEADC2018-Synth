import { notes } from '../utilities/notes'

import React from 'react'

export default class Oscillator extends React.Component {
  constructor(props) {
    super(props)
  }

  renderStopButton = () => {
    const { handleTogglePlay, oscillator, name } = this.props
    console.log(name)

    if (oscillator.isPlaying) {
      return <div onClick={() => handleTogglePlay(name)}>Stop</div>
    }
  }

  render() {
    const {
      audioContext,
      oscillator,
      name,
      handleTypeChange,
      handleOctaveChange,
      handleFrequencyChange
    } = this.props

    const { octave } = oscillator

    oscillator.instrument.type = oscillator.type

    oscillator.instrument.frequency.setValueAtTime(
      oscillator.frequency,
      audioContext.currentTime
    )

    return (
      <div>
        <div>
          {this.renderStopButton()}

          <div>
            <span onClick={() => handleTypeChange(name, 'sine')}>Sine</span>
            <span onClick={() => handleTypeChange(name, 'square')}>Square</span>
            <span onClick={() => handleTypeChange(name, 'triangle')}>
              Triangle
            </span>
            <span onClick={() => handleTypeChange(name, 'sawtooth')}>
              Sawtooth
            </span>
          </div>

          <div>
            <span onClick={() => handleOctaveChange(name, 0)}>0</span>
            <span onClick={() => handleOctaveChange(name, 1)}>1</span>
            <span onClick={() => handleOctaveChange(name, 2)}>2</span>
            <span onClick={() => handleOctaveChange(name, 3)}>3</span>
            <span onClick={() => handleOctaveChange(name, 4)}>4</span>
            <span onClick={() => handleOctaveChange(name, 5)}>5</span>
            <span onClick={() => handleOctaveChange(name, 6)}>6</span>
            <span onClick={() => handleOctaveChange(name, 7)}>7</span>
            <span onClick={() => handleOctaveChange(name, 8)}>8</span>
          </div>

          <div>
            <span onClick={() => handleFrequencyChange(name, notes.C[octave])}>
              C
            </span>
            <span onClick={() => handleFrequencyChange(name, notes.D[octave])}>
              D
            </span>
            <span onClick={() => handleFrequencyChange(name, notes.E[octave])}>
              E
            </span>
            <span onClick={() => handleFrequencyChange(name, notes.F[octave])}>
              F
            </span>
            <span onClick={() => handleFrequencyChange(name, notes.G[octave])}>
              G
            </span>
            <span onClick={() => handleFrequencyChange(name, notes.A[octave])}>
              A
            </span>
            <span onClick={() => handleFrequencyChange(name, notes.B[octave])}>
              B
            </span>
          </div>
        </div>
      </div>
    )
  }
}

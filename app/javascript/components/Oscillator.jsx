import { notes } from '../utilities/notes'

import React from 'react'

export default class Oscillator extends React.Component {
  constructor(props) {
    super(props)
  }

  renderStopButton = () => {
    const { handleTogglePlay, oscillator, name } = this.props

    if (oscillator.isPlaying) {
      return <div onClick={() => handleTogglePlay(name)}>Stop</div>
    }
  }

  render() {
    const {
      handleOctaveChange,
      handleFrequencyChange,
      oscillator,
      name
    } = this.props

    const { octave } = oscillator

    return (
      <div>
        <div>
          {this.renderStopButton()}

          <div>
            <div onClick={() => handleOctaveChange(name, 0)}>0</div>
            <div onClick={() => handleOctaveChange(name, 1)}>1</div>
            <div onClick={() => handleOctaveChange(name, 2)}>2</div>
            <div onClick={() => handleOctaveChange(name, 3)}>3</div>
            <div onClick={() => handleOctaveChange(name, 4)}>4</div>
            <div onClick={() => handleOctaveChange(name, 5)}>5</div>
            <div onClick={() => handleOctaveChange(name, 6)}>6</div>
            <div onClick={() => handleOctaveChange(name, 7)}>7</div>
            <div onClick={() => handleOctaveChange(name, 8)}>8</div>
          </div>

          <div>
            <div onClick={() => handleFrequencyChange(name, notes.C[octave])}>
              C
            </div>
            <div onClick={() => handleFrequencyChange(name, notes.D[octave])}>
              D
            </div>
            <div onClick={() => handleFrequencyChange(name, notes.E[octave])}>
              E
            </div>
            <div onClick={() => handleFrequencyChange(name, notes.F[octave])}>
              F
            </div>
            <div onClick={() => handleFrequencyChange(name, notes.G[octave])}>
              G
            </div>
            <div onClick={() => handleFrequencyChange(name, notes.A[octave])}>
              A
            </div>
            <div onClick={() => handleFrequencyChange(name, notes.B[octave])}>
              B
            </div>
          </div>
        </div>
      </div>
    )
  }
}

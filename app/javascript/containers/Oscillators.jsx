import { notes } from '../utilities/notes'

import React from 'react'

export default class Oscillators extends React.Component {
  constructor(props) {
    super(props)
  }

  createAudioContextAndOscillator = () => {
    // create web audio api context
    let audioCtx = new (window.AudioContext || window.webkitAudioContext)()

    // create Oscillator node
    let oscillator = audioCtx.createOscillator()

    oscillator.type = 'square'
    oscillator.frequency.setValueAtTime(440, audioCtx.currentTime) // value in hertz
    oscillator.connect(audioCtx.destination)

    this.setState({
      audioContext: audioCtx,
      oscillator: {
        isPlaying: false,
        isStarted: false,
        instrument: oscillator
      },
      octave: 0
    })
  }

  togglePlay = () => {
    const { oscillator, audioContext } = this.state

    if (oscillator.isPlaying) {
      oscillator.instrument.disconnect(audioContext.destination)
    } else {
      oscillator.instrument.connect(audioContext.destination)

      if (!oscillator.isStarted) {
        oscillator.isStarted = true
        oscillator.instrument.start()
        oscillator.instrument.stop(audioContext.currentTime + 1)
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

  handleOctaveChange = (octave) => {
    this.setState({
      octave
    })
  }

  renderButtons = () => {
    if (this.state && this.state.oscillator) {
      const { octave } = this.state

      return (
        <div>
          <div onClick={this.togglePlay}>Play/Stop</div>

          <div>
            <div onClick={() => this.handleOctaveChange(0)}>0</div>
            <div onClick={() => this.handleOctaveChange(1)}>1</div>
            <div onClick={() => this.handleOctaveChange(2)}>2</div>
            <div onClick={() => this.handleOctaveChange(3)}>3</div>
            <div onClick={() => this.handleOctaveChange(4)}>4</div>
            <div onClick={() => this.handleOctaveChange(5)}>5</div>
            <div onClick={() => this.handleOctaveChange(6)}>6</div>
            <div onClick={() => this.handleOctaveChange(7)}>7</div>
            <div onClick={() => this.handleOctaveChange(8)}>8</div>
          </div>

          <div>
            <div onClick={() => this.handleFrequencyChange(notes.C[octave])}>
              C
            </div>

            <div onClick={() => this.handleFrequencyChange(notes.D[octave])}>
              D
            </div>

            <div onClick={() => this.handleFrequencyChange(notes.E[octave])}>
              E
            </div>

            <div onClick={() => this.handleFrequencyChange(notes.F[octave])}>
              F
            </div>

            <div onClick={() => this.handleFrequencyChange(notes.G[octave])}>
              G
            </div>

            <div onClick={() => this.handleFrequencyChange(notes.A[octave])}>
              A
            </div>

            <div onClick={() => this.handleFrequencyChange(notes.B[octave])}>
              B
            </div>
          </div>
        </div>
      )
    } else {
      return (
        <div onClick={this.createAudioContextAndOscillator}>
          Create Oscillator
        </div>
      )
    }
  }

  render() {
    return <div>{this.renderButtons(2)}</div>
  }
}

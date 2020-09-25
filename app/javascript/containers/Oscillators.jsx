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
      }
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
      }
    }

    oscillator.isPlaying = !oscillator.isPlaying

    this.setState({
      oscillator
    })
  }

  renderButtons = () => {
    if (this.state && this.state.oscillator) {
      return <div onClick={this.togglePlay}>Play/Stop</div>
    } else {
      return (
        <div onClick={this.createAudioContextAndOscillator}>
          Create Oscillator
        </div>
      )
    }
  }

  render() {
    return <div>{this.renderButtons()}</div>
  }
}

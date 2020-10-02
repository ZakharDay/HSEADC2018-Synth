import * as Tone from 'tone'
import React from 'react'
import Button from '../components/Button'
import Slider from '../components/Slider'

const synth = new Tone.Synth().toDestination()

export default class Synth extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      synth: {
        envelope: {
          attack: 0.1,
          decay: 0.2,
          sustain: 1.0,
          release: 0.8
        },
        instrument: synth
      }
    }
  }

  componentDidMount() {
    const { envelope } = this.state.synth
    this.handleEnvelopeValueChange(envelope.attack)
  }

  playNote = () => {
    const synth = this.state.synth.instrument
    synth.triggerAttackRelease('C4', '1n')
  }

  handleEnvelopeValueChange = (value) => {
    const { instrument } = this.state.synth
    instrument.envelope.attack = value
  }

  render() {
    const { envelope } = this.state.synth

    return (
      <div className="Synth">
        <Button text="Play" handleClick={this.playNote} />

        <Slider
          min="0"
          max="1"
          current={envelope.attack}
          handleChange={this.handleEnvelopeValueChange}
        />
      </div>
    )
  }
}

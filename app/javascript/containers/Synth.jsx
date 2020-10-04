import * as Tone from 'tone'
import React from 'react'
import Button from '../components/Button'
import Slider from '../components/Slider'

const synth = new Tone.Synth() //.toDestination()
// const distortion = new Tone.Distortion(1).toDestination()
const feedbackDelay = new Tone.FeedbackDelay('1n', 1).toDestination()
synth.connect(feedbackDelay)

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
        oscillator: {},
        instrument: synth
      }
    }
  }

  componentDidMount() {
    this.setInstrumentValues()
  }

  setInstrumentValues = () => {
    const { envelope } = this.state.synth
    this.changeInstrumentValue('attack', envelope.attack)
    this.changeInstrumentValue('decay', envelope.decay)
    this.changeInstrumentValue('sustain', envelope.sustain)
    this.changeInstrumentValue('release', envelope.release)
  }

  playNote = () => {
    const synth = this.state.synth.instrument
    synth.triggerAttackRelease('C4', '1n')
  }

  handleEnvelopeValueChange = (name, value) => {
    const { envelope, instrument } = this.state.synth
    envelope[name] = value

    this.setState({
      synth: {
        envelope,
        instrument
      }
    })
  }

  changeInstrumentValue = (name, value) => {
    const { instrument } = this.state.synth
    instrument.envelope[name] = value
  }

  render() {
    const { envelope } = this.state.synth
    this.setInstrumentValues()

    return (
      <div className="Synth">
        <Button text="Play" handleClick={this.playNote} />

        <Slider
          name="attack"
          min="0"
          max="1"
          current={envelope.attack}
          handleChange={this.handleEnvelopeValueChange}
        />

        <Slider
          name="decay"
          min="0"
          max="1"
          current={envelope.decay}
          handleChange={this.handleEnvelopeValueChange}
        />

        <Slider
          name="sustain"
          min="0"
          max="1"
          current={envelope.sustain}
          handleChange={this.handleEnvelopeValueChange}
        />

        <Slider
          name="release"
          min="0"
          max="1"
          current={envelope.release}
          handleChange={this.handleEnvelopeValueChange}
        />
      </div>
    )
  }
}

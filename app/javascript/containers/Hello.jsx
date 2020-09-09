import React from 'react'
import Button from '../components/Button'
import Select from '../components/Select'

export default class Hello extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const selectOptions = [
      'Option 1',
      'Option 2',
      'Option 3',
      'Option 4',
      'Option 5',
      'Option 6',
      'Option 7'
    ]

    return (
      <div>
        Hello {this.props.name} {this.props.rap}!
        <Button name={this.props.name} rap={this.props.rap} />
        <Select selectOptions={selectOptions} />
      </div>
    )
  }
}

import React from 'react'
import SelectOption from '../components/SelectOption'

export default class Select extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      isOpened: false,
      currentOption: props.selectOptions[0]
    }
  }

  handleClick = () => {
    console.log('click')

    this.setState({
      isOpened: !this.state.isOpened
    })
  }

  handleOptionClick = (option) => {
    console.log('option click')

    this.setState({
      isOpened: !this.state.isOpened,
      currentOption: option
    })
  }

  render() {
    let selectOptionElements = []

    // const currentOption = this.state.currentOption
    // const isOpened = this.state.isOpened

    const { currentOption, isOpened } = this.state

    this.props.selectOptions.forEach((option, i) => {
      selectOptionElements.push(
        <SelectOption
          option={option}
          handleClick={this.handleOptionClick}
          key={i}
        />
      )
    })

    return (
      <div className="Select">
        <div className="current" onClick={this.handleClick}>
          {currentOption}
        </div>

        {isOpened ? selectOptionElements : ''}
      </div>
    )
  }
}

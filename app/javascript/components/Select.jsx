import React from 'react'
import SelectOption from '../components/SelectOption'

export default class Select extends React.Component {
  constructor(props) {
    super(props)
  }

  handleSelectClick = () => {
    console.log('click')

    const { id, handleSelectClick } = this.props
    handleSelectClick(id)
  }

  handleOptionClick = (option) => {
    console.log('option click')

    const { id, handleOptionClick } = this.props
    handleOptionClick(id, option)
  }

  render() {
    const { currentOption, isOpened, options } = this.props
    let selectOptionElements = []

    options.forEach((option, i) => {
      selectOptionElements.push(
        <SelectOption
          option={option}
          currentOption={currentOption}
          handleClick={this.handleOptionClick}
          key={i}
        />
      )
    })

    return (
      <div className="Select">
        <div className="current" onClick={this.handleSelectClick}>
          {currentOption.name} {currentOption.price}
        </div>

        {isOpened ? selectOptionElements : ''}
      </div>
    )
  }
}

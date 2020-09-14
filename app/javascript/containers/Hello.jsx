import React from 'react'
import Button from '../components/Button'
import Select from '../components/Select'
import Total from '../components/Total'

export default class Hello extends React.Component {
  constructor(props) {
    super(props)

    let { menu } = props

    menu.map((item) => {
      item.isOpened = false
      item.currentOption = item.options[0]

      return item
    })

    this.state = {
      menu: menu
    }
  }

  handleOptionClick = (id, option) => {
    let menu = [...this.state.menu]

    menu[id].isOpened = !menu[id].isOpened
    menu[id].currentOption = option

    this.setState({
      menu
    })
  }

  toggleSelect = (id) => {
    let menu = [...this.state.menu]

    menu.map((item) => {
      item.isOpened = false
    })

    menu[id].isOpened = !menu[id].isOpened

    this.setState({
      menu
    })
  }

  render() {
    const { menu } = this.state
    let selectElements = []

    console.log(menu)

    menu.forEach((item, i) => {
      selectElements.push(
        <Select
          key={i}
          handleSelectClick={this.toggleSelect}
          handleOptionClick={this.handleOptionClick}
          id={i}
          {...item}
        />
      )
    })

    return (
      <div>
        {selectElements}
        <Total menu={menu} />
      </div>
    )
  }
}

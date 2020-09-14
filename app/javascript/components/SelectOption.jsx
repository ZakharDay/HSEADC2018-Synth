import classnames from 'classnames'
import React from 'react'

export default class SelectOption extends React.Component {
  constructor(props) {
    super(props)
  }

  handleClick = () => {
    const { option, handleClick } = this.props
    handleClick(option)
  }

  render() {
    const { option, currentOption } = this.props
    const { name, price } = option

    const classes = classnames({
      SelectOption: true,
      current: option.name == currentOption.name
    })

    return (
      <div className={classes} onClick={this.handleClick}>
        {name} {price}
      </div>
    )
  }
}

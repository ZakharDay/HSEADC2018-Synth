import React from 'react'

export default class Total extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { menu } = this.props
    let total = 0

    menu.forEach((item, i) => {
      total += item.currentOption.price
    })

    return <div className="Total">Total: {total}</div>
  }
}

import React from 'react'
import ReactDOM from 'react-dom'
import Oscillators from '../containers/Oscillators'

document.addEventListener('DOMContentLoaded', () => {
  // const props = JSON.parse(document.getElementById('data').dataset.props)

  ReactDOM.render(
    <Oscillators />,
    document.body.appendChild(document.createElement('div'))
  )
})

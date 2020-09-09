import React from 'react'
import ReactDOM from 'react-dom'
import Hello from '../containers/Hello'

document.addEventListener('DOMContentLoaded', () => {
  const props = JSON.parse(document.getElementById('data').dataset.props)

  ReactDOM.render(
    <Hello {...props} />,
    document.body.appendChild(document.createElement('div'))
  )
})

import React from 'react'
import ReactDOM from 'react-dom'
import Hello from '../containers/Hello'

const props = {
  menu: [
    {
      title: 'Select 1',
      options: [
        {
          name: 'Option 1',
          price: 100
        },
        {
          name: 'Option 2',
          price: 200
        },
        {
          name: 'Option 3',
          price: 300
        }
      ]
    },
    {
      title: 'Select 2',
      options: [
        {
          name: 'Option 1',
          price: 1000
        },
        {
          name: 'Option 2',
          price: 2000
        },
        {
          name: 'Option 3',
          price: 3000
        }
      ]
    },
    {
      title: 'Select 3',
      options: [
        {
          name: 'Option 1',
          price: 10000
        },
        {
          name: 'Option 2',
          price: 20000
        },
        {
          name: 'Option 3',
          price: 30000
        }
      ]
    }
  ]
}

document.addEventListener('DOMContentLoaded', () => {
  // const props = JSON.parse(document.getElementById('data').dataset.props)

  ReactDOM.render(
    <Hello {...props} />,
    document.body.appendChild(document.createElement('div'))
  )
})

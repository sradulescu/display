import React, { Component } from 'react'
import Messanger from '../../services/messanger.js'
import Reveal from 'react-foundation-components/lib/reveal'

class Timer extends Component {
  
  constructor() {
    super()
    this.state = { running: false, time: '00:00' }
  }

  componentDidMount() {
    Messanger.on('timer:start', () => {
      this.setState({ running: true })
    })

    Messanger.on('timer:stop', () => {
      this.setState({ running: false })
    })

    Messanger.on('timer:time', message => {
      this.setState({
        time: message.data.time.toString()
      })
    })
  }

  render() {
  	return <Reveal size="tiny" show={this.state.running}>
      <div className="text-center h1">{this.state.time}</div>
    </Reveal>
  }
}

export default Timer
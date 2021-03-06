import React from 'react'
import Environment from '../../services/env'
import { Textfit } from 'react-textfit'
import MhubSyncingComponent from './generic/MhubSyncingComponent.jsx'

function upperCaseFirstIfLetter (string) {
  let stringRegex = /^\D/
  let regex = new RegExp(stringRegex)

  if (regex.test(string)) {
    let first = string.slice(0, 1)
    let stelse = string.slice(1, string.length)
    return first.toUpperCase() + stelse
  }
  return string
}

class Stage extends MhubSyncingComponent {

  constructor () {
    let urlPromise = Environment.load().then(env => `${env.moduleTournamentUrl}/settings/tournamentStage`)
    super('tournamentStage:updated', urlPromise)
    this.state = {data: ''}
  }

  render () {
    if (this.state.data) {
      return <Textfit className="cell" mode="single" max="20" forceSingleModeWidth="false">
        {upperCaseFirstIfLetter(this.state.data)}
      </Textfit>
    } else if (this.state.error) {
      return <div>Couldn't load stage</div>
    } else {
      return <div className="loading">
        <div className="dimmer">
          <div className="big loader"></div>
        </div>
      </div>
    }
  }

}

export default Stage

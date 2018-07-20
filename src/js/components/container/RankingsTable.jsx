import React, { Component } from 'react'
import Environment from '../../services/env'
import Messanger from '../../services/messanger'
import SyncingComponent from './generic/SyncingComponent.jsx'
import InfintieTable from '../presentational/InfiniteTable.jsx'
import axios from 'axios'

class RankingsTable extends SyncingComponent {

  constructor() {
    super('scores', Promise.resolve(''))

    Messanger.on('settings:reload', () => this.reload())
  }

  componentDidMount() {
    super.componentDidMount()
    this.reload()
    Messanger.on('settings:reload', () => this.reload())
  }

  reload() {
    return Environment.load()
    .then(env => {
      const stageUrl = `${env.moduleTournamentUrl}/settings/stage`
      return axios.get(stageUrl).then(response => {
        this.url = `${env.moduleRankingsUrl}/rankings/${response.data}`
        super.reload()
      })
    })
  }

  tableHeaders() {
    let headers = ['Rank', 'Team']
    if(this.state.data[0].scores.length === 1) {
      headers.push('Score')
    } else {
      headers.push('High')
      const scoresHeaders = Array.from(new Array(this.state.data[0].scores.length),(val,index)=>(index+1))
      headers = headers.concat(scoresHeaders)
    }

    return headers
  }

  tableData() {
    return this.state.data.map(rank => {
      const tableRank = { Rank: rank.rank, Team: `#${rank.team.number} - ${rank.team.name}` }
      if (rank.scores.length === 1) {
        tableRank.Score = rank.scores[0]
      } else {
        tableRank.High = rank.highest
        rank.scores.forEach((score, index) => {
          tableRank[(index + 1).toString()] = score
        })
      }
      return tableRank
    })
  }

  render() {
    if(!this.state.data) {
      return <div className="loading">
        <div className="dimmer">
          <div className="big loader"></div>
        </div>
      </div>
    }

    return <InfintieTable id="rankings" largeCell="Team" headers={this.tableHeaders()} highlight={['High']} data={this.tableData()}/>
  }
}

export default RankingsTable
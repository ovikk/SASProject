import axios from 'axios';
import _ from 'lodash';

import {
  root,
  FETCH_ACCOUNTS_LIST,
  FETCH_YANDEX_ACCOUNT_LIST,
  FETCH_VK_ACCOUNT_LIST,
  ACCOUNTS_DATE_CHANGED
} from './types'

export const changeDate = (period) => {
  return (dispatch) => {
    switch (period) {
      case 'today':
        const start = new Date();
        start.setHours(0,0,0,0)
        const end = new Date();
        end.setHours(23,59,59,999)
        dispatch({
          type: ACCOUNTS_DATE_CHANGED,
          payload: {firstday: start, lastday: end}
        })
    }
  }
}

const getYandexAccountsData = async (yandex, date) => {

  console.log(date.firstday, date.lastday)

  const responce = await axios({
    method: 'get',
    url: `${root}/sourcestat/yandex`,
    withCredentials: true
  })

  //console.log(responce)
  //console.log(new Date(responce.data[0].CampaingStats[0].StatDate))

  for (var i = 0, ii=yandex.length; i<ii; i++) {
    for (var j = 0, jj = yandex[i].campaignsinfo.length; j<jj; j++) {
      const campains = _.filter(
        responce.data[i].CampaingStats,
        function(o) {
          return o.CampName===yandex[i].campaignsinfo[j].name &&
                 new Date(o.StatDate) <= date.lastday &&
                 new Date(o.StatDate) >= date.firstday
        }
      )

      yandex[i].campaignsinfo[j].ClicksContext = Math.round(_.sumBy(campains, 'ClicksContext')) || 0
      yandex[i].campaignsinfo[j].ClicksSearch = Math.round(_.sumBy(campains, 'ClicksSearch')) || 0
      yandex[i].campaignsinfo[j].GoalConversionContext = Math.round(_.sumBy(campains, 'GoalConversionContext')) || 0
      yandex[i].campaignsinfo[j].GoalConversionSearch = Math.round(_.sumBy(campains, 'GoalConversionSearch')) || 0
      yandex[i].campaignsinfo[j].GoalCostContext = Math.round(_.sumBy(campains, 'GoalCostContext')) || 0
      yandex[i].campaignsinfo[j].GoalCostSearch  = Math.round(_.sumBy(campains, 'GoalCostSearch')) || 0
      yandex[i].campaignsinfo[j].SessionDepthContext = Math.round(_.sumBy(campains, 'SessionDepthContext')) || 0
      yandex[i].campaignsinfo[j].SessionDepthSearch = Math.round(_.sumBy(campains, 'SessionDepthSearch')) || 0
      yandex[i].campaignsinfo[j].ShowsContext = Math.round(_.sumBy(campains, 'ShowsContext')) || 0
      yandex[i].campaignsinfo[j].ShowsSearch = Math.round(_.sumBy(campains, 'ShowsSearch')) || 0
      yandex[i].campaignsinfo[j].SumContext = Math.round(_.sumBy(campains, 'SumContext')) || 0
      yandex[i].campaignsinfo[j].SumSearch = Math.round(_.sumBy(campains, 'SumSearch')) || 0
    }
    yandex[i].ClicksContext = Math.round(_.sumBy(yandex[i].campaignsinfo, 'ClicksContext'))
    yandex[i].ClicksSearch = Math.round(_.sumBy(yandex[i].campaignsinfo, 'ClicksSearch'))
    yandex[i].GoalConversionContext = Math.round(_.sumBy(yandex[i].campaignsinfo, 'GoalConversionContext'))
    yandex[i].GoalConversionSearch = Math.round(_.sumBy(yandex[i].campaignsinfo, 'GoalConversionSearch'))
    yandex[i].GoalCostContext = Math.round(_.sumBy(yandex[i].campaignsinfo, 'GoalCostContext'))
    yandex[i].GoalCostSearch  = Math.round(_.sumBy(yandex[i].campaignsinfo, 'GoalCostSearch'))
    yandex[i].SessionDepthContext = Math.round(_.sumBy(yandex[i].campaignsinfo, 'SessionDepthContext'))
    yandex[i].SessionDepthSearch = Math.round(_.sumBy(yandex[i].campaignsinfo, 'SessionDepthSearch'))
    yandex[i].ShowsContext = Math.round(_.sumBy(yandex[i].campaignsinfo, 'ShowsContext'))
    yandex[i].ShowsSearch = Math.round(_.sumBy(yandex[i].campaignsinfo, 'ShowsSearch'))
    yandex[i].SumContext = Math.round(_.sumBy(yandex[i].campaignsinfo, 'SumContext'))
    yandex[i].SumSearch = Math.round(_.sumBy(yandex[i].campaignsinfo, 'SumSearch'))
  }
  return {
    accounts: yandex,
    name: 'Yandex',
    ClicksContext: Math.round(_.sumBy(yandex, 'ClicksContext')),
    ClicksSearch: Math.round(_.sumBy(yandex, 'ClicksSearch')),
    GoalConversionContext: Math.round(_.sumBy(yandex, 'GoalConversionContext')),
    GoalConversionSearch: Math.round(_.sumBy(yandex, 'GoalConversionSearch')),
    GoalCostContext: Math.round(_.sumBy(yandex, 'GoalCostContext')),
    GoalCostSearch : Math.round(_.sumBy(yandex, 'GoalCostSearch')),
    SessionDepthContext: Math.round(_.sumBy(yandex, 'SessionDepthContext')),
    SessionDepthSearch: Math.round(_.sumBy(yandex, 'SessionDepthSearch')),
    ShowsContext: Math.round(_.sumBy(yandex, 'ShowsContext')),
    ShowsSearch: Math.round(_.sumBy(yandex, 'ShowsSearch')),
    SumContext: Math.round(_.sumBy(yandex, 'SumContext')),
    SumSearch: Math.round(_.sumBy(yandex, 'SumSearch')),
  }
}

export const getAccountsData = (date) => {

  function uniq(n) {
    const newcamp = _.uniqBy(n.campaignsinfo, 'name')
    n.campaignsinfo = newcamp
    return n
  }

  return (dispatch) => {
    const URL = `${root}/accountsdata`
    axios({
      method: 'get',
      url: URL,
      withCredentials: true
    })
      .then(function(responce){
        const vk = _.filter(responce.data, function(o) { return (o.source === "Vkontakte")})
        const yandex = getYandexAccountsData(_.map(_.filter(responce.data, function(o) { return (o.source === "Яндекс Директ")}), uniq), date)
        dispatch({
          type: FETCH_YANDEX_ACCOUNT_LIST,
          payload: yandex
        })
      })
      .then(responce => {

      })
      .catch(function(error){
        console.log("ERROR", console.log(error))
      })
  }
}

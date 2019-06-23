import React, {Component, Fragment} from "react";
import { render } from "react-dom";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

import Select from './select/select';

const BASE_PATH = 'http://coincap.io/history';

const DAY = '/1day'
const WEEK = '/7day'
const MOUNTH = '/30day'
const QUYRT = '/90day'
const HALFYEAR = '/180day'
const YEAR = '/365day'
const EVER = ''

const PERIOD = [
  {
    value: DAY,
    label: 'DAY',
  },
  {
    value: WEEK,
    label: 'WEEK',
  },
  {
    value: MOUNTH,
    label: 'MOUNTH',
  },
  {
    value: QUYRT,
    label: 'QUYRT',
  },
  {
    value: YEAR,
    label: 'YEAR',
  },
  {
    value: EVER,
    label: 'EVER',
  }
]


const BITCOIN = 'BTC'
const ETHIRUM = 'ETH'
const XRP = 'XRP'
const Litecoin = 'LTC'
const BitcoinCash = 'BCH'
const EOS = 'EOS'
const Binance  = 'BNB'
const BitcoinSV  = 'BSV'
const Tether  = 'USDT'
const Stellar  = 'XLM'

const COIN = [
  {
    value: BITCOIN,
    label: 'BITCOIN',
  },
  {
    value: ETHIRUM,
    label: 'ETHIRUM',
  },
  {
    value: XRP,
    label: 'XRP',
  },
  {
    value: Litecoin,
    label: 'Litecoin',
  },
  {
    value: BitcoinCash,
    label: 'BitcoinCash',
  },
  {
    value: EOS,
    label: 'EOS',
  },
  {
    value: Binance,
    label: 'Binance',
  },
  {
    value: BitcoinSV,
    label: 'BitcoinSV',
  },
  {
    value: Tether,
    label: 'Tether',
  },
  {
    value: Stellar,
    label: 'Stellar',
  }
]

class App extends Component{

  state = {
    history: [],
    period: HALFYEAR,
    coin: BITCOIN 
  }
  fetchData = (period, coin) => {
    fetch(`${BASE_PATH}${period}/${coin}`)
    .then(res => res.json())
    .then(res => this.setState({history: res.price}))
      .catch(error => error);
  }

  componentDidMount(){
    const {period, coin} = this.state
    this.fetchData(period, coin)   
  }

  handlePeriodChange = ({ target: { value } }) => {
    const {coin} = this.state
    this.setState({
      period: value
    }, () => {
      this.fetchData(this.state.period, coin);
    })
  alert(`${BASE_PATH}${this.state.period}/${coin}`)
  }

  handleCoinChange = ({ target: { value } }) => {
    const { period } = this.state;
    this.setState({
      coin: value
    }, () => {
      this.fetchData(period, this.state.coin);
    })
  
  }
  render() {
    const {period, coin} = this.state

    const options = {
      chart: {
        type: 'spline'
      },
      title: {
        text: `${coin} for ${period} `
      },
      series: [
        {
          names: 'BTC',
          data: this.state.history.map(v => Math.round(v[1]))
        }
      ]
    };

    return(
      <Fragment>
        <Select options={PERIOD} handleChange={this.handlePeriodChange} value={period} />
        <Select options={COIN} handleChange={this.handleCoinChange} value={coin} />
        <HighchartsReact highcharts={Highcharts} options={options} />
      </Fragment>
      
    )
  
  }
}
render(<App />, document.getElementById("root"));
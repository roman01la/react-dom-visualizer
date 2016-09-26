import React, { Component } from 'react';
import Screen from './screen'
import Seats from './seats'
import Total from './total'

const styles = {
  container: {
    width: 500,
    margin: '0 auto',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column'
  },
  btn: {
    border: 'none',
    padding: '6px 10px',
    borderRadius: 2,
    fontSize: 14,
    color: '#242424',
    marginTop: 30
  }
}

const range = (ln) => [...new Array(ln)].map((_, idx) => idx);

const generateSeats = (rows, colls) => range(rows * colls).map((idx) => ({
  row: Math.ceil((idx + 1) / colls),
  seat: (idx + 1) % colls,
  state: 'free'
}));

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      prices: [5, 5, 5, 6],
      totalPrice: 0,
      rowLn: 10,
      allSeats: generateSeats(4,10),
    }
  }
  render() {

    const { totalPrice, rowLn, allSeats } = this.state
    const { uuid, takeSeat } = this.props

    return (
      <div style={styles.container}>
        <Screen />
        <Seats seats={allSeats} rowLn={rowLn} uuid={uuid} />
        <Total>{totalPrice}</Total>
        <button style={styles.btn}>reset seats</button>
      </div>
    )
  }
}

export default App

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import SeasonDisplay from './SeasonDisplay';
import Loader from './Loader';

class App extends Component {

  // constructor(props) {
  //   super(props);

  //   this.state = { lat: null, errorMessage: '' };

  //   window.navigator.geolocation.getCurrentPosition(
  //     (position) => {
  //       this.setState({ lat: position.coords.latitude })
  //       console.log(position)
  //     },
  //     (err) => {
  //       this.setState({ errorMessage: err.message })
  //     }
  //   )

  // }

  state = { lat: null, errorMessage: '' }

  componentDidMount() {

    window.navigator.geolocation.getCurrentPosition(
      (position) => { this.setState({ lat: position.coords.latitude }) },
      (err) => { this.setState({ errorMessage: err.message }) }
    )
  }

  renderContent = () => {

    if (this.state.errorMessage && !this.state.lat) {
      return <div>Error: {this.state.errorMessage}</div>
    }

    if (!this.state.errorMessage && this.state.lat) {
      return <div>
        <SeasonDisplay lat={this.state.lat} />
      </div>
    }

    return <div>
      <Loader message='Please accept the location request!' />
      {/* <Loader />  */}
    </div>

  }

  render() {
    return (
      <div style={{border: '5px solid red'}}>
        {this.renderContent()}
      </div>
    )

  }

}

ReactDOM.render(<App />, document.querySelector('#root'));
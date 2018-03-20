import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import { input, Button } from 'react-bootstrap';

class App extends Component {
  constructor() {
    super();
    this.state = {
      phrase: '',
      translated: 'Papoy?'
    };
  }

  handlePhraseChange(e) {
    this.setState({
      phrase: e.target.value
    });
  }

  handleSearch() {
    let text = this.state.phrase.split(' ').join('%20') + '%21';
    let url = 'http://api.funtranslations.com/translate/minion.json?text=';
    axios.post(url + text)
    //.then(res => console.log(res.data.contents.translated));
    .then(res => {
      let newPhrase = res.data.contents.translated.split('');
      newPhrase[0] = newPhrase[0].toUpperCase();
      newPhrase = newPhrase.join('');
      this.setState({translated: newPhrase});
    });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Minionator</h1>
        </header>
        <div style={{marginTop: 50, fontFamily: 'Dessau Drei'}}>
          {this.state.translated && <div style={{fontSize: 35}}>{this.state.translated}</div>}
        </div>
        <form>
          <div className='form-group'>
            <input onChange={this.handlePhraseChange.bind(this)} placeholder='Minionize Here' style={{borderRadius: 5, width: 1000, textAlign: 'center', height: 75, fontSize: 30, marginTop: 150}} type='text' />
            <div><Button onClick={this.handleSearch.bind(this)}>Pokka ta tipa!</Button></div>
          </div>
        </form>
      </div>
    );
  }
}

export default App;

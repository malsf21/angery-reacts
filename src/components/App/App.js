import React, { Component } from 'react';
import './App.scss';

import Container from 'react-bulma-components/lib/components/container';
import Content from 'react-bulma-components/lib/components/content';
import Footer from 'react-bulma-components/lib/components/footer';
import Heading from 'react-bulma-components/lib/components/heading';
import Hero from 'react-bulma-components/lib/components/hero';
import Section from 'react-bulma-components/lib/components/section';

import SearchSong from '../SearchSong/SearchSong';
import SongsList from '../SongsList/SongsList';

const Sentiment = require('sentiment');
const sentiment = new Sentiment();


class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      loading: false,
      error: "",
      songs: []
    }
  }

  handleSongSubmit = (title, artist) => {
    this.setState({loading: true});
    let data = {
      "title": title, 
      "artist": artist
    };
    let url = process.env.REACT_APP_ANGERY_REACTS_SERVER_URL;
    fetch(url, {
      method: 'POST',
      body: JSON.stringify(data),
      headers:{
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
    .then(response => {
      if (response["error"] !== "song not found!"){
        let sentimentResult = sentiment.analyze(response.lyrics);
        response["sentiment"] = sentimentResult;
        let newSongs = this.state.songs;
        newSongs.unshift(response)
        this.setState({
          songs: newSongs,
          error: ""
        });
      }
      else{
        this.setState({error: "song not found, check your spelling!"});
      }
      this.setState({loading: false});
    })
    .catch(error => {
      console.error('Error:', error);
      this.setState({loading: false});
    });
  }
  render(){
    return (
      <div className="App">
        <Hero color="info">
          <Hero.Body>
            <Container>
              <Heading><span role="img" aria-label="angry react!">😡</span> angery reacts</Heading>
              <Heading subtitle>
                figure out how positive/negative your music library is
              </Heading>
            </Container>
          </Hero.Body>
        </Hero>
        <Section>
          <Container>
            <SearchSong 
              loading={this.state.loading} 
              handleSongSubmit={(title, artist) => this.handleSongSubmit(title, artist)}
            ></SearchSong>
            <p>
              <b>raw score</b>: a sum of all the weights of the words in a song (where a positive weight is a positive word, and negative is negative)
              <br />
              <b>comparative</b>: raw score divided by total number of words in song, ranges from -1.0 to 1.0
            </p>
            <Heading subtitle color="danger">
                {this.state.error}
            </Heading>
            <hr />
            <SongsList songs={this.state.songs}></SongsList>
          </Container>
        </Section>
        <Footer>
          <Container>
            <Content className="has-text-centered">
              <p>
                built by <a href="https://matthewwang.me" target="_blank" rel="noopener noreferrer">matt wang!</a> check it out on <a href="https://github.com/malsf21/angery-reacts" target="_blank" rel="noopener noreferrer">github!</a>
              </p>
              <p>
                uses <a href="https://reactjs.org" target="_blank" rel="noopener noreferrer">react</a>, <a href="https://bulma.io/" target="_blank" rel="noopener noreferrer">bulma</a>, <a href="https://www.npmjs.com/package/sentiment" target="_blank" rel="noopener noreferrer">sentiment</a>, and the <a href="https://docs.genius.com/" target="_blank" rel="noopener noreferrer">genius api</a>
              </p>
            </Content>
          </Container>
        </Footer>
      </div>
    );
  }
}

export default App;

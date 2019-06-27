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
    let url = "http://localhost:5000/lyrics";
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
        console.log(sentimentResult);
        response["sentiment"] = sentimentResult;
        console.log(response)
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
                figure out how angry your music library is
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
            <Heading subtitle color="danger">
                {this.state.error}
            </Heading>
            <hr />
            <SongsList songs={this.state.songs}></SongsList>
          </Container>
        </Section>
        <Footer>
          <Container>
            <Content className="text-center">
              built by matt wang!
            </Content>
          </Container>
        </Footer>
      </div>
    );
  }
}

export default App;

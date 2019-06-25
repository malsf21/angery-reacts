import React from 'react';
import './App.scss';

import Container from 'react-bulma-components/lib/components/container';
import Content from 'react-bulma-components/lib/components/content';
import Footer from 'react-bulma-components/lib/components/footer';
import Heading from 'react-bulma-components/lib/components/heading';
import Hero from 'react-bulma-components/lib/components/hero';
import Section from 'react-bulma-components/lib/components/section';

import SongBox from '../SongBox/SongBox';

function App() {
  return (
    <div className="App">
      <Hero color="info">
        <Hero.Body>
          <Container>
            <Heading>angery reacts</Heading>
            <Heading subtitle size={3}>
              figure out how angry your music library is
            </Heading>
          </Container>
        </Hero.Body>
      </Hero>
      <Section>
        <Container>
          <SongBox songTitle={"Nice for What"} artist={"Drake"} albumArt={"https://images.genius.com/ab4ffbf9141246599da5d959f09760a4.1000x1000x1.jpg"} polarity={0.36}></SongBox>
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

export default App;

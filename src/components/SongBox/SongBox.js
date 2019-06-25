import React, { Component } from 'react';

import Box from 'react-bulma-components/lib/components/box';
import Button from 'react-bulma-components/lib/components/button';
import Content from 'react-bulma-components/lib/components/content';
import Heading from 'react-bulma-components/lib/components/heading';
import Image from 'react-bulma-components/lib/components/image';
import Media from 'react-bulma-components/lib/components/media';
import Tag from 'react-bulma-components/lib/components/tag';

class SongBox extends Component {
	render(){
		return(
            <Box>
                <Media>
                <Media.Item renderAs="figure" position="left">
                    <Image renderAs="p" size={128} alt="album cover!" src={this.props.albumArt} />
                </Media.Item>
                <Media.Item>
                    <Content>
                        <Heading>{this.props.songTitle} <small>by {this.props.artist}</small></Heading>
                        <p>
                        <Tag color="danger">Angery</Tag> <Tag><span>Polarity:</span><strong>{this.props.polarity}</strong></Tag>
                        </p>
                    </Content>
                    <Button link>Show Lyric Analysis</Button>
                </Media.Item>
                </Media>
            </Box>
		)
	}
}

export default SongBox;

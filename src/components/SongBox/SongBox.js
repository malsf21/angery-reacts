import React, { Component } from 'react';

import Box from 'react-bulma-components/lib/components/box';
import Button from 'react-bulma-components/lib/components/button';
import Content from 'react-bulma-components/lib/components/content';
import Heading from 'react-bulma-components/lib/components/heading';
import Image from 'react-bulma-components/lib/components/image';
import Media from 'react-bulma-components/lib/components/media';
import Tag from 'react-bulma-components/lib/components/tag';

class SongBox extends Component {
    constructor(props){
        super(props);
        this.state = {
            showLyrics: false
        }
    }
	render(){
		return(
            <Box>
                <Media>
                    <Media.Item position="left">
                        <Image size={128} alt="album cover!" src={this.props.songInfo.img_url} />
                    </Media.Item>
                    <Media.Item>
                        <Content>
                            <Heading>{this.props.songInfo.title} <small>by {this.props.songInfo.artist}</small></Heading>
                            <Tag.Group>
                                {
                                    this.props.songInfo.sentiment.score > 0 ? <Tag color="success">good vibes</Tag> : <Tag color="danger">angery reacts</Tag>
                                }
                                <Tag><span>comparative:</span><strong>{this.props.songInfo.sentiment.comparative.toFixed(4)}</strong></Tag>
                                <Tag><span>raw score:</span><strong>{this.props.songInfo.sentiment.score}</strong></Tag>
                            </Tag.Group>
                        </Content>
                        <Button onClick={() => this.setState({showLyrics: !this.state.showLyrics})}>lyric analysis</Button>
                    </Media.Item>
                </Media>
                {
                    this.state.showLyrics &&
                    <Content className="display-linebreak">
                        {this.props.songInfo.lyrics}
                    </Content>
                }
            </Box>
		)
	}
}

export default SongBox;

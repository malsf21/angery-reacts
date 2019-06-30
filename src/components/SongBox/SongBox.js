import React, { Component } from 'react';
import sanitize from 'sanitize-html';

import Box from 'react-bulma-components/lib/components/box';
import Button from 'react-bulma-components/lib/components/button';
import Columns from 'react-bulma-components/lib/components/columns';
import Content from 'react-bulma-components/lib/components/content';
import Heading from 'react-bulma-components/lib/components/heading';
import Image from 'react-bulma-components/lib/components/image';
import Media from 'react-bulma-components/lib/components/media';
import Tag from 'react-bulma-components/lib/components/tag';

class SongBox extends Component {
    constructor(props){
        super(props);
        this.state = {
            showLyrics: false,
            showAnalysis: false
        }
        console.log(this.props.songInfo.lyrics);
    }
    createTaggedLyrics = () => {
        let cleanedLyrics = sanitize(this.props.songInfo.lyrics);
        cleanedLyrics = cleanedLyrics.replace(/^\s+|\s+$/g, '');
        cleanedLyrics = cleanedLyrics.split("\n").join(" <br /> ");
        let words = cleanedLyrics.split(" ");
        let taggedLyrics = "";
        for (let i = 0; i < words.length; i++){
            if (this.props.songInfo.sentiment.positive.includes(words[i])){
                taggedLyrics += "<span class='has-text-weight-bold has-text-success'>" + words[i] + "</span>";
            }
            else if (this.props.songInfo.sentiment.negative.includes(words[i])){
                taggedLyrics += "<span class='has-text-weight-bold has-text-danger'>" + words[i] + "</span>";
            }
            else{
                taggedLyrics += words[i];
            }
            taggedLyrics += " "
        }
        return {__html: taggedLyrics}
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
                            <Heading>{this.props.songInfo.title} <span className="has-text-weight-normal">by {this.props.songInfo.artist}</span></Heading>
                            <Tag.Group>
                                {
                                    this.props.songInfo.sentiment.score > 0 ? <Tag color="success">good vibes</Tag> : <Tag color="danger">angery/sad reacts</Tag>
                                }
                                <Tag><span>comparative:</span><strong>{this.props.songInfo.sentiment.comparative.toFixed(4)}</strong></Tag>
                                <Tag><span>raw score:</span><strong>{this.props.songInfo.sentiment.score}</strong></Tag>
                            </Tag.Group>
                        </Content>
                        <Button onClick={() => this.setState({showLyrics: !this.state.showLyrics})}>show lyrics</Button>{" "}
                        <Button onClick={() => this.setState({showAnalysis: !this.state.showAnalysis})}>show analysis</Button>
                        <Content>
                        <Columns>
                        {
                            this.state.showLyrics &&
                            <Columns.Column className="display-linebreak">
                                <hr />
                                <Heading subtitle>Lyrics</Heading>
                                <div>
                                    {this.props.songInfo.lyrics.replace(/^\s+|\s+$/g, '')}
                                </div>
                            </Columns.Column>
                        }
                        {
                            this.state.showAnalysis &&
                            <Columns.Column>
                                <hr />
                                <Heading subtitle>Analysis</Heading>
                                <div dangerouslySetInnerHTML={this.createTaggedLyrics()}>
                                </div>
                            </Columns.Column >
                        }
                        </Columns>
                    </Content>
                    </Media.Item>
                </Media>
            </Box>
		)
	}
}

export default SongBox;

import React, { Component } from 'react';

import Level from 'react-bulma-components/lib/components/level';
import { Field, Control, Input } from 'react-bulma-components/lib/components/form';
import Heading from 'react-bulma-components/lib/components/heading';
import Button from 'react-bulma-components/lib/components/button';
import Loader from 'react-bulma-components/lib/components/loader';

class SearchSong extends Component {
    constructor(props){
        super(props);
        this.state = {
            artist: "",
            title: ""
        }
    }
    handleArtistChange = e => {
        this.setState({artist: e.target.value});
    }
    handleTitleChange = e => {
        this.setState({title: e.target.value});
    }
    handleSubmit = () => {
        this.props.handleSongSubmit(this.state.title, this.state.artist)
    }
    renderSubmitButton = () => {
        if (this.props.loading){
            return(
                <Loader />
            );
        }
        else{
            return(
                <Button color="success" onClick={this.handleSubmit}>
                    search
                </Button>
            );
        }
    }
	render(){
		return(
            <Level>
                <Level.Side align="left">
                    <Level.Item>
                        <Field>
                            <Control>
                                <Input placeholder="song title" value={this.state.title} onChange={this.handleTitleChange} />
                            </Control>
                        </Field>
                    </Level.Item>
                    <Level.Item>
                        <Field>
                            <Control>
                                <Input placeholder="artist name" value={this.state.artist} onChange={this.handleArtistChange} />
                            </Control>
                        </Field>
                    </Level.Item>
                    <Level.Item>
                       {this.renderSubmitButton()}
                    </Level.Item>
                </Level.Side>
            </Level>
		)
	}
}

export default SearchSong;

import React, { Component } from 'react';

import Level from 'react-bulma-components/lib/components/level';
import { Field, Control, Input } from 'react-bulma-components/lib/components/form';
import Button from 'react-bulma-components/lib/components/button';
import Loader from 'react-bulma-components/lib/components/loader';

class SearchBar extends Component {
    constructor(props){
        super(props);
        this.state = {
            artist: "",
            title: "",
            playlist: ""
        }
    }
    handleArtistChange = e => {
        this.setState({artist: e.target.value});
    }
    handleTitleChange = e => {
        this.setState({title: e.target.value});
    }
    handlePlaylistChange = e => {
        this.setState({playlist: e.target.value});
    }
    handleSongSubmit = () => {
        this.props.handleSongSubmit(this.state.title, this.state.artist);
    }
    handlePlaylistSubmit = () => {
        this.props.handlePlaylistSubmit(this.state.playlist);
    }
    renderSongSubmitButton = () => {
        if (this.props.loading){
            return(
                <Loader />
            );
        }
        else{
            return(
                <Button color="success" onClick={this.handleSongSubmit}>
                    search
                </Button>
            );
        }
    }
    renderPlaylistSubmitButton = () => {
        if (this.props.loading){
            return(
                <Loader />
            );
        }
        else{
            return(
                <Button color="success" onClick={this.handlePlaylistSubmit}>
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
                       {this.renderSongSubmitButton()}
                    </Level.Item>
                </Level.Side>
                <Level.Side align="right">
                    <Level.Item>
                        <Field>
                            <Control>
                                <Input placeholder="spotify playlist id" value={this.state.playlist} onChange={this.handlePlaylistChange} />
                            </Control>
                        </Field>
                    </Level.Item>
                    <Level.Item>
                       {this.renderPlaylistSubmitButton()}
                    </Level.Item>
                </Level.Side>
            </Level>
		)
	}
}

export default SearchBar;

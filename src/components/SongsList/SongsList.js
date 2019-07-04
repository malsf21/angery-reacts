import React, { Component } from 'react';

import Heading from 'react-bulma-components/lib/components/heading';
import SongBox from "../SongBox/SongBox";

class SongsList extends Component {
	render(){
        if (this.props.songs.length === 0){
            return(
                <Heading className="has-text-centered" style={{"marginTop": "1em", "marginBottom": "1em"}}>it's empty. why not search something?</Heading>
            );
        }
        return(
            <div>
                {
                    this.props.songs.map((element, i) => {
                        return (
                            <SongBox 
                                songInfo={element}
                                key={i}
                            >
                            </SongBox>
                        )
                    })
                }
            </div>
        );
	}
}

export default SongsList;

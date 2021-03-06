import React, { Component } from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import Spotify from '../../util/Spotify';



class App extends Component {
  constructor (props) {
    super(props);
    this.state = {
      searchResults: [],
	    playlistName: "New Playlist",
	    playlistTracks: [],

    };
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
}

updatePlaylistName(name){
  	this.setState({playlistName: name});
}

addTrack(track){
	let addTrackCheck = this.state.playlistTracks.filter((playlistTrack) => playlistTrack.id === track.id);
	if (addTrackCheck.length === 0) {
			this.setState({playlistTracks: [...this.state.playlistTracks, track]});
			} else {alert("You've already added this track to your playlist")}
}

removeTrack(track){
	let newPlaylist = this.state.playlistTracks.filter((playlistTrackRemoval) =>
	playlistTrackRemoval.id !== track.id);
	this.setState({playlistTracks: newPlaylist});

}

savePlaylist () {
	let trackURIs = this.state.playlistTracks.map((track) => track.uri);
	Spotify.savePlaylist(this.state.playlistName, trackURIs);
	const playlist = "New Playlist";
	this.setState({playlistName: playlist, playlistTracks: []});

}


search(term) {
	Spotify.search(term).then(searchResults => {
		this.setState({searchResults: searchResults});
	} );
}



  render() {
    return (
        <div>
          <h1>Ja<span className="highlight">mmm</span>ing</h1>
          <div className="App">
            <SearchBar onSearch={this.search} />
            <div className="App-playlist">
              <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack}/>
              <Playlist onSave={this.savePlaylist} onNameChange={this.updatePlaylistName} onRemove={this.removeTrack} playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks}/>
            </div>
          </div>
        </div>
    );
  }
}

export default App;

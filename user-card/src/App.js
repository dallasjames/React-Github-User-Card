import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

class App extends Component {
    constructor() {
        super()

        this.state = {
            user: 'dallasjames',
            name: '',
            avatar: '',
            fuser: [],
            fname: [],
            favatar: []
        }
    }

    componentDidMount() {
        this.fetchCards()
    }

    fetchCards = () => {
        axios.get(`https://api.github.com/users/${this.state.user}`)
            .then(res => {
                console.log(res)
                this.setState({
                    user: res.data.login,
                    name: res.data.name,
                    avatar: res.data.avatar_url
                })
            })
            .catch(err => {
                console.log(err)
            })

        axios.get(`https://api.github.com/users/${this.state.user}/followers`)
            .then(res => {
                console.log(res.data)
                this.setState({
                    fuser: res.data[0].login,
                    fname: res.data[0].url,
                    favatar: res.data[0].avatar_url,
                    fuser2: res.data[1].login,
                    fname2: res.data[1].url,
                    favatar2: res.data[1].avatar_url
                })
            })
            .catch(err => {
                console.log(err)
            })
    }

    render() {
        return (
            <>
                <div className='card'>
                    <img src={this.state.avatar}/>
                    <h1>{this.state.user}</h1>
                    <h2>{this.state.name}</h2>
                </div>

                    <div className='followerTitle'><h1>Followers of {this.state.user}</h1></div>
                    <div className='allCards'>
                    <div className='card'>
                        <img src={this.state.favatar}/>
                        <h1>{this.state.fuser}</h1>
                        <h2><a href={this.state.fname}>{this.state.fname}</a></h2>
                    </div>
                        <div className='card'>
                            <img src={this.state.favatar2}/>
                            <h1>{this.state.fuser2}</h1>
                            <h2><a href={this.state.fname2}>{this.state.fname2}</a></h2>
                        </div>
                    </div>
            </>
        )
    }
}

export default App;

import React, { Component } from 'react';
import click1 from './audio/click1.wav';
import click2 from './audio/click2.wav';

class Metronome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bpm: 100,
            playing: false,
            count: 0,
            beatsPerMeasure: 4, 
            validClick: true
        }
        this.click1 = new Audio(click1);
        this.click2 = new Audio(click2);
    }

    handleBpmSliderChange = event => {
        const bpm = event.target.value;     

        if (bpm === "" || bpm < 60 || bpm > 240) {
            // clearInterval(this.timer);
            this.setState({
                validClick: false
            });
        }

        if (this.state.playing && bpm !== "" && bpm >= 60 && bpm <= 240) {
            clearInterval(this.timer);
            
            this.timer = setInterval(this.playClick, (60 / bpm) * 1000);
            this.setState({
                validClick: true,
                count: 0, 
                bpm
            });
        } else {
            this.setState({ bpm });
        }
    }
 
    startStop = () => {
        if (this.state.bpm >= 60 && this.state.bpm <= 240) {
            if (this.state.playing) {
                clearInterval(this.timer);
                this.setState({
                    playing: false
                });
            } else {
                this.timer = setInterval(
                    this.playClick,
                    (60 / this.state.bpm) * 1000
                );
                this.setState({
                    validClick: true,
                    count: 0,
                    playing: true
                },
                this.playClick
                );
            }
        } else {
            clearInterval(this.timer);
                this.setState({
                    playing: false
            });
        }
    }

    playClick = () => {
        const { count, beatsPerMeasure } = this.state;

        if (count % beatsPerMeasure === 0) {
            this.click2.play();
        } else {
            this.click1.play();
        }

        this.setState(state => ({
            count: (state.count + 1) % state.beatsPerMeasure
        }));
    }

    render() {
        return (
            <div className='metronome'>
                <div className="bpm-slider">
                    <div>
                        <input type="text" value={this.state.bpm} onChange={this.handleBpmSliderChange} /> BPM
                    </div>
                    <input type="range" min="60" max="240" value={this.state.bpm} onChange={this.handleBpmSliderChange}/>
                </div>
                <button onClick={this.startStop}>{this.state.playing ? 'Stop' : 'Start'}</button>
                <div>{"\n"}</div>
                <div className="errorMessage">{this.state.validClick ? '' : 'Please enter BPM between 60 and 240'}</div>
            </div>
        );
    }
}

export default Metronome;
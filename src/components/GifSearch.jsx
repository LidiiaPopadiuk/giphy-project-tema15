import { Component } from "react";
import x from './Gif.module.css'
import musicPlay from '../music/music.mp3'
import { SiYoutubemusic } from "react-icons/si";


export class GifSearch extends Component {

    state = {
        inputV: 'Welcome',
        audio: null,
        musicIs: false,
    }

    componentDidMount = () => {
        this.getStickers()
        console.log('mount');

        const audio = new Audio(musicPlay)
        this.setState({ audio: audio })
    }

    componentDidCatch(error, info) {
        console.log('error', error);
        console.log('info', info);
    }

    gifLinkInfo = () => {
        const thisInputValue = this.state.inputV
        const gifLink = `https://api.giphy.com/v1/stickers/search?api_key=NXXeh4K8JqfasbcFtX3EhVjPZollKl4D&q=${thisInputValue}&limit=25&offset=0&rating=g&lang=en&bundle=messaging_non_clips`
        return gifLink
    }

    inputDataFromClient = (e) => {
        const inputValue = e.target.value
        this.setState({
            inputV: inputValue,
        }, () => {
            console.log(this.state);
        })
    }

    getStickers = async () => {
        try {
            const getStikersFetch = await fetch(this.gifLinkInfo())
            const getStickersToParse = await getStikersFetch.json()
            console.log('stickers', getStickersToParse);

            this.props.infoToDo(getStickersToParse)
            document.querySelector('input').value = ''

        } catch (e) {
            console.log(e);
        }
    }

    music = () => {
        const { audio, musicIs } = this.state
        if (!musicIs) {
            audio.play().catch((e) => {
                console.log('Error music', e);
            })
        } else {
            audio.pause()
        }
        this.setState({ musicIs: !musicIs })
    }
    render() {
        return (
            <div>
                <h2 className={x.title}>GIPHY SEARCH <span onClick={this.music}>{<SiYoutubemusic className={x.icon} />}</span></h2>
                <div className={x.divMain}>
                    <input onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            e.preventDefault();
                            this.getStickers()
                        }
                    }} onChange={this.inputDataFromClient} id="input" type="text" placeholder="Введіть ваш запит" autocomplete="off" />
                    <button onClick={this.getStickers}>Шукати</button>
                </div>
            </div>
        )
    }
}


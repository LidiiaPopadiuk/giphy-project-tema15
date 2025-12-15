import { Component } from "react";
import x from './Gif.module.css'
import musicPlay from '../music/music.mp3'
import { SiYoutubemusic } from "react-icons/si";

let page = 0
let limit = 25

export class GifSearch extends Component {
   
    lastQuery = 'Welcome'
    isLoaded = false;

    state = {
        inputV: 'Welcome',
        audio: null,
        musicIs: false,
    }

    componentDidMount = () => {
        if (this.isLoaded) return
        this.isLoaded = true;
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
        const gifLink = `https://api.giphy.com/v1/stickers/search?api_key=NXXeh4K8JqfasbcFtX3EhVjPZollKl4D&q=${this.lastQuery}&limit=${limit}&offset=${page}&rating=g&lang=en&bundle=messaging_non_clips`
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
            page = 0

            this.lastQuery = this.state.inputV || "Welcome";

            const getStikersFetch = await fetch(this.gifLinkInfo())
            const getStickersToParse = await getStikersFetch.json()
            console.log('stickers', getStickersToParse);

            this.props.infoToDo(getStickersToParse)
            this.props.infobtnSearch(this.addPage)

            console.log('look', this.props.infoToDo);

            this.setState({inputV: ''})

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

    addPage = async () => {
        page += limit

        const getStickersFetch = await fetch(this.gifLinkInfo())
        const getStickersToParse = await getStickersFetch.json()

        this.props.infoToDo(getStickersToParse)
    }
    render() {
        // this.props.infobtnSearch(this.addPage)
        return (
            <div>
                <h2 className={x.title}>GIPHY SEARCH <span onClick={this.music}>{<SiYoutubemusic className={x.icon} />}</span></h2>
                <div className={x.divMain}>
                    <input onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            e.preventDefault();
                            this.getStickers()
                        }
                    }} value={this.state.inputV} onChange={this.inputDataFromClient} id="input" type="text" placeholder="Введіть ваш запит" autoComplete="off" />
                    <button onClick={this.getStickers}>Шукати</button>
                </div>
            </div>
        )
    }
}

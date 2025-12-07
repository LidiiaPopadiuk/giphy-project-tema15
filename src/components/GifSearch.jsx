import { Component } from "react";
import x from './Gif.module.css'


export class GifSearch extends Component {

    state = {
        inputV: '',
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

            // this.setState({inputV: ''})
        } catch (e) {
            console.log(e);
        }
    }
    render() {
        return (
            <div>
                <h2 className={x.title}>Giphy Search</h2>
                <div className={x.divMain}>
                    <input onKeyDown={(e) => {
                        if (e.key === 'Enter') this.getStickers()
                    }} onChange={this.inputDataFromClient} id="input" type="text" placeholder="Введіть ваш запит" autocomplete="off"/>
                    <button onClick={this.getStickers}>Шукати</button>
                </div>
            </div>
        )
    }
}


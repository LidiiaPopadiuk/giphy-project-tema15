import { Component } from "react";
import { nanoid } from 'nanoid'
import y from './Gif.module.css'

export class GifList extends Component {

    render() {

        const stickers = this.props.infoToShow
        if (!stickers || !stickers.data) {
            return <ul style={{backgroundColor: 'black'}}></ul>
        }

        if(stickers.data.length === 0) {
            return <p className={y.subtitle}>Не знайдено</p>
        }

        return (
            <ul>
                {stickers.data.map(sticker => {
                    return (
                        <li key={nanoid()}>
                            <img src={sticker.images.fixed_height.url} alt="sticker" />
                        </li>
                    )
                })}
            </ul>
        )
    }
}


 
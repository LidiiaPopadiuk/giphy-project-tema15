import { GifSearch } from "./components/GifSearch";
import { GifList } from "./components/GifList";
import "./App.css";
import { Component } from "react";

class App extends Component {

  state = {
    gifs: null,
    loadMore: null,
  }
  infoToList = (info) => {
    this.setState(prevState => {
      if(!prevState.gifs) return {gifs: info}
      if(info.pagination.offset === 0 ) return {gifs: info}
      return {
        gifs: {
          ...info,
          data: [...prevState.gifs.data, ...info.data]
        }
      }
    })
  };

  infoToListbutton = (i) => {
    this.setState({ loadMore: i })
  }
  render() {
    return (
      <div className="App">
        <GifSearch infobtnSearch={this.infoToListbutton} infoToDo={this.infoToList} />
        <GifList infoBtn={this.state.loadMore} infoToShow={this.state.gifs} />
      </div>
    );
  }
}

export default App;



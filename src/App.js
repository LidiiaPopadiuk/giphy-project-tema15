import { GifSearch } from "./components/GifSearch";
import { GifList } from "./components/GifList";
import "./App.css";
import { Component } from "react";

class App extends Component {

  state = {
    gifs: null
  }
  infoToList = (info) => {
    this.setState({ gifs: info })
  };
  render() {
    return (
      <div className="App">
        <GifSearch infoToDo={this.infoToList} />
        <GifList infoToShow={this.state.gifs} />
      </div>
    );
  }
}

export default App;



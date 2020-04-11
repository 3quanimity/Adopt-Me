import React from "react";

class Carousel extends React.Component {
  state = {
    photos: [],
    active: 0, // index of active pic
  };

  // filter out received photos by size
  static getDerivedStateFromProps({ media }) {
    let photos = ["https://placecorgi.com/600/600"];

    if (media.length) {
      photos = media.map(({ large }) => large);
    }

    return { photos }; // the returned obj will be merged into the state
  }

  handleIndexClick = (e) => {
    this.setState({
      active: +e.target.dataset.index, // converting to number (with +) what's being fetched from the dom
    });
  };

  render() {
    const { photos, active } = this.state;
    return (
      <div className="carousel">
        <img src={photos[active]} alt="animal" />
        <div className="carousel-smaller">
          {photos.map((photo, i) => (
            // eslint-disable-next-line
            <img
              key={photo}
              onClick={this.handleIndexClick}
              data-index={i}
              src={photo}
              className={i === active ? "active" : ""}
              alt="animal thumbnail"
            />
          ))}
        </div>
      </div>
    );
  }
}

export default Carousel;

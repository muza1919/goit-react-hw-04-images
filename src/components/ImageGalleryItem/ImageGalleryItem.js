import { Component } from "react";
import { Modal } from "components/Modal/ModalWindow";
import PropTypes from 'prop-types';

export class GalleryItem extends Component {
  state = {
    isModalOpen: false,
  };

  toggleModal = () => {
    this.setState(prevState => ({
      isModalOpen: !prevState.isModalOpen,
    }));
  };

  render() {
    const {
      image: { webformatURL, largeImageURL, tags },
    } = this.props;
    return (
      <li className="ImageGalleryItem">
        <img className="ImageGalleryItem-image" onClick={this.toggleModal} src={webformatURL} alt={tags} />
        {this.state.isModalOpen && (
          <Modal
            largeImageURL={largeImageURL}
            tags={tags}
            toggleModal={this.toggleModal}
          />
        )}
      </li>
    );
  }
}


GalleryItem.propTypes = {
  image: PropTypes.shape({
    webformatURL: PropTypes.string.isRequired,
    tags: PropTypes.string
  }).isRequired
}
import { GalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import PropTypes from 'prop-types';

export const ImageGallery = ({ value }) => {
  return (
    <ul className="ImageGallery">
      {value.map(image => {
        return <GalleryItem key={image.id} image={image} />;
      })}
    </ul>
  );
};

ImageGallery.propTypes = {
  value: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    })
  ),
};

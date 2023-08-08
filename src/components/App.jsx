import { useState, useEffect } from 'react';
import { ImageGallery } from 'components/ImageGallery/GalleryList';
import { Searchbar } from 'components/Searchbar/Searchbar';
import { Toaster } from 'react-hot-toast';
import { getImages } from 'services/fetch';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Loader } from 'components/Loader/Loader';
import { Error } from 'components/RejectedError/RejectedError';
import { Button } from 'components/Button/LoadMoreButton';

export const App = () => {
  const [keyword, setKeyword] = useState('');
  const [page, setPage] = useState(1);
  const [images, setImages] = useState(null);
  const [status, setStatus] = useState('idle');
  const [isLoading, setIsLoading] = useState(false);
  const [moreImages, setMoreImages] = useState(false);

  const handleSubmit = keyword => {
    setKeyword(keyword);
    setPage(1);
    setStatus('idle');
  };

  const handleLoadMore = () => {
    setPage(prevState => prevState + 1);
  };

  useEffect(() => {
    if (keyword.trim() === '') {
      return;
    }

    async function handleFetch(keyword, page) {
      setIsLoading(true);
      try {
        const data = await getImages(keyword.trim(), page);
        if (data.hits.length === 0) {
          toast.error('No matches found!');
          setImages(null);
          setStatus('idle');
          return;
        }

        setMoreImages(data.hits.length === 12);

        const newImages = data.hits.map(
          ({ id, webformatURL, largeImageURL, tags }) => ({
            id,
            webformatURL,
            largeImageURL,
            tags,
          })
        );

        if (page === 1) {
          setImages([...newImages]);
          setStatus('resolved');
        } else {
          setImages(prevState => [...prevState, ...newImages]);
        }

        const totalPages = Math.ceil(data.totalHits / 12);
        if (page === totalPages && page > 1) {
          toast.done('You have reached the end of results');
          setMoreImages(false);
        }
      } catch (error) {
        setStatus('rejected');
      } finally {
        setIsLoading(false);
      }
    }
    handleFetch(keyword, page);
  }, [keyword, page]);

  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 2000,
        }}
      />
      <Searchbar onSearch={handleSubmit} />
      {isLoading && <Loader />}
      {status === 'resolved' && (
        <div className="ListWrap">
          <ImageGallery value={images} />
          {moreImages && (
            <Button
              onClick={handleLoadMore}
              disabled={isLoading}
              text={isLoading ? 'Loading...' : 'Load More'}
            />
          )}
          <ToastContainer autoClose={2000} />
        </div>
      )}
      {status === 'rejected' && <Error />}
    </>
  );
};
import { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';

import ImageGallery from 'components/ImageGallery';
import { apiService } from 'services/apiService';
import Button from 'components/Button';
import Searchbar from 'components/Searchbar';
import Modal from 'components/Modal';
import { Loader, ModalLoader } from 'components/Loader/Loader';

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [pictures, setPictures] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState('');
  const [imgTags, setImgTags] = useState('');
  const [isModalLoading, setIsModalLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [heightGallery, setHeightGallery] = useState(0);

  useEffect(() => {
    if (!searchQuery) {
      return;
    }
    setIsLoading(true);

    async function fetchPictures() {
      try {
        const pictures = await apiService(searchQuery, page);
        if (pictures.length !== 0) {
          setPictures(state => [...state, ...pictures]);
          setIsLoading(false);
        }
      } catch (error) {
        toast.error(error.message);
        setIsLoading(false);
      }
    }

    setTimeout(() => {
      fetchPictures();
    }, 500);

    const gallery = document.querySelector('#imageGallery');
    setHeightGallery(gallery.clientHeight);
  }, [page, searchQuery]);

  useEffect(() => {
    function scrollTo() {
      window.scrollTo({
        top: heightGallery,
        behavior: 'smooth',
      });
    }
    if (heightGallery !== 0) {
      scrollTo();
    }
  }, [heightGallery, pictures]);

  const onLoadMore = e => {
    e.preventDefault();
    setPage(state => state + 1);
  };

  const handleFormSubmit = searchQuery => {
    setSearchQuery(searchQuery);
    setPage(1);
    setPictures([]);
  };

  const handleImageClick = (largeImageURL, imgTags) => {
    setLargeImageURL(largeImageURL);
    setImgTags(imgTags);
    toggleModal();
    setIsModalLoading(true);
  };

  const toggleModal = () => {
    setShowModal(showModal => !showModal);
  };

  const hideLoaderInModal = () =>
    setTimeout(() => {
      setIsModalLoading(false);
    }, 350);

  return (
    <>
      <Searchbar onSubmit={handleFormSubmit} />
      {isLoading && <Loader />}
      <ImageGallery pictures={pictures} handleImageClick={handleImageClick} />
      {pictures.length > 0 && (
        <Button onClick={onLoadMore} aria-label="add contact">
          Load more
        </Button>
      )}

      <ToastContainer autoClose={3000} />
      {showModal && (
        <Modal onClose={toggleModal}>
          {isModalLoading && <ModalLoader />}
          <img src={largeImageURL} alt={imgTags} onLoad={hideLoaderInModal} />;
        </Modal>
      )}
    </>
  );
}

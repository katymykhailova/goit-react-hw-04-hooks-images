import { useState, useEffect, useRef } from 'react';
import { ToastContainer } from 'react-toastify';
import Searchbar from 'components/Searchbar';
import FetchPictures from 'components/FetchPictures';
import Modal from 'components/Modal';

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState('');
  const [imgTags, setImgTags] = useState('');
  const [heightGallery, setHeightGallery] = useState(0);

  let prevHeightGallery = useRef(0);

  useEffect(() => {
    if (prevHeightGallery.current !== 0) {
      scrollTo(prevHeightGallery.current);
    }
    prevHeightGallery.current = heightGallery;
  }, [heightGallery]);

  const handleFormSubmit = searchQuery => {
    setSearchQuery(searchQuery);
  };

  const handleImageClick = (largeImageURL, imgTags) => {
    setLargeImageURL(largeImageURL);
    setImgTags(imgTags);
    toggleModal();
  };

  const toggleModal = () => {
    setShowModal(showModal => !showModal);
  };

  const getHeightGallery = () => {
    const gallery = document.querySelector('#imageGallery');
    const heightGallery = gallery.clientHeight;
    setHeightGallery(heightGallery);
  };

  const scrollTo = heightGallery => {
    window.scrollTo({
      top: heightGallery,
      behavior: 'smooth',
    });
  };

  return (
    <>
      <Searchbar onSubmit={handleFormSubmit} />
      <FetchPictures
        searchQuery={searchQuery}
        handleImageClick={handleImageClick}
        getHeightGallery={getHeightGallery}
      />
      <ToastContainer autoClose={3000} />
      {showModal && (
        <Modal onClose={toggleModal}>
          <img src={largeImageURL} alt={imgTags} />
        </Modal>
      )}
    </>
  );
}

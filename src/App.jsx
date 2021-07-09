import { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import Searchbar from 'components/Searchbar';
import FetchPictures from 'components/FetchPictures';
import Modal from 'components/Modal';

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState('');
  const [imgTags, setImgTags] = useState('');
  const [page, setPage] = useState(1);
  const [pictures, setPictures] = useState([]);

  const handleFormSubmit = searchQuery => {
    setSearchQuery(searchQuery);
    setPage(1);
    setPictures([]);
  };

  const handleImageClick = (largeImageURL, imgTags) => {
    setLargeImageURL(largeImageURL);
    setImgTags(imgTags);
    toggleModal();
  };

  const toggleModal = () => {
    setShowModal(showModal => !showModal);
  };

  return (
    <>
      <Searchbar onSubmit={handleFormSubmit} />
      <FetchPictures
        searchQuery={searchQuery}
        handleImageClick={handleImageClick}
        page={page}
        pictures={pictures}
        setPage={setPage}
        setPictures={setPictures}
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

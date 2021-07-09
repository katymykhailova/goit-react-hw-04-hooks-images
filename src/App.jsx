import { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import Searchbar from 'components/Searchbar';
import FetchPictures from 'components/FetchPictures';
import Modal from 'components/Modal';
import { ModalLoader } from 'components/Loader/Loader';

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState('');
  const [imgTags, setImgTags] = useState('');
  const [page, setPage] = useState(1);
  const [pictures, setPictures] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleFormSubmit = searchQuery => {
    setSearchQuery(searchQuery);
    setPage(1);
    setPictures([]);
  };

  const handleImageClick = (largeImageURL, imgTags) => {
    setLargeImageURL(largeImageURL);
    setImgTags(imgTags);
    toggleModal();
    setIsLoading(true);
  };

  const toggleModal = () => {
    setShowModal(showModal => !showModal);
  };

  const hideLoaderInModal = () =>
    setTimeout(() => {
      setIsLoading(false);
    }, 350);

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
          {isLoading && <ModalLoader />}
          <img src={largeImageURL} alt={imgTags} onLoad={hideLoaderInModal} />;
        </Modal>
      )}
    </>
  );
}

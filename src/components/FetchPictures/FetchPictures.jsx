import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';

import ImageGallery from 'components/ImageGallery';
import apiService from 'services/apiService';
import Button from 'components/Button';
import Loader from 'components/Loader';

export default function FetchPictures({
  searchQuery,
  handleImageClick,
  page,
  pictures,
  setPage,
  setPictures,
}) {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [heightGallery, setHeightGallery] = useState(0);

  useEffect(() => {
    if (!searchQuery) {
      return;
    }
    async function fetchPictures() {
      try {
        const pictures = await apiService.ApiService(searchQuery, page);
        if (pictures.length !== 0) {
          setPictures(state => [...state, ...pictures]);
          setIsLoading(false);
        }
      } catch (error) {
        setError(error.message);
        setIsLoading(false);
      }
    }

    setTimeout(() => {
      fetchPictures();
    }, 500);

    const gallery = document.querySelector('#imageGallery');
    setHeightGallery(gallery.clientHeight);
  }, [page, searchQuery, setPictures]);

  useEffect(() => {
    toast.error(error);
  }, [error]);

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
    setIsLoading(true);
  };

  return (
    <>
      {isLoading && <Loader />}
      <ImageGallery pictures={pictures} handleImageClick={handleImageClick} />
      {pictures.length > 0 && (
        <Button onClick={onLoadMore} aria-label="add contact">
          Load more
        </Button>
      )}
    </>
  );
}

FetchPictures.propTypes = {
  searchQuery: PropTypes.string,
  handleImageClick: PropTypes.func,
  getHeightGallery: PropTypes.func,
};

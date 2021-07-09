import { Component } from 'react';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';

import ImageGallery from 'components/ImageGallery';
import apiService from 'services/apiService';
import Button from 'components/Button';
import Loader from 'components/Loader';

class FetchPictures extends Component {
  state = {
    pictures: [],
    error: null,
    page: 1,
    isLoading: false,
  };

  componentDidMount(prevProps, prevState) {
    this.props.getHeightGallery();
  }

  componentDidUpdate(prevProps, prevState) {
    const prevSearchQuery = prevProps.searchQuery;
    const nextSearchQuery = this.props.searchQuery;

    const prevPictures = prevState.pictures;
    const nextPictures = this.state.pictures;

    const prevError = prevState.error;
    const nextError = this.state.error;

    const prevPage = prevState.page;
    const nextPage = this.state.page;

    if (prevSearchQuery !== nextSearchQuery) {
      this.setState({
        pictures: [],
        page: 1,
        isLoading: true,
      });
      setTimeout(() => {
        this.fetchPictures();
      }, 500);
    }
    if (prevPage !== nextPage && nextPage !== 1) {
      setTimeout(() => {
        this.fetchPictures();
      }, 500);
    }

    if (nextPictures.length > prevPictures.length) {
      this.props.getHeightGallery();
    }
    if (prevError !== nextError) {
      toast.error(nextError);
    }
  }

  onLoadMore = e => {
    e.preventDefault();
    this.setState(prevState => ({
      page: prevState.page + 1,
      isLoading: true,
    }));
  };

  async fetchPictures() {
    const { searchQuery } = this.props;
    const { page } = this.state;
    try {
      const pictures = await apiService.ApiService(searchQuery, page);
      if (pictures.length !== 0) {
        this.setState(prevState => ({
          pictures: [...prevState.pictures, ...pictures],
          isLoading: false,
        }));
      }
    } catch (error) {
      this.setState({ error: error.message, isLoading: false });
    }
  }

  render() {
    const { pictures, isLoading } = this.state;
    const { handleImageClick } = this.props;

    return (
      <>
        {isLoading && <Loader />}
        <ImageGallery pictures={pictures} handleImageClick={handleImageClick} />
        {pictures.length > 0 && (
          <Button onClick={this.onLoadMore} aria-label="add contact">
            Load more
          </Button>
        )}
      </>
    );
  }
}

FetchPictures.propTypes = {
  searchQuery: PropTypes.string,
  handleImageClick: PropTypes.func,
  getHeightGallery: PropTypes.func,
};

export default FetchPictures;

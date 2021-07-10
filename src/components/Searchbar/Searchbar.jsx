import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import {
  Header,
  SearchForm,
  SearchFormInput,
  SearchFormButton,
  SearchFormButtonLabel,
} from './Searchbar.styled';

export default function Searchbar({ onSubmit }) {
  const handleSubmit = event => {
    event.preventDefault();

    const searchQuery = event.target.elements.searchQuery.value;
    if (searchQuery.trim() === '') {
      toast.error('Введите поисковый запрос.');
      return;
    }

    onSubmit(searchQuery);
  };

  return (
    <Header>
      <SearchForm onSubmit={handleSubmit}>
        <SearchFormButton type="submit">
          <SearchFormButtonLabel>Search</SearchFormButtonLabel>
        </SearchFormButton>

        <SearchFormInput
          type="text"
          name="searchQuery"
          autocomplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </SearchForm>
    </Header>
  );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func,
};

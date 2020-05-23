import { getCountries } from './services/api';
import searchResultsListItemsTemplate from './templates/searchresults-list-items.hbs';
import countryDescriptionTemplate from './templates/country-description.hbs';
import { pWarning, pNotice } from './utils/pnotify';
import { messages } from './utils/messages';
import { refs } from './utils/refs';

const debounce = require('lodash.debounce');

function searchFormSubmitHandler(event) {
  event.preventDefault();
  const form = event.target;
  const inputValue = form.value.toLowerCase();
  getCountries(inputValue)
    .then(countries =>
      countries.filter(country =>
        country.name.toLowerCase().includes(inputValue),
      ),
    )
    .then(result => {
      const resultArr = Array.from(result);
      if (resultArr.length === 0) {
        pWarning(messages.warningMissingMatches);
      } else if (inputValue.length === 0) {
        removeListItems();
      } else if (resultArr.length === 1) {
        removeListItems();
        insertCountryDescription(countryDescriptionTemplate(result[0]));
      } else if (resultArr.length > 1 && resultArr.length <= 10) {
        removeListItems();
        insertListItems(searchResultsListItemsTemplate(result));
      } else {
        removeListItems();
        pNotice(messages.warningTooManyMatches);
      }
    })
    .catch(err => console.log(err));
}
function insertListItems(items) {
  refs.searchResults.insertAdjacentHTML('beforeend', items);
}

function insertCountryDescription(item) {
  refs.foundContry.insertAdjacentHTML('afterbegin', item);
}

function removeListItems() {
  refs.searchResults.innerHTML = '';
  refs.foundContry.innerHTML = '';
}

refs.input.addEventListener('input', debounce(searchFormSubmitHandler, 500));

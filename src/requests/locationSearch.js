import Geocoder from 'react-native-geocoder';

import {setSearchResults} from '../actions';
import { store } from '../store';

export default function setLocationSearch(search) {
  let dispatch = {search: search, location: undefined};

  Geocoder.geocodeAddress(search + ' Berlin')
    .then(res => {
      if (res.length && res[0].adminArea === 'Berlin')
        dispatch.location = res[0].position;
      
      store.dispatch(setSearchResults(dispatch));
    })
    .catch(console.log);
}

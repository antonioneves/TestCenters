import {setTestCenters} from '../actions';

function getApiUrl(pageSize, pageNumber) {
    return `http://api.direkttesten.berlin/api/test-centers/?page[size]=${pageSize}&filter[is_active]=true&filter[is_published]=true&page[number]=${pageNumber}`;
}

export default async function getTestCenters(store, pageSize = 100) {
  let res = await fetch(
    getApiUrl(pageSize, 1),
  );
  let centers = await res.json();
  let testCenters = centers?.data ?? [];
  const pageNumber = centers?.meta?.pagination?.pages;

  try {
    for (let i = 2; i <= pageNumber; i++) {
      res = await fetch(
        getApiUrl(pageSize, i),
      );
      centers = await res.json();
      testCenters = [...testCenters, ...centers?.data];
    }
  } catch (e) {
    console.log(e);
  }

  store.dispatch(setTestCenters(testCenters));
}

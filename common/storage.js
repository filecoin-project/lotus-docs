export const isSupported = () => {
  try {
    // NOTE(jim)
    // Try to use basic methods of localStorage.
    localStorage.setItem('__localstorage_support_test__', '');
    localStorage.getItem('__localstorage_support_test__');
    localStorage.removeItem('__localstorage_support_test__');
  } catch (e) {
    // NOTE(jim)
    // If exception is thrown, then there is problem in local storage support.
    console.warn('LocalStorage Not supported for this browser.');
    return false;
  }

  // NOTE(jim)
  // local storage is suuported.
  return true;
};

export const setString = (key, value) => {
  localStorage.setItem(key, value);
};

export const setObject = (key, value) => {
  const json = JSON.stringify(value);
  this.setItem(key, json);
};

export const getString = key => {
  // NOTE(jim)
  // Check if the value for the key exists in the storage.
  if (
    localStorage.getItem(key) === undefined ||
    localStorage.getItem(key) === null
  ) {
    return null;
  }

  // NOTE(jim)
  // Get and return the value.
  const value = localStorage.getItem(key);
  return value;
};

export const getObject = key => {
  // NOTE(jim)
  // Check if the value for given key is null.
  if (this.getItem(key) === null) {
    return null;
  }

  // NOTE(jim)
  // Parse and return the JSON object.
  const value = this.getItem(key);
  return JSON.parse(value);
};

const removeByKey = key => {
  localStorage.removeItem(key);
};

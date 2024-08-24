import {$authHost, $host} from "./index";


export const createType = async (genre) => {
  const {data} = await $authHost.post('api/genre', genre)
  return data
}

export const fetchTypes = async () => {
  const {data} = await $host.get('api/genre')
  return data
}

export const createBrand = async (autor) => {
  const {data} = await $authHost.post('api/autor', autor)
  return data
}

export const fetchBrands = async () => {
  const {data} = await $host.get('api/autor', )
  return data
}

export const createDevice = async (book) => {
  const {data} = await $authHost.post('api/book', book)
  return data
}

export const fetchDevices = async () => {
  const {data} = await $host.get('api/book')
  return data
}

export const fetchOneDevice = async (id) => {
  const {data} = await $host.get('api/book/' + id)
  return data
}

// Новые функции
export const getBooksByReader = async (readerId) => {
  const { data } = await $host.get(`api/book/reader/${readerId}`);
  return data;
};

export const getBookByCipher = async (id) => {
  const {data} = await $host.get('api/book/' + id);
  return data;
};

export const getCipherByBookTitle = async (title) => {
  const { data } = await $host.get(`api/book/title/${title}`);
  return data;
};

export const getBookAssignmentDate = async (bookId, userId) => {
  const { data } = await $host.get(`api/book/date/${bookId}/${userId}`);
  return data;
};

export const getReadersWithOldBooks = async () => {
  const { data } = await $host.get('api/book/old-books');
  return data;
};

export const getReadersWithFewBooks = async () => {
  const { data } = await $host.get('api/book/few-books');
  return data;
};

export const getNumberOfReaders = async () => {
  const {data} = await $host.get('api/user/total');
  return data;
};

export const addNewReader = async (userData) => {
  const { data } = await $host.post('api/user/registration', userData);
  return data;
};



export const getBookByName = async (name) => {
  const { data } = await $host.get(`api/book/${name}`);
  return data;
};


export const deleteBookById = async (id) => {
  const { data } = await $host.delete(`api/book/${id}`);
  return data;
};

export const getBooks = async () => {
  const { data } = await $host.get('api/book');
  return data;
};
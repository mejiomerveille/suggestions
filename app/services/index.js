import axios from 'axios';
const host='127.0.0.1';
export const BASE_URL = `http://${host}:5000/api/`;

const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

axiosInstance.interceptors.request.use(function (config) {
  // Running on client. Attach token to header.
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
}, function (error) {
  return Promise.reject(error);
});

// user

export const register = async (data) => {
  try {
    const response = await axiosInstance.post(`user/create`, data);
    return response;
  } catch (error) {
    if (error.response && error.response.data && error.response.data.detail) {
      const erreur=error.response.data.detail;
      console.log(error.response.data.detail);
    } else {
      console.error(error);
    }
    return null;
  }
};

export const login = async (data) => {
  try {
    const response = await axiosInstance.post(`login`, data);
    console.log(response)
     // sauvegarder le token dans le localStorage
     localStorage.setItem('token', response.data.token)
     localStorage.setItem('user', response.data.data.id)
     // renvoyer a l'acceuil
    
    return response.data;
  } catch (error) {
    if (error.response && error.response.data && error.response.data.detail) {
      const erreur=error.response.data.detail;
      console.log(error.response.data.detail);
    } else {
      console.error(error);
    }
    return null;
  }
};

export async function getUsers() {
  try {
    const response = await axiosInstance.get('user');
    if (response.status === 200) {
      return response.data;
    } else {
      console.error('Erreur lors de la requête');
    }
  } catch (error) {
    console.error(error);
  }
  return null;
}

export const getuserByPk = async () => {
  try {
    const pk=localStorage.getItem('pk')
    const response = await axiosInstance.get(`user/${pk}`);
    console.log(response.data)
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const deleteUser = async (id) => {
  try {
    const response = await axiosInstance.delete(`user/${id}`);
    console.log(response)
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const updateUser = async (id,obj) => {
  try {
    const response = await axiosInstance.put(`user/update/${id}/`,obj);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};
// SuggestionS

export const createSuggestion = async (obj) => {
  try {
    const response = await axiosInstance.post(`suggestion/create`, obj);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export async function getSuggestions() {
  try {
    const response = await axiosInstance.get('suggestion');
    if (response.status === 200) {
      return response.data;
    } else {
      console.error('Erreur lors de la requête');
    }
  } catch (error) {
    console.error(error);
  }
  return null;
}


export const deleteSuggestion = async (id) => {
  try {
    const response = await axiosInstance.delete(`suggestion/${id}`);
    console.log(response)
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};



export const findSuggestionByPk = async () => {
  try {
    const id=localStorage.getItem('identifiant')
    const response = await axiosInstance.get(`suggestion/${id}`);
    console.log(response.data)
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const updateSuggestion = async (id,obj) => {
  try {
    const response = await axiosInstance.put(`suggestions/update/${id}/`,obj);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};


export async function getVotes() {
  try {
    const response = await axiosInstance.get('votes');
    if (response.status === 200) {
      return response.data;
    } else {
      console.error('Erreur lors de la requête');
    }
  } catch (error) {
    console.error(error);
  }
  return null;
}

export const createVote = async (obj) => {
  try {
    const response = await axiosInstance.post(`votes`, obj);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const logout = async (data) => {
  try {
    const response = await axiosInstance.post(`user/logout/`,data);
    localStorage.removeItem('refresh_token')
    localStorage.removeItem('access_token')
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const reset_password = async (data) => {
  try {
    const response = await axiosInstance.post(`user/password/reset/`,data);
    return response.data;
  } catch (error) {
    if (error.response && error.response.data && error.response.data.detail) {
      const erreur=error.response.data.detail;
      console.log(error.response.data.detail);
    } else {
      console.error(error);
    }
    return null;
  }
};
// password/change  otp/send    otp/verified   password/reset
export const verify_otp = async (data) => {
  try {
    const response = await axiosInstance.post(`user/otp/verified`,data);
    console.log(response);
    return response;
  } catch (error) {
    if (error.response && error.response.data && error.response.data.detail) {
      console.log(error.response.data.detail);
    } else {
      console.error(error);
    }
    return null;
  }
};

export const get_otp = async (data) => {
  try {
    const response = await axiosInstance.post(`user/otp/send`,data);
    localStorage.setItem('email',data.email)
    console.log(response);
    return response;
  } catch (error) {
    if (error.response && error.response.data && error.response.data.detail) {
      console.log(error.response.data.detail);
    } else {
      console.error(error);
    }
    return null;
  }
};




export const verifyLogin = async () => {
  try {
    const token = localStorage.getItem('access_token');
    const response = await axiosInstance.post('user/login/verify/', { token });
    // console.log(response);
    return response;
  } catch (error) {
    if (error.response && error.response.data && error.response.data.detail) {
      console.log(error.response.data.detail);
    } else {
      console.error(error);
    }
    return null;
  }
};

// verifyLogin();


export const changePassword = async (obj) => {
  try {
    const response = await axiosInstance.post(`user/password/change`, obj);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getUserInfo = async () => {
  try {
    const response = await axiosInstance.get(`user/get/`);
    localStorage.setItem('id', response.data.id)
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};
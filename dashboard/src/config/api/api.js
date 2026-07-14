import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true, 
  headers: {
    "Content-Type": "application/json",
    withCredentials: true,
  },
});
//ADMIN DATA
export const userData = async () => {
  try {
    const response = await api.get('/admin/getInfo', {
      withCredentials: true,
    });
    return response.data.data ;
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error;
  }
};

//ALL USER DATA BY ADMIN TO SHOW IN DASHBOARD ADMIN 
export const getAllUserByAdmin = async () => {
  try {
    const response = await api.get('/admin/getAllUser', {
      withCredentials: true,
    });
    return response.data.data ;
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error;
  }
};

export const getUserCount = async () => {
   try {
     const response = await api.get('/admin/userCount');
    return response.data.data.count ;
   } catch (error) {
    console.error('something error : ',error);
   }
}

export const getTaskCount = async () => {
   try {
     const response = await api.get('/admin/taskCount');
    return response.data.data.count ;
   } catch (error) {
    console.error('something error : ',error);
   }
}

export const getTaskCompletedCount = async () => {
   try {
     const response = await api.get('/admin/taskCompletedCount');
    return response.data.data.count ;
   } catch (error) {
    console.error('something error : ',error);
   }
}

export const getTaskPendingCount = async () => {
   try {
     const response = await api.get('/admin/taskPendingCount');
    return response.data.data.count ;
   } catch (error) {
    console.error('something error : ',error);
   }
}

//admin logout 

export const logoutUser = async () => {
  try {
    const response = await api.post("/user/logout");
    return response.data;
  } catch (error) {
    console.error("Error logging out user:", error);
    throw error;
  }
};
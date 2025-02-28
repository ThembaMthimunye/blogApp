import axios from "axios";
// import getImage
const URL = "http://localhost:8000";

/////////////////////////////////////////////////////////////////// Users Routes///////////////////////////////////////////////////////////////

export async function getusers() {
  const response = await axios.get(`${URL}/user`);
  if (response.status === 200) {
    return response.data;
  } else {
    return;
  }
}

export async function getuser(id) {
  const response = await axios.get(`${URL}/user/${id}`);
  if (response.status === 200) {
    return response.data;
  } else {
    return;
  }
}

export async function deleteuser(id) {
  const response = await axios.delete(`${URL}/user/${id}`);
  {
    return response;
  }
}

export async function createuser(user) {
  const response = await axios.post(`${URL}/user`, user);
  return response;
}

export async function updateuser(id, user) {
  const response = await axios.put(`${URL}/user/${id}`, user);
  return response;
}

/////////////////////////////////////////////////////////////////// Post Routes///////////////////////////////////////////////////////////////

export async function getPosts() {
  const response = await axios.get(`${URL}/post`);

  if (response.status === 200) {
    return response.data;
  } else {
    return;
  }
}

export async function getPost(id) {
  try {
    const response = await axios.get(`${URL}/post/${id}`);
    const post = response.data; 
    
    if (post && post.imageId) {
      const data = await getImage(post.imageId);  
      post.imageId = data;  
    }

    return post;
  } catch (error) {
    console.error("Error fetching post:", error);
    throw error;  
  }
}


export async function deletePost(id) {
  const response = await axios.delete(`${URL}/post/${id}`);
  {
    return response;
  }
}

export async function createPost(post) {
  const data=await createImage(post.file)
  const imageId=post.file.name
  post.imageId=imageId
  const response = await axios.post(`${URL}/posts`, post);
  return response;
}

export async function updatePost(id, post) {
  const response = await axios.put(`${URL}/post/${id}`, post);
  return response;
}

export async function login(user) {
  const response = await axios.post(`${URL}/user/login`, user);
  if (response.data.success) {
    console.log(response.data);
    return response.data.token;
  } else {
    alert("login failed");
  }
}

export async function createImage(file) {
  const formData = new FormData();
  // formData.append("image", file);
  formData.append("image", file)
  const response = await axios.post(`${URL}/images`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response;
}

export async function getImage(id) {
  const response = await axios.get(`${URL}/images/${id}`);
  return response;
}


export async function reaction(id, userId) {
  try {
      const response = await axios.post(
          `http://localhost:8000/api/posts/${id}/like`,
          { userId },
          { headers: { "Content-Type": "application/json" } }
      );
      return response.data;
  } catch (error) {
      console.error("Error in reaction:", error);
      throw error;
  }
}




export async function addComment(postId, userId, comment, token) {
  try {
    const response = await axios.post(
      `http://localhost:8000/api/posts/${postId}/comment`,
      { userId, comment }, // Send userId and comment in body
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`, // Token still required for verifyToken
        },
      }
    );
    return response.data; // { commentCount: number, comment: { userId, text, dateCreated } }
  } catch (error) {
    console.error("Error adding comment:", error.response?.data || error.message);
    throw error.response?.data || error;
  }
}
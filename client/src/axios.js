import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:5001', // ✅ Ensure this matches your backend
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // ✅ Allow cookies (if using authentication)
});

export default instance;

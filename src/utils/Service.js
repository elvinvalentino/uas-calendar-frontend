import axios from '../axios';

class Service {
  async fetchCategory(token) {
    const { data } = await axios.get(`/api/categories?token=${token}`);
    return data;
  }

  async fetchCategoryDetail(token, id) {
    const { data } = await axios.get(`/api/categories/${id}?token=${token}`);
    return data;
  }

  async addCategory(token, body) {
    const { data } = await axios.post(`/api/categories?token=${token}`, body);
    return data;
  }

  async updateCategory(token, id, body) {
    const { data } = await axios.put(
      `/api/categories/${id}?token=${token}`,
      body
    );
    return data;
  }

  async deleteCategory(token, id) {
    const { data } = await axios.delete(`/api/categories/${id}?token=${token}`);
    return data;
  }
  async fetchEvent(token) {
    const { data } = await axios.get(`/api/events?token=${token}`);
    return data;
  }

  async fetchEventDetail(token, id) {
    const { data } = await axios.get(`/api/events/${id}?token=${token}`);
    return data;
  }

  async addEvent(token, body) {
    const { data } = await axios.post(`/api/events?token=${token}`, body);
    return data;
  }

  async updateEvent(token, id, body) {
    const { data } = await axios.put(`/api/events/${id}?token=${token}`, body);
    return data;
  }

  async deleteEvent(token, id) {
    const { data } = await axios.delete(`/api/events/${id}?token=${token}`);
    return data;
  }
}

export default new Service();

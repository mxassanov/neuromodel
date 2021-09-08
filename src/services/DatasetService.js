import http from "../http-connect";

class DatasetService {
  getAll() {
    return http.get("/datasets");
  }

  get(id) {
    return http.get(`/datasets/${id}`);
  }

  create(data) {
    return http.post("/datasets", data);
  }

  update(id, data) {
    return http.put(`/datasets/${id}`, data);
  }

  delete(id) {
    return http.delete(`/datasets/${id}`);
  }
}

export default new DatasetService();
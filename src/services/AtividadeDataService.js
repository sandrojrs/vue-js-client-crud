import http from "../http-common";

class AtividadeDataService {

  getAll() {
    return http.get("/atividades");
  }

  get(id) {
    return http.get(`/atividades/${id}`);
  }

  create(data) {
    return http.post("/atividades", data);
  }

  update(id, data) {
    return http.put(`/atividades/${id}`, data);
  }

  delete(id) {
    return http.delete(`/atividades/${id}`);
  }

  deleteAll() {
    return http.delete(`/atividades`);
  }

  findByTitle(atividade) {
    return http.get(`/atividades?descricao=${atividade}`);
  }
}
export default new AtividadeDataService();
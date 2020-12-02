<template>
  <form>
    <div v-if="!submitted">
      <div class="alert alert-warning alert-dismissible fade show" style="background: purple; color: white" role="alert">
        Criação de atividade esportiva.
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="form-group">
        <label for="title">Evento</label>
        <input type="text" class="form-control" id="evento" required v-model="atividade.evento" name="evento" />
      </div>
      <div class="form-group">
        <label for="description">Descrição</label>
        <textarea class="form-control" id="descricao" required v-model="atividade.descricao" name="descricao" />
      </div>
      <div class="row">
        <div class="col">
          <label for="description">Data</label>
          <input class="form-control" type="date" id="data" required v-model="atividade.data" name="data" />
        </div>

        <div class="col">
          <label for="description">Inicio</label>
          <input type="time" class="form-control" id="inicio" required v-model="atividade.inicio" name="inicio" />
        </div>

        <div class="col">
          <label for="description">Fim</label>
          <input type="time" class="form-control" id="fim" required v-model="atividade.fim" name="fim" />
        </div>
      </div>
      <div class="form-row align-items-center mt-2">
        <div class="col-auto">
          <div class="form-check mb-2">
            <input class="form-check-input" type="checkbox" id="repete" required v-model="atividade.repete" name="repete" />
            <label class="form-check-label" for="autoSizingCheck"> Repetir </label>
          </div>
        </div>
        <div class="col-auto">
          <div class="form-check">
            <input type="range" class="form-control" id="semana" min="0" max="100" v-model="atividade.description" name="semana" />
          </div>
        </div>
      </div>
      <button @click="saveAtividade" class="btn btn-success float-right">Salvar</button>
    </div>

    <div v-else>
      <h4>You submitted successfully!</h4>
      <button class="btn btn-success" @click="newAtividade">Add</button>
    </div>
  </form>
</template>

<script>
import AtividadeDataService from "../services/AtividadeDataService";

export default {
  name: "add-atividade",
  data() {
    return {
      atividade: {
        id: null,
        evento: "",
        descricao: "",
        data: "",
        inicio: "",
        fim: "",
        repete: false,
        semana: "",
        events: [
          {
            start: "2018-11-19 10:35",
            end: "2018-11-19 11:30",
            title: "Doctor appointment",
            content: '<i class="v-icon material-icons">local_hospital</i>',
            class: "health",
          },
        ],
      },
      submitted: false,
    };
  },
  methods: {
    saveAtividade() {
      var data = {
        evento: this.atividade.evento,
        descricao: this.atividade.descricao,
        data: this.atividade.data,
        inicio: this.atividade.inicio,
        fim: this.atividade.fim,
        repete: this.atividade.repete,
        semana: this.atividade.semana,
      };

      AtividadeDataService.create(data)
        .then((response) => {
          this.atividade.id = response.data.id;
          console.log(response.data);
          this.submitted = true;
        })
        .catch((e) => {
          console.log(e);
        });
    },

    newAtividade() {
      this.submitted = false;
      this.atividade = {};
    },
  },
};
</script>

<style>
.submit-form {
  max-width: 300px;
  margin: auto;
}
</style>

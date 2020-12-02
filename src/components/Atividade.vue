<template>
  <div v-if="currentAtividade" class="edit-form">
    <h4>Atividade</h4>
    <form>
      <div class="form-group">
        <label for="title">Title</label>
        <input type="text" class="form-control" id="evento" v-model="currentAtividade.evento" />
      </div>
      <div class="form-group">
        <label for="description">Description</label>
        <input type="text" class="form-control" id="descricao" v-model="currentAtividade.descricao" />
      </div>
    </form>

    <button class="badge badge-primary mr-2" v-if="currentAtividade.published" @click="updatePublished(false)">UnPublish</button>
    <button v-else class="badge badge-primary mr-2" @click="updatePublished(true)">Publish</button>

    <button class="badge badge-danger mr-2" @click="deleteAtividade">Delete</button>

    <button type="submit" class="badge badge-success" @click="updateAtividade">Update</button>
    <p>{{ message }}</p>
  </div>

  <div v-else>
    <br />
    <p>Please click on a Atividade...</p>
  </div>
</template>

<script>
import AtividadeDataService from "../services/AtividadeDataService";

export default {
  name: "atividade",
  data() {
    return {
      currentAtividade: null,
      message: "",
    };
  },
  methods: {
    getAtividade(id) {
      AtividadeDataService.get(id)
        .then((response) => {
          this.currentAtividade = response.data;
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },

    updatePublished(status) {
      var data = {
        id: this.currentAtividade.id,
        title: this.currentAtividade.title,
        description: this.currentAtividade.description,
        published: status,
      };

      AtividadeDataService.update(this.currentAtividade.id, data)
        .then((response) => {
          this.currentAtividade.published = status;
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },

    updateAtividade() {
      AtividadeDataService.update(this.currentAtividade.id, this.currentAtividade)
        .then((response) => {
          console.log(response.data);
          this.message = "The tutorial was updated successfully!";
        })
        .catch((e) => {
          console.log(e);
        });
    },

    deleteAtividade() {
      AtividadeDataService.delete(this.currentAtividade.id)
        .then((response) => {
          console.log(response.data);
          this.$router.push({ name: "tutorials" });
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
  mounted() {
    this.message = "";
    this.getAtividade(this.$route.params.id);
  },
};
</script>

<style>
.edit-form {
  max-width: 300px;
  margin: auto;
}
</style>

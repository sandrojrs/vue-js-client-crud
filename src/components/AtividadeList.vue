<template>
  <div class="row">
    <div class="col-md-12">
      <vue-cal selected-date="2020-12-11" :time-from="9 * 60" :time-to="23 * 60" :disable-views="['years', 'year', 'month']" hide-weekends :events="events" class="vuecal--green-theme"> </vue-cal>
    </div>
  </div>
</template>

<script>
import AtividadeDataService from "../services/AtividadeDataService";
import VueCal from "vue-cal";
import "vue-cal/dist/vuecal.css";

var event = [];

export default {
  name: "atividades-list",
  components: { VueCal },
  data() {
    return {
      atividades: [],
      currentAtividade: null,
      currentIndex: -1,
      evento: "",
      events: event,
    };
  },

  methods: {
    retrieveAtividades() {
      AtividadeDataService.getAll()
        .then((response) => {
          this.atividades = response.data;
          event = this.atividades.map(function (item) {
            return {
              start: item.data + " " + item.inicio,
              end: item.data + " " + item.fim,
              title: item.descricao,
            };
          });
        })
        .catch((e) => {
          console.log(e);
        });
    },

    refreshList() {
      this.retrieveAtividades();
      this.currentAtividade = null;
      this.currentIndex = -1;
    },

    setActiveAtividade(atividade, index) {
      this.currentAtividade = atividade;
      this.currentIndex = index;
    },

    removeAllAtividades() {
      AtividadeDataService.deleteAll()
        .then((response) => {
          console.log(response.data);
          this.refreshList();
        })
        .catch((e) => {
          console.log(e);
        });
    },

    searchTitle() {
      AtividadeDataService.findByTitle(this.evento)
        .then((response) => {
          this.atividades = response.data;
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
  mounted() {
    this.retrieveAtividades();
  },
};
</script>

<style>
.list {
  text-align: left;
  max-width: 750px;
  margin: auto;
}
</style>

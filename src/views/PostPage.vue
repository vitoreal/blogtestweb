<template>
  <base-layout>
  <h1 class="mt-4">POST</h1>
   <router-link to="/postAddPage" class="btn btn-danger btn-sm">Cadastrar</router-link><br /><br />
    <div
      class="dataTable-wrapper dataTable-loading no-footer sortable searchable fixed-columns"
    >

      <div class="dataTable-container">
        <table id="datatablesSimple" class="dataTable-table">
          <thead>
            <tr>
              <th data-sortable="" style="width: 30%">
                <a href="#" class="dataTable-sorter">Título</a>
              </th>
              <th data-sortable="" style="width: 27%">
                <a href="#" class="dataTable-sorter">Descrição</a>
              </th>
              <th data-sortable="" style="width: 27%">
                <a href="#" class="dataTable-sorter">Foto</a>
              </th>
              <th data-sortable="" style="width: 10%">
                <a href="#" class="dataTable-sorter">Ação</a>
              </th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="item in dadosPaginados" :key="item.id">
              <td>{{ item.titulo }}</td>
              <td>{{ item.descricao }}</td>
              <td><img src="data:image/jpeg;base64, {{ item.foto }}"></td>
              <td>
                
                 <button class="btn btn-danger btn-sm" v-on:click="deletar(item.id)">Deletar</button>
                
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </base-layout>
</template>

<script>
//import myPaginatorMixin from "../../public/js/paginator";

export default {
  //mixins: [myPaginatorMixin],
  data() {
    return {
      dadosPaginados: [],
    }
    
  },
  methods: {
    getData() {

      //const dataToken = JSON.parse(localStorage.getItem('user'));
      
      /*
      if ( (dataToken.headers.token == 'undefined' || dataToken.headers.token == undefined)) {
        this.$router.push('/')
      }
      */
     
     const editedText = localStorage.getItem('token').replace('"', '').slice(0, -1)
    const AUTH_TOKEN = "Bearer "+ editedText;
    this.axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

      var formUrl = 'http://localhost:8080/api/post/listarTodos';

      this.getAjaxPagina('GET', formUrl, "", this.axios);
    },
    deletar(idItem) {

      var data = {
            id: idItem,
        }

        const editedText = localStorage.getItem('token').replace('"', '').slice(0, -1)
    const AUTH_TOKEN = "Bearer "+ editedText;
    this.axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

      if (confirm("Tem certeza?")) {
        var formUrl = "http://localhost:8080/api/post/excluir";

        this.axios({
          method: 'POST',
          url: formUrl,
          credential: true,
          data: data,
        })
          .then(response => {
            alert("Post excluido com sucesso!")
            this.$router.push('/post')
            this.getData();
            console.log(response)
          
          }).catch (error => {
            
            alert("Não foi possível excluir o cadastro!")
            console.log(error);
          });
      }
    },
    getAjaxPagina(method, formUrl, formParam, axios) {
     
      axios({
        method: method,
        url: formUrl,
        credential: true,
        data: formParam,
      })
        .then((response) => {
          this.dadosPaginados = response.data;
          console.log(response);
        })
        .catch((error) => {
          this.$router.push('/')
          console.log(error);
        });
    },
  },
  mounted() {
    this.getData();
  }
};

</script>

<template>
  <base-layout>
  <h1 class="mt-4">Cadastrar POST</h1>
  
  <div class="row">
    <form @submit.prevent="submit" ref="formSubmit" method="post">
      <div class="row mb-3">
          <div class="col-md-6">
              <div class="mb-3 mb-md-0">
                  <label for="inputFirstName">Titulo</label>
                  <input class="form-control" type="text"  v-model="state.titulo" />
              </div>
              <div class="error" v-if="v$.titulo.$error">{{ v$.titulo.$errors[0].$message }}</div>
          </div>
      </div>
      <div class="row mb-3">
          <div class="col-md-6">
              <div class="mb-3 mb-md-0">
                  <label for="inputFirstName">Descrição</label>
                  <textarea class="form-control" rows="5" v-model="state.descricao"></textarea>
              </div>
              <div class="error" v-if="v$.descricao.$error">{{ v$.descricao.$errors[0].$message }}</div>
          </div>
      </div>
      <div class="row mb-3">
          <div class="col-md-6">
              <div class="mb-3 mb-md-0">
                  <label for="inputFirstName">Arquivo</label>
                  <input class="form-control" type="file" @change="imageFileChanged($event)" accept="image/png, image/jpeg" />
              </div>
              <div class="error" v-if="v$.arquivo.$error">{{ v$.arquivo.$errors[0].$message }}</div>
          </div>
      </div>
      <div class="mt-4 mb-0">
          <button type="button" @click="submitForm"  class="btn btn-primary btn-sm" style="margin-right: 10px;">Salvar</button>
          &nbsp;
          <router-link to="/post" class="btn btn-danger btn-sm">Voltar</router-link><br /><br />
      </div>
  </form>
    </div>
  </base-layout>
</template>

<script>
import useVuelidate from "@vuelidate/core";
import { required, helpers } from "@vuelidate/validators";
import { reactive, computed } from "vue";

import jwt_decode from 'jwt-decode';

export default {
 name: "postPage",
  setup() {
    const state = reactive({
      titulo: "",
      descricao: "",
      arquivo: [],
    })

   // const router = 
    const rules = computed(() => {
      return { 
        titulo: { 
          required: helpers.withMessage("Campo título é obrigatório!", required)
        },
        descricao: { 
          required: helpers.withMessage("Campo descrição é obrigatório!", required)
        },
        arquivo: { 
          required: helpers.withMessage("Campo arquivo é obrigatório!", required)
        },
      };
    })

    const v$ = useVuelidate(rules, state);

    return { state, v$, }
      
  },
   validations() {
    return {
      titulo: { 
        required
      },
      descricao: { 
        required
      },
      arquivo: { 
        required
      },
    };
  },
  methods: {
    submitForm() {
      
      console.log(this.$v)

      this.v$.$validate();

      if(!this.v$.$error){
        
        

        const formData = new FormData();
        formData.append('titulo', this.state.titulo);
        formData.append('descricao', this.state.descricao);
       
        const byteFile = this.readFile(this.state.arquivo)
    alert(byteFile)
       formData.append('arquivo', byteFile);

       var data = {
            titulo: this.state.titulo,
            descricao: this.state.descricao,
            foto: byteFile
        }

        const editedText = localStorage.getItem('token').replace('"', '').slice(0, -1)
        const AUTH_TOKEN = "Bearer "+ editedText;
        this.axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
        this.axios.defaults.headers.common['Content-Type'] = 'aplication/json'; 
        
        var formUrl = 'http://localhost:8080/api/post/salvar';

        this.getAjaxPagina('POST', formUrl, data, this.axios);

      } else {
        alert('Error')
      }

      console.log("ok");
    },
    readFile(file) {

      //var fileName = file.name || ''

      this.getBase64(file).then(res => {
        // console.log(res);
 
        //Binary array conversion
        var bytes = window.atob(res.split(',')[1]);        //Remove url And convert to byte

        //Handling exceptions,take ascii Convert code less than 0 to greater than 0
        var ab = new ArrayBuffer(bytes.length);
        var ia = new Uint8Array(ab);
        for (var i = 0; i < bytes.length; i++) {
          ia[i] = bytes.charCodeAt(i);
        }
        
        console.log("ia", ia)
        return  ia;
      });
    },
    isTokenExpired(expiry) {

      //const dataToken = JSON.parse(localStorage.getItem('user'));
     // var decoded = jwt_decode(dataToken.data);

      //const expiry = (JSON.parse(atob(token.split('.')[1]))).exp;
      return (Math.floor((new Date).getTime() / 1000)) >= expiry;
    },
    imageFileChanged(event) {
      var files = event.target.files || event.dataTransfer.files;
      if (!files.length) {
        return;
      }
      this.state.arquivo = files[0];
      const byteFile = this.readFile(this.state.arquivo)
    alert(byteFile)
    },
    getAjaxPagina(method, formUrl, formParam, axios) {
     
      axios({
        method: method,
        url: formUrl,
        credential: true,
        data: formParam,
      })
        .then(response => {
          alert("Post cadastrado com sucesso!")
          console.log(response)
         
        }).catch (error => {
          
          alert("Não foi possível efetuar o cadastro!")
           console.log(error);
        });
    },
  }, 
  mounted() {

    const dataToken = JSON.parse(localStorage.getItem('user'));
    var decoded = jwt_decode(dataToken.data);

    if(this.isTokenExpired(decoded.exp)){
      this.$router.push('/')
    } 

    console.log(decoded);

  }
};

</script>

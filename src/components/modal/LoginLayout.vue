<template>
  <vue-final-modal
    v-model="showModalLogin"
    classes="modal-container"
    content-class="modal-content modalDimensao bg-light"
  >
    <span class="modal__title text-white">Área do usuário</span>
    <div class="modal__content">
      <div class="modal_espaco">
        
        <form @submit.prevent="logar" ref="formLogar" method="post" action="login">
          <input type="hidden" name="errorLogin" id="errorLogin" value="{{ flagErroLogin }}" />
          
          <div class="row" style="display: none;">
            <div class="alert alert-danger">Mensagem de erro</div>
          </div>
          
          <div class="row mb-3">
              <label class="col-sm-2 col-form-label">E-mail:</label>
              <div class="col-sm-10">
                <input class="form-control" v-model.trim="state.email" />
              </div>
             <div class="error" v-if="v$.email.$error">{{ v$.email.$errors[0].$message }}</div>
          </div>
          <div class="row mb-3">
            <label class="col-sm-2 col-form-label">Senha:</label>
            <div class="col-sm-10">
              <input v-model.trim="state.password" class="form-control" />
            </div>
            <div v-for="(error, index) of v$.password.$errors" :key="index">
              <div class="error">{{ error.$message }}</div>
            </div>
            
          </div>

        </form>
      </div>
      <div class="modal__action">
      <button type="button" @click="submitFormLogar"  class="btn btn-primary" style="margin-right: 10px;">Entrar</button>
      <button type="button" @click="showModalLogin = false" class="btn btn-primary">Fechar</button>
    </div>
    </div>
    
  </vue-final-modal>
</template>

<script>
import useVuelidate from "@vuelidate/core";
import { required, minLength, email, helpers } from "@vuelidate/validators";
import { reactive, computed } from "vue";

export default {
  expose: ["show"],
  name: "loginMoldalLayout",
  props: ["errorLogin"],
  setup() {
    const state = reactive({
      email: "",
      password: "",
    })

    const rules = computed(() => {
      return { 
        password: {
            required: helpers.withMessage("Campo senha é obrigatório!", required),
            minLength: helpers.withMessage(
               ({ $params }) =>"Insira uma senha com mais de "+$params.min+" dígitos!", minLength(6)),
        },
        email: { 
          required: helpers.withMessage("Campo email é obrigatório!", required),
          email 
        },
      };
    })

    const v$ = useVuelidate(rules, state);

    return { state, v$, }
      
  },
  data() {
    return {
      showModalLogin: false,
    }
  },
  validations() {
    return {
      password: {
        required,
        minLength: minLength(6),
      },
      email: { 
        required,
        email 
      },
    };
  },
  methods: {
    show() {
      // some code...
      this.showModalLogin = true;
    },
    confirm() {
      // some code...
      this.showModalLogin = false;
    },
    cancel(close) {
      // some code...
      close();
    },
   submitFormLogar() {
      
      console.log(this.$v)

      this.v$.$validate();

      if(!this.v$.$error){
          alert('ok')
      } else {
        alert('Error')
      }
      //this.$refs.formLogar.submit();

      /*axios.defaults.headers.common['X-AUTH-TOKEN'] = document.querySelector("input[name=_csrf_token]").value
			axios({
			  method: 'post',
			  url: '/login',
			  data: {
			    email: this.email,
				password: this.password,
				_csrf_token: document.querySelector("input[name=_csrf_token]").value
			  }, 
			  headers: {
			      'Content-Type': 'application/x-www-form-urlencoded'
			  }
			})
			.then(response => {
			  console.log(response);
			}).catch (error => {
			  console.log(error);
			});*/

      console.log("ok");
    },
    mounted() {
      this.isLoading = false;
    },
    created() {},
  },
};
</script>
<style scoped>
::v-deep .modalDimensao {
  width: 500px !important;
}
</style>


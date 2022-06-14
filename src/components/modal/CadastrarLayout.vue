<template>
  <vue-final-modal
    v-model="showModalCadastro"
    classes="modal-container"
    content-class="modal-content modalDimensao bg-light"
  >
    <button class="modal__close" @click="showModalCadastro = false"></button>
    <span class="modal__title">Cadastrar</span>
    <div class="modal__content">
      
        <form class="form-right" @submit.prevent="register">

          <div class="row">
            <div class="mb-3 form-group">
              <label class="form__label">Nome:</label>
              <input v-model.trim="v$.nome" class="form__input input-field" />
            </div>
            <div class="error">Campo nome é obrigatório!</div>
          </div>
          <div class="row">
            <div class="mb-3 form-group">
              <label class="form__label">E-mail:</label>
              <input class="form__input input-field" v-model.trim="v$.email" />
            </div>
            <div class="error">Campo email é obrigatório!</div>
          </div>
          <div class="row">
            <div class="col-sm-6 mb-3 form-group">
              <label class="form__label">Senha</label>
              <input
                v-model.trim="v$.password"
                class="form__input input-field"
              />
            </div>
            <div class="col-sm-6 mb-3 form-group">
              <label class="form__label">Repita</label>
              <input
                v-model.trim="v$.repeatPassword"
                class="form__input input-field"
              />
            </div>
            <div class="error">Campo senha é obrigatório!.</div>
            <div class="error">O camppo não pode ter menos que letras.</div>
            <div class="error">Senhas diferentes.</div>
          </div>
          <div class="row">
            <div class="mb-3 form-group">
              <label class="option">
                Eu concordo com <a href="#">Termos e Condições</a>
                <input
                  type="checkbox"
                  v-model.trim="v$.agree"
                  class="form__input input-field"
                />
                <span class="checkmark"></span>
              </label>
            </div>
            <div class="error">Campo Termos e Condições é obrigatório!.</div>
          </div>
          <div class="form-field">
            <button class="register" type="submit">Registrar!</button>
          </div>
        </form>
      </div>
    
    <div class="modal__action">
      <button type="submit" class="btn btn-primary" style="margin-right: 10px;">
        Cadastrar
      </button>
      <button @click="showModalCadastro = false" class="btn btn-primary">Fechar</button>
    </div>
  </vue-final-modal>
</template>

<script>
import useVuelidate from "@vuelidate/core";
import { required, minLength, email } from "@vuelidate/validators";

export default {
  expose: ["show"],
  name: "cadastrarModalLayout",
  setup() {
    return { v$: useVuelidate() };
  },
  data() {
    return {
		showModalCadastro: false,
		nome: "",
		email: "",
		password: "",
		agree: "",
		repeatPassword: "",
		submitStatus: null,
    }
  },
  methods: {
    show() {
      // some code...
      this.showModalCadastro = true;
    },
    confirm() {
      // some code...
      this.showModalCadastro = false;
    },
    cancel(close) {
      // some code...
      close();
    },
    register() {
      /*console.log('submit!')
	      this.v$.$touch()
	      if (this.v$.$invalid) {
	        this.submitStatus = 'ERROR'
	      } else {
	        // do your submit logic here
	        this.submitStatus = 'PENDING'
	        setTimeout(() => {
	          this.submitStatus = 'OK'
	        }, 500)
	      }
			console.log(this.submitStatus);*/
    },
  },
  validations() {
    return {
      nome: {
        required,
      },
      email: {
        required,
        email,
      },
      password: {
        required,
        minLength: minLength(6),
      },
      agree: {
        required,
      },
      repeatPassword: {
        required,
      },
    };
  },
  mounted() {
    this.isLoading = false;
  },
  created() {},
};
</script>

<style scoped>
::v-deep .modalDimensao {
  width: 700px !important;
}
</style>

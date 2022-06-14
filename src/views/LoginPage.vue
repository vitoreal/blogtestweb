<template>
  <div id="layoutAuthentication">
            <div id="layoutAuthentication_content">
                <main>
                    <div class="container">
                        <div class="row justify-content-center">
                            <div class="col-lg-5">
                                <div class="card shadow-lg border-0 rounded-lg mt-5">
                                    <div class="card-header"><h3 class="text-center font-weight-light my-4">Login</h3></div>
                                    <div class="card-body">
                                      <form @submit.prevent="logar" ref="formLogar" method="post" action="login">
                                        <input type="hidden" name="errorLogin" id="errorLogin" value="{{ flagErroLogin }}" />
                                        
                                        <div class="row" style="display: none;">
                                          <div class="alert alert-danger">Mensagem de erro</div>
                                        </div>
                                        
                                        <div class="row mb-3">
                                            <label class="col-sm-2 col-form-label">Login:</label>
                                            <div class="col-sm-10">
                                              <input class="form-control" v-model="state.login" />
                                            </div>
                                          <div class="error" v-if="v$.login.$error">{{ v$.login.$errors[0].$message }}</div>
                                        </div>
                                        <div class="row mb-3">
                                          <label class="col-sm-2 col-form-label">Senha:</label>
                                          <div class="col-sm-10">
                                            <input v-model="state.password" type="password" class="form-control" />
                                          </div>
                                          <div v-for="(error, index) of v$.password.$errors" :key="index">
                                            <div class="error">{{ error.$message }}</div>
                                          </div>
                                          
                                        </div>

                                        <button type="button" @click="submitFormLogar"  class="btn btn-primary" style="margin-right: 10px;">Entrar</button>

                                      </form>
                                        
                                    </div>
                                    <div class="card-footer text-center py-3">
                                        <div class="small"><a href="#">Ainda não tem uma conta? Registrar!</a></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
            
        </div>
</template>

<script>
import useVuelidate from "@vuelidate/core";
import { required, minLength, helpers } from "@vuelidate/validators";
import { reactive, computed } from "vue";

export default {
  name: "loginPage",
  props: ["errorLogin"],
  setup() {
    const state = reactive({
      login: "",
      password: "",
    })

   // const router = 
    const rules = computed(() => {
      return { 
        password: {
            required: helpers.withMessage("Campo senha é obrigatório!", required),
            minLength: helpers.withMessage(
               ({ $params }) =>"Insira uma senha com mais de "+$params.min+" dígitos!", minLength(6)),
        },
        login: { 
          required: helpers.withMessage("Campo login é obrigatório!", required)
        },
      };
    })

    const v$ = useVuelidate(rules, state);

    return { state, v$, }
      
  },
  data() {
    return {
      //showModalLogin: false,
    }
  },
  validations() {
    return {
      password: {
        required,
        minLength: minLength(6),
      },
      login: { 
        required
      },
    };
  },
  methods: {
    
   submitFormLogar() {
      
      console.log(this.$v)

      this.v$.$validate();

      if(!this.v$.$error){
          
        var data = {
            login: this.state.login,
            password: this.state.password
        }
      
        // JSON.stringify(data)

        this.axios({
          method: 'post',
          url: 'http://localhost:8080/login',
          credential: true,
          data: data
        })
        .then(response => {

          localStorage.setItem('user', JSON.stringify(response));
          localStorage.setItem('token', JSON.stringify(response.data));

          this.$router.push('/post')
          console.log(response.status);
        }).catch (error => {
          
          alert("Login ou senha inválido!")
           console.log(error);
        });

      } else {
        alert('Error')
      }

      console.log("ok");
    },
    logout() {
      // remove user from local storage to log user out
      localStorage.removeItem('user');
    },
    mounted() {
      this.isLoading = false;
    },
    created() {},
  },
};
</script>

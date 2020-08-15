<template>
  <background>
    <div class="login">
      <div class="top">
        <div><h1>Login</h1></div>
        <div>
          <router-link to="/register">
            Deseja se cadastrar?
          </router-link>
        </div>
      </div>
      <div v-if="errors.length > 0" class="error">
        <div v-for="(error, index) in errors" v-bind:key="index">
          - {{ error }}
        </div>
      </div>
      <form method="post" @submit="checkForm">
        <label
          class="label"
          for="email"
        >
          Email
        </label>
        <input
          class="input"
          type="email"
          name="email"
          id="email"
          placeholder="exemplo@email.com"
          v-model="email"
        >
        
        <label
          class="label"
          for="password"
        >
          Senha
        </label>
        <input
          class="input"
          type="password"
          name="password"
          id="password"
          placeholder="xxxxxx"
          v-model="password"
        >
        
        <button
          class="btn"
          type="submit"
        >
          Login
        </button>
      </form>
    </div>
  </background>
</template>

<script>
import authAPI from '../api/auth';
import background from '../components/Background';

export default {
  name: 'Login',
  components: {
    background
  },
  data() {
    return {
      email: '',
      password: '',
      errors: []
    }
  },
  methods: {
    checkForm(event) {
      event.preventDefault();
      this.errors = [];
      this.login();
    },
    login() {
      const { email, password } = this;
      const body = { email, password };
      authAPI.login(body)
        .then(async (response) => {
          if (response.status == 200) {
            localStorage.token = await response.data.token;
            this.$router.push({ name: 'Home' });
          } else if (response.status == 400) {
            this.errors.push('E-mail ou senha está incorreto');
          }
        });
    }
  }
}
</script>

<style lang="scss" scoped>
.login {
  .top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
    h1 {
      margin: 0;
      font-weight: normal;
    }
  }
  .error {
    text-align: center;
    margin-bottom: 0.7rem;
    padding: 0.5rem 0;
    background: #ffe3e6;
    border-radius: 5px;
    border-style: solid;
    border-width: 1px;
    border-color: rgba(158, 28, 35, 0.2);
  }
  form {
    .label {
      margin-left: 0.25rem;
    }
    .input {
      width: 17.65rem;
      height: 2.5rem;
      margin-top: 0.2rem;
      margin-bottom: 1rem;
      border-style: solid;
      border-width: 1px;
      border-radius: 5px;
      padding: 0 0.5rem;
      @media only screen and (max-width: 600px) {
        width: 14.6rem;
      }
    }
    .btn {
      width: 100%;
      height: 2.5rem;
      margin-top: 1rem;
      border: none;
      border-radius: 5px;
      background: #2c68b1;
      color: white;
      font-weight: bold;
      font-size: 1rem;
      box-shadow: 0 2px 2px rgba(0, 0, 0, 0.25);
    }
  }
}
</style>

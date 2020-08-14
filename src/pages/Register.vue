<template>
  <background>
    <div class="register">
      <div class="top">
        <div><h1>Registro</h1></div>
        <div>
          <router-link to="/login">
            Deseja fazer login?
          </router-link>
        </div>
      </div>
      <form method="post">
        <label
          class="label"
          for="password"
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

        <label
          class="label"
          for="password"
        >
          Confirmar senha
        </label>
        <input
          class="input"
          type="password"
          name="confirm-password"
          id="confirm-password"
          placeholder="xxxxxx"
          v-model="confirmPassword"
        >
        
        <button
          class="btn"
          type="submit"
          v-on:click="this.register"
        >
          Registrar
        </button>
      </form>
    </div>
  </background>
</template>

<script>
import userAPI from '../api/user';
import background from '../components/Background';

export default {
  name: 'Register',
  components: {
    background
  },
  data() {
    return {
      email: '',
      password: '',
      confirmPassword: ''
    }
  },
  methods: {
    register(event) {
      event.preventDefault();
      const { email, password } = this;
      const body = { email, password };
      userAPI.createUser(body)
        .then(async (response) => {
          localStorage.token = await response.data.token;
          console.log('token:', response.data.token);
          this.$router.push({ name: 'Home' });
        });
    }
  }
}
</script>

<style lang="scss" scoped>
.register {
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

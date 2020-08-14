<template>
  <div class="register">
    <div class="center-div">
      <div class="image">
        
      </div>
      <h1>Registro</h1>
      <form method="post">
        <label for="email">Email:</label>
        <input
          class="input"
          type="email"
          name="email"
          id="email"
          placeholder="exemplo@email.com"
          v-model="email"
        >
        
        <label for="password">Senha:</label>
        <input
          class="input"
          type="password"
          name="password"
          id="password"
          v-model="password"
        >

        <label for="password">Confirmar senha:</label>
        <input
          class="input"
          type="password"
          name="confirm-password"
          id="confirm-password"
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
  </div>
</template>

<script>
import userAPI from '../api/user';

export default {
  name: 'Register',
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
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background: grey;
  font-size: 0.95rem;
  .center-div {
    background: white;
    width: 20rem;
    border-radius: 5px;
    padding: 0.6rem;
    @media only screen and (max-width: 600px) {
      width: 17rem;
    }
    .image {
      height: 5rem;
    }
    h1 {
      margin-top: 0;
      margin-bottom: 1rem;
    }
    form {
      .input {
        width: 93.5%;
        margin-bottom: 1rem;
      }
      .btn {
        width: 100%;
        margin-top: 1rem;
      }
    }
  }
}
</style>

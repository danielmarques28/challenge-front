<template>
  <div class="login">
    <div class="center-div">
      <div class="image">
        
      </div>
      <h1>Login</h1>
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
        
        <button
          class="btn"
          type="submit"
          v-on:click="this.login"
        >
          Login
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import authAPI from '../api/auth';

export default {
  name: 'Login',
  data() {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    login(event) {
      event.preventDefault();
      const { email, password } = this;
      const body = { email, password };
      authAPI.login(body)
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
.login {
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

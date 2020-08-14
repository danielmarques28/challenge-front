<template>
  <div class="background">
    <div class="center-div">
      <div class="image">
        <img
          src="https://i.redd.it/iw7g13qmktx11.png"
          alt="photo"
        >
      </div>
      <div class="body">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Background'
}
</script>

<style lang="scss" scoped>
.background {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background: #f6f8fa;
  font-size: 0.95rem;
  .center-div {
    background: white;
    width: 20rem;
    border-radius: 5px;
    overflow: hidden;
    box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
    @media only screen and (max-width: 600px) {
      width: 17rem;
    }
    .image {
      width: 100%;
      height: 9rem;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .body {
      padding: 0.6rem;
    }
  }
}
</style>

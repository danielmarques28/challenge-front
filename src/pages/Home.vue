<template>
  <div class="home">
    <div class="center-div">
      <input
        type="file"
        name="file"
        id="file"
        @change="upload"
      >
      <!-- <button v-on:click="this.upload">
        Upload
      </button> -->
      <div
        v-for="(file, index) in files"
        v-bind:key="index"
      >
        arquivo: {{ file.name }}
        <button v-on:click="download(file.id, file.name)">
          Download
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import fileAPI from '../api/file';

export default {
  name: 'Home',
  data() {
    return {
      files: [],
      uploadFile: {}
    }
  },
  mounted() {
    this.getAllFiles();
  },
  methods: {
    getAllFiles() {
      fileAPI.listUserFiles()
      .then((response) => {
        this.files = response.data;
      });
    },
    upload(e) {
      const files = e.target.files || e.dataTransfer.files;
      if (!files.length)
        return;
      let formData = new FormData();
      fileAPI.uploadFile(formData)
        .then(() => {
          this.getAllFiles();
        });
    },
    download(fileId, fileName) {
      fileAPI.downloadFile(fileId)
        .then((response) => {
          const fileURL = window.URL.createObjectURL(new Blob([response.data]));
          const fileLink = document.createElement('a');
          fileLink.href = fileURL;
          fileLink.setAttribute('download', fileName);
          document.body.appendChild(fileLink);
          fileLink.click();
        });
    }
  }
}
</script>

<style lang="scss" scoped>
.home {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background: grey;
  .center-div {
    width: 65vw;
    min-height: 85vh;
    overflow-y: auto;
    border-radius: 5px;
    padding: 0.5rem;
    background: white;
  }
}
</style>

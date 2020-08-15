<template>
  <div class="home">
    <div class="center-div">
      <label for="search" class="label">
        Upload de arquivo
      </label>
      <input
        type="file"
        name="file"
        id="file"
        class="input-file"
        @change="upload"
      />

      <div class="search-div">
        <label for="search" class="label">
          Pesquisa
        </label>
        <input
          type="text"
          name="search"
          id="search"
          placeholder="Nº do ID ou nome do arquivo"
          class="input"
          v-model="search"
        />
      </div>

      <div v-if="files.length === 0" class="empty-msg">
        <h1>Não há arquivos salvos.</h1>
      </div>

      <div
        v-for="(file, index) in filteredFiles"
        v-bind:key="index"
      >
        <div class="file">
          {{ file.id }} - {{ file.name }}
          <div class="buttons">
            <button
              v-on:click="download(file.id, file.name)"
              class="btn"
            >
              Download
            </button>
            <button
              v-on:click="deleteFile(file.id)"
              class="btn btn-red"
            >
              Excluir
            </button>
          </div>
        </div>
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
      search: ''
    }
  },
  mounted() {
    this.getAllFiles();
  },
  computed: {
    filteredFiles() {
      if (!this.search) {
        return this.files;
      } else {
        const id = Number(this.search);
        if(!isNaN(id)) {
          return this.files.filter((file) => {
            return file.id === id;
          });
        } else {
          let re = new RegExp(this.search);
          return this.files.filter((file) => {
            return re.test(file.name.toLowerCase());
          });
        }
      }
    }
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
      formData.append('file', files[0]);
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
    },
    deleteFile(fileId) {
      fileAPI.deleteFile(fileId)
        .then(() => {
          this.getAllFiles();
        });
    }
  }
}
</script>

<style lang="scss" scoped>
.home {
  display: flex;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  background: #f6f8fa;
  overflow-y: auto;
  .center-div {
    width: 22rem;
    margin: 2rem 0;
    @media only screen and (max-width: 600px) {
      width: 17.5rem;
    }
    .label {
      margin-left: 0.25rem;
    }
    .input-file {
      width: 100%;
      margin-top: 0.2rem;
      margin-bottom: 1rem;
      border: none;
      border-radius: 5px;
      background: #2c68b1;
      color: white;
      font-weight: bold;
      font-size: 1rem;
      box-shadow: 0 2px 2px rgba(0, 0, 0, 0.25);
    }
    .search-div {
      .input {
        width: 20.9rem;
        height: 2.5rem;
        margin-top: 0.2rem;
        margin-bottom: 1rem;
        border-style: solid;
        border-width: 1px;
        border-radius: 5px;
        padding: 0 0.5rem;
        @media only screen and (max-width: 600px) {
          width: 16.5rem;
        }
      }
    }
    .empty-msg {
      text-align: center;
      h1 {
        font-weight: normal;
      }
    }
    .file {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0.6rem;
      margin-bottom: 0.6rem;
      box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
      border-radius: 5px;
      background: white;
      overflow: hidden;
      .buttons {
        .btn {
          height: 2.5rem;
          margin: 0 0.1rem;
          border: none;
          border-radius: 5px;
          background: #2c68b1;
          color: white;
          font-weight: bold;
          font-size: 14px;
          cursor: pointer;
          &-red {
            background: white;
            border-style: solid;
            border-width: 1px;
            color: #cb2431;
            border-color: rgba(27,31,35,.15);
          }
        }
      }
    }
  }
}
</style>

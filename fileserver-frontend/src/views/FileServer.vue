<template>
  <div>
    <h3>Files</h3>
    <p v-for="(obj, index) in files" :key="(index + 1) * Math.random()">
      {{ obj.name }}
    </p>
    <div>
      <progress :value="progress" max="100"></progress>
    </div>
    <button @click="getAllFiles">GETALL FILES</button>
    <ul v-for="(file, index) in results" :key="(index + 1) * Math.random()">
      <li @click="fetchFile({ filename: file.filename, id: file._id })">
        {{ file.filename }}
        {{ file._id }}
      </li>
    </ul>
    <h2>Multiple files</h2>
    <form method="post" enctype="multipart/form-data">
      <input type="file" multiple @change="handleUpload" name="avatar" />
      <input @click="postFile" type="submit" value="Submit" />
    </form>

    <p v-for="(obj, index) in uploadFiles" :key="(index + 1) * Math.random()">
      -------- {{ obj.file }} --------
      {{ obj }}
      {{ uploadFiles }}
    </p>
  </div>
</template>

<script>
const URI = "http://localhost:3001";
// const URI = "http://localhost:4000";
export default {
  data() {
    return {
      files: [],
      inputFile: {},
      uploadFiles: {},
      results: [],
      progress: 0
    };
  },
  methods: {
    handleUpload(e) {
      console.log(this.files);
      Object.values(e.target.files).map(d => this.files.push(d));
    },

    uploadFile(file) {
      const formData = new FormData();
      formData.append("uploadedFile", file, file.name);
      fetch(`${URI}/postFile`, {
        method: "POST",
        body: formData
      })
        .then(function(response) {
          console.log("RESPONSE", response);
          const reader = response.body.getReader();
          return new ReadableStream({
            start(controller) {
              return pump();
              function pump() {
                return reader.read().then(({ done, value }) => {
                  console.log("Value: ", value);
                  // When no more data needs to be consumed, close the stream
                  if (done) {
                    controller.close();
                    return;
                  }
                  // Enqueue the next data chunk into our target stream
                  controller.enqueue(value);
                  return pump();
                });
              }
            }
          });
        })
        .then(stream => new Response(stream))
        .then(response => response.blob())
        .then(blob => URL.createObjectURL(blob))
        .catch(err => console.error(err));
      //   if (response.ok) {
      //     console.log("Click was recorded");
      //     return;
      //   }
      //   throw new Error("Request failed.");
      // })
      // .catch(function(error) {
      //   console.log(error);
      // });
    },

    postFile(e) {
      e.preventDefault();
      this.files.map(file => {
        this.uploadFile(file);
      });
      this.files = [];
    },

    async fetchFile({ filename, id }) {
      const fileMetaPath = `${URI}/getFileMeta?id=${id}`;
      const fileMetaData = await fetch(fileMetaPath, {
        method: "GET"
      }).then(async function(response) {
        const metaData = await response.json();
        return metaData;
      });

      const filePath = `${URI}/getFile?id=${id}`;
      const url = await fetch(filePath, {
        method: "GET"
      })
        .then(response => {
          const reader = response.body.getReader();
          return new ReadableStream({
            start: controller => {
              const pump = () => {
                return reader.read().then(({ done, value }) => {
                  // When no more data needs to be consumed, close the stream
                  // console.log("Progress: ", value.byteLength, this.progress);
                  if (done) {
                    controller.close();
                    return;
                  }
                  this.progress =
                    this.progress +
                    (value.byteLength / fileMetaData[0].length) * 100;
                  // Enqueue the next data chunk into our target stream
                  controller.enqueue(value);
                  return pump();
                });
              };
              return pump();
            }
          });
        })
        .then(stream => new Response(stream))
        .then(response => response.blob())
        .then(blob => URL.createObjectURL(blob))
        .catch(err => console.error(err));
      var a = document.createElement("a");
      a.href = url;
      a.download = `${filename}`;
      document.body.appendChild(a); // we need to append the element to the dom -> otherwise it will not work in firefox
      a.click();
      a.remove(); //afterwards we remove the element again
      this.progress = 0;
    },

    async getAllFiles() {
      const resp = await fetch(`${URI}/listFiles`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      });
      const data = await resp.json();
      this.results = data;
    }
  }
};
</script>

import Vue from 'vue';
import vue2Dropzone from 'vue2-dropzone';
import $ from "jquery";



const imageUploaderComponent = Vue.component('image-uploader', {
    props: ['item', 'template'],
    data() {
        return {
            loading: false,
            dropzoneOptions: {
                parallelUploads: 1,
                maxFiles: 1,
                url: 'https://httpbin.org/post',
                thumbnailWidth: 150,
                maxFilesize: 0.5,
                headers: { "My-Awesome-Header": "header value" },
                dictDefaultMessage: '<span class="dz-icon"><i class="fas fa-upload"></i></span>'
            }
        }
    },
    components: {
        vueDropzone: vue2Dropzone
    },
    methods: {
        fileDropped(file){
            this.loading = true;
            this.item.src = '';
        },
        fileAdded(file, response) {
            let image = file.dataURL.split(',')[1];
            let self = this;
            $.ajax({
                'url': (config.fromFrontend + 'image-uploader/index.php'),
                'type': 'POST',
                'data': JSON.stringify({image: image}),
                'headers': {
                    'Accept': 'application/json'
                }
            }).done(function(response){
                self.fileAddedByBackend(response, file);
            });
        },
        fileAddedByBackend(src, file) {
            let ratio = file.width / file.height;
            this.item.src = src;
            this.item.height = this.item.width / ratio;
            this.loading = false;
            this.empty();
            this.updateTemplate();
        },
        empty() {
            this.$refs.dropzone.removeAllFiles();
        },
        updateTemplate() {
            this.$store.dispatch('templates/update', this.template.toBackend());
        }
    },
    template: `
        <div class="image-uploader"> 
            <vue-dropzone 
                id="x"
                ref="dropzone" 
                :options="dropzoneOptions"
                v-on:vdropzone-file-added="fileDropped"
                v-on:vdropzone-success="fileAdded"></vue-dropzone>
            <div 
                v-if="loading"
                class="image-uploader__loader"> 
                <i class="fas fa-spinner fa-spin"></i>
            </div>
        </div>
    `
});

export {imageUploaderComponent}
import Vue from 'vue';
import vue2Dropzone from 'vue2-dropzone';
import $ from "jquery";



const imageUploaderComponent = Vue.component('image-uploader', {
    props: ['item'],
    data() {
        return {
            dropzoneOptions: {
                parallelUploads: 1,
                maxFiles: 1,
                url: 'https://httpbin.org/post',
                thumbnailWidth: 150,
                maxFilesize: 0.5,
                headers: { "My-Awesome-Header": "header value" },
                dictDefaultMessage: '<span class="dz-icon"><i class="far fa-image"></i></span>'
            }
        }
    },
    components: {
        vueDropzone: vue2Dropzone
    },
    methods: {
        fileAdded(file, response) {
            let image = file.dataURL.split(',')[1];
            let item = this.item;
            $.ajax({
                'url': (config.fromFrontend + 'image-uploader/index.php'),
                'type': 'POST',
                'data': JSON.stringify({image: image}),
                'headers': {
                    'Accept': 'application/json'
                }
            }).done(function(response){
                item.src = response;
            });
        }
    },
    template: `
        <vue-dropzone 
            id="x"
            ref="myVueDropz one" 
            :options="dropzoneOptions"
            v-on:vdropzone-success="fileAdded"></vue-dropzone>
    `
});

export {imageUploaderComponent}
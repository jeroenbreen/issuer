<script>
    import vueDropzone from 'vue2-dropzone';
    import $ from "jquery";

    export default {
        name: 'image-uploader',
        components: {
            vueDropzone
        },
        props: ['item', 'template'],
        data() {
            // todo remove double posting
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
        methods: {
            fileDropped(file){
                this.loading = true;
                this.item.src = '';
            },
            fileAdded(file, response) {
                let image = file.dataURL.split(',')[1];
                let self = this;
                $.ajax({
                    'url': (config.library + 'image-uploader.php'),
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
        }
    }
</script>


<template>
    <div class="image-uploader">
        <vue-dropzone
                id="x"
                ref="dropzone"
                @vdropzone-file-added="fileDropped"
                @vdropzone-success="fileAdded"
                :options="dropzoneOptions"></vue-dropzone>
        <div
            v-if="loading"
            class="image-uploader__loader">
            <i class="fas fa-spinner fa-spin"></i>
        </div>
    </div>
</template>


<style lang="scss">
    @import '@styles/variables.scss';


    .image-uploader {
        background: pink;

        .image-uploader__loader {
            position: absolute;
            width: 50px;
            height: 50px;
            background: #000;
            color: #fff;
            display: flex;
            align-items: center;
            justify-content: space-around;
            font-size: 20px;
            z-index: 1;
        }

        .dropzone {
            z-index: 0;
            position: absolute;
            left: 0;
            top: 0;
            border: 0;
            transition: all 0.1s ease;
            min-height: 0;
            width: 50px;
            height: 50px;
            background: $editing-mode-color;
            padding: 0;

            &:hover {
                background: #000;
            }

            .dz-preview {
                margin: 0;
                min-height: 0;
                width: 100%;
                display: none;

                .dz-image {

                    img {
                        width: 100%;
                    }
                }

                .dz-details {
                    display: none;
                }
            }

            .dz-message {
                display: flex;
                align-items: center;
                justify-content: space-around;
                margin: 0;
                height: 100%;

                .dz-icon {
                    color: #fff;
                    font-size: 18px;
                }
            }
        }
    }
</style>
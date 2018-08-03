const config = {
    backend: 'http://localhost:3000/',
    framework: 'vue'
};

// this is used as a module by webpack.config,
// but used regular by index.html
try {
    module.exports = config;
}
catch(err) {}

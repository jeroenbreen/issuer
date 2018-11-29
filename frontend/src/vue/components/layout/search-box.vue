<script>
    export default {
        name: 'search-box',
        props: ['searchData']

    }
</script>


<template>
    <div class="search-box">
        <md-field>
            <md-input v-model="searchData.value" :placeholder="searchData.label"/>
        </md-field>
        <div class="search-box__icon">
            <i class="fas fa-search"></i>
        </div>
    </div>
</template>


<style lang="scss">
    .search-box {
        max-width: 400px;
        position: relative;

        .search-box__icon {
            position: absolute;
            right: 0;
            bottom: 0;
            height: 42px;
            color: #aaa;
            width: 42px;
            display: flex;
            align-items: center;
            justify-content: space-around;
            font-size: 18px;
        }
    }
</style>
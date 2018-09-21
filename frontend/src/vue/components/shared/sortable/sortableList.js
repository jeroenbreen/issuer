import Vue from 'vue';
import { ContainerMixin } from 'vue-slicksort';


const SortableList = Vue.component('SortableList', {
    mixins: [ContainerMixin],
    template: `
        <ul class="list">
          <slot />
        </ul>
      `
});

export {SortableList}


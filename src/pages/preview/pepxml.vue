<template>
    <q-dialog v-model="boolPepxmlModel" persistent :maximized="true" transition-show="slide-left"
        transition-hide="slide-down">
        <q-card class="bg-white text-dark">
            <q-bar>
                {{ pepxmlName }}
                <q-space />
                <q-btn dense flat icon="close" v-close-popup>
                    <q-tooltip class="bg-white text-primary">Close</q-tooltip>
                </q-btn>
            </q-bar>
        </q-card>
    </q-dialog>
</template>

<script setup>
import { ref } from 'vue';

let boolPepxmlModel = ref(false);

const props = defineProps({
  pepxmlName: String
});

defineExpose({
    boolPepxmlModel,
});
</script>
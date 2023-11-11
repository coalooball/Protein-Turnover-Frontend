<template>
    <div class="q-gutter-md">
        <q-card>
            <div>
                <div class="q-pa-md">
                    <q-table card-class="bg-grey-3 text-brown" title="Queued Samples" :rows="queued_sample_rows" :columns="columns"
                        row-key="name" />
                </div>
            </div>
            <q-card-section>
                <div class="row">
                    <div class="col-2">
                        <q-checkbox size="xs" v-model="compare_multiple_check" label="compare multiple" />
                    </div>
                    <div class="col-1">
                        <q-btn color="white" text-color="black" label="compare" no-caps />
                    </div>
                </div>
            </q-card-section>
        </q-card>
        <q-card>
            <div class="q-pa-md">
                <q-table card-class="bg-grey-3 text-brown" title="Calculated Samples" :rows="calculated_sample_rows" :columns="columns"
                    row-key="name" />
            </div>
        </q-card>
    </div>
</template>

<script setup>
import { ref } from 'vue'

const columns = ['job name', 'peptide file', 'mz tol', 'rt tol', 'max enrich.'].map((element, index) => ({
    name: index.toString(),
    required: true,
    label: element,
    align: 'left',
    field: index.toString(),
    sortable: true,
}));

let queued_sample_rows = [['test', 'D:/IL/test/new_interact.pep.xml', 10, 15, 0.95]];
let calculated_sample_rows = [['test2', 'D:/IL/test/new_interact.pep.xml', 10, 15, 0.95]];

let compare_multiple_check = ref(false)

</script>
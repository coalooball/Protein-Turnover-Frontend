<template>
    <div>
        <q-card>
            <q-card-section>
                <div class="row">
                    <div class="col-6">
                        <q-input v-model="job_name" label="job name" placeholder="Please enter the task name"
                            :dense="dense" />
                    </div>
                </div>
                <div class="row q-gutter-xs">
                    <div class="col-3">
                        <q-card flat bordered>
                            <q-expansion-item v-model="peptide_list_expanded" dense dense-toggle expand-separator
                                label="Peptide List">
                                <q-card-section>
                                    <q-input v-model="peptide_list_path" label="Peptide dir"
                                        placeholder="Input the Directory of the pep.xml file" :dense="dense" />
                                    <q-select v-model="peptide_list_select" :options="peptide_list_options"
                                        label="Choose one pep.xml file" />
                                </q-card-section>
                            </q-expansion-item>
                        </q-card>
                    </div>
                    <div class="col-3">
                        <q-card flat bordered>
                            <q-expansion-item v-model="spectrum_files_expanded" dense dense-toggle expand-separator
                                label="Spectrum Files">
                                <q-card-section>
                                    <q-input v-model="specturm_files_path" label="Spectrum dir"
                                        placeholder="Input the Directory of .mzML files" :dense="dense" />
                                    <q-select v-model="specturm_files_select" :options="specturm_files_options"
                                        label="Choose one .mzML files" />
                                </q-card-section>
                            </q-expansion-item>
                        </q-card>
                    </div>
                </div>
                <div class="row q-gutter-xs">
                    <div class="col-3">
                        <q-input v-model.number="num_retention_time_tol" type="number"
                            label="retention time tolerance (sec)" :dense="dense" />
                    </div>
                    <div class="col-3">
                        <q-input v-model.number="num_mz_tolerance" type="number" label="m/z tolerance (ppm)"
                            :dense="dense" />
                    </div>
                </div>
                <div class="row q-gutter-xs">
                    <div class="col-3">
                        <q-select v-model="option_labelled_element" :options="Object.keys(LABELLED_ELEMENT_DIC)"
                            label="labelled element" />
                    </div>
                    <div class="col-3">
                        <q-select v-model="option_isotope_number" label="isotope Number"
                            :options="LABELLED_ELEMENT_DIC[option_labelled_element]" />
                    </div>
                </div>
                <div class="row q-gutter-xs">
                    <div class="col-3">
                        <!-- https://stackoverflow.com/questions/61747570/allow-only-number-with-up-to-one-decimal-place-in-quasar-input -->
                        <q-input v-model.number="max_label_enrichment" step="0.01" type="number"
                            label="max label enrichment" :dense="dense" />
                    </div>
                </div>
                <div class="row q-gutter-xs">
                    <div class="col-3">
                        <q-select v-model="option_retention_time_correction" label="retention time correction"
                            :options="['SimpleMedian', 'UseInSample']" />
                    </div>
                </div>
                <div class="row q-gutter-xs">
                    <div class="col-3">
                        <q-checkbox v-model="email_when_done" label="Email when done" />
                    </div>
                    <div v-if="email_when_done" class="col-3">
                        <q-input v-model="creator_email" label="email username" :dense="dense" />
                    </div>
                </div>
                <div class="row q-gutter-xs">
                    <div class="col-6">
                        <q-btn outline color="dark" label="start job" no-caps/>
                    </div>
                </div>
            </q-card-section>
        </q-card>
    </div>
</template>

<script setup>
import { ref, watch } from 'vue';

let job_name = ref('');
let dense = ref(false);
let peptide_list_expanded = ref(true);
let spectrum_files_expanded = ref(true);
let peptide_list_path = ref("");
let specturm_files_path = ref("");
let peptide_list_select = ref("");
let peptide_list_options = ref([]);
let specturm_files_select = ref("");
let specturm_files_options = ref([]);
let num_retention_time_tol = ref(15);
let num_mz_tolerance = ref(10);
const LABELLED_ELEMENT_DIC = {
    'C': [12, 13],
    'H': [1, 2],
    'O': [16, 17, 18],
    'N': [14, 15],
    'P': [31],
    'S': [32, 33, 34, 36]
};
let option_labelled_element = ref(Object.keys(LABELLED_ELEMENT_DIC)[0]);
let option_isotope_number = ref(LABELLED_ELEMENT_DIC[option_labelled_element.value][0]);
watch(option_labelled_element, (newValue) => {
    option_isotope_number.value = LABELLED_ELEMENT_DIC[newValue][0];
});
let max_label_enrichment = ref(0.95);
let option_retention_time_correction = ref('SimpleMedian');
let email_when_done = ref(false);
let creator_email = ref('');

</script>
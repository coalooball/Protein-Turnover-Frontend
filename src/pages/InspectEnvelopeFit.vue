<template>
    <q-card>
        <div class="row">
            <div class="col-8">
                <q-checkbox v-model="only_show_proteins_with_included_peptides"
                    label="only show proteins with included peptides" />
                <q-card-section>
                    <q-table card-class="bg-grey-3 text-dark" title="protein groups" :rows="protein_groups_rows"
                        :columns="protein_groups_columns" row-key="name" />
                </q-card-section>
            </div>
            <div class="col-4">
                <q-checkbox v-model="only_show_included_peptides" label="only show included peptides" />
                <q-card-section>
                    <q-card class="bg-grey-3 text-dark">
                        <q-tabs v-model="inspect_envelope_fit_tab" dense align="left" class="bg-dark text-white shadow-2"
                            :breakpoint="0">
                            <q-tab name="General" label="General" no-caps />
                            <q-tab name="Enrichment" label="Enrichment" no-caps />
                        </q-tabs>
                        <q-separator />
                        <q-tab-panels v-model="inspect_envelope_fit_tab" animated>
                            <q-tab-panel name="General">
                                <q-input v-model.number="mimimum_peptide_probability" step="0.1" type="number"
                                    label="minimum peptide probability" :dense="true" />
                                <q-input v-model.number="heavy_fit_correlation_r_squared" step="0.1" type="number"
                                    label="Heavy fit correlation: min. R-squared" :dense="true" />
                                <q-input v-model.number="heavy_fit_correlation_cor" step="0.1" type="number"
                                    label="Heavy fit correlation: min. cor" :dense="true" />
                                <div class="text-h6">Isotope space peak number</div>
                                <q-input v-model.number="nr_of_peaks" step="any" type="number" label="min. nr of peaks"
                                    :dense="true" />
                                <q-input v-model.number="with_r_squared_above" step="0.1" type="number"
                                    label="with R-squared above" :dense="true" />
                                <q-input v-model.number="ratio_of_mono_peak" step="any" type="number"
                                    label="min. ratio of mono / -1 peak" :dense="true" />
                            </q-tab-panel>
                            <q-tab-panel name="Enrichment">
                                <q-input v-model.number="enrichment_standard_deviations_to_keep" step="any" type="number"
                                    label="enrichment +- standard deviations to keep" :dense="true" />
                            </q-tab-panel>
                        </q-tab-panels>
                    </q-card>
                </q-card-section>
            </div>
        </div>
    </q-card>
</template>

<script setup>
import { ref, watch } from 'vue';

let only_show_proteins_with_included_peptides = ref(false);
let only_show_included_peptides = ref(false);
const protein_groups_columns = ['protein names', 'annotation'].map((element, index) => ({
    name: index.toString(),
    required: true,
    label: element,
    align: 'left',
    field: index.toString(),
    sortable: true,
}));
let protein_groups_rows = ref([]);
let inspect_envelope_fit_tab = ref('General')
watch(inspect_envelope_fit_tab, (newValue) => {
    console.log(newValue);
});
let mimimum_peptide_probability = ref(0.8);
let heavy_fit_correlation_r_squared = ref(0.6);
let heavy_fit_correlation_cor = ref(0.5);
let nr_of_peaks = ref(5);
let with_r_squared_above = ref(0.6);
let ratio_of_mono_peak = ref(5);
let enrichment_standard_deviations_to_keep = ref(2);


</script>
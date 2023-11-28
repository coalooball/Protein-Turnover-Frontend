<template>
    <q-card>
        <div v-if="!boolCheckClickhouseConnection">
            <q-card-section>
                <div class="row">
                    <div class="col-2">
                        <q-spinner-audio color="primary" size="2em" />
                        <q-tooltip :offset="[0, 8]">Clickhouse Connecting</q-tooltip>
                    </div>
                </div>
            </q-card-section>
        </div>
        <div v-else>
            <q-card-section>
                <div class="row">
                    <div class="col-6">
                        <q-input v-model="job_name" label="File Directory" placeholder="Please enter the dir"
                            :dense="dense" />
                    </div>
                </div>
            </q-card-section>
        </div>
    </q-card>
</template>

<script setup>
import { ref, onMounted } from "vue";

let boolCheckClickhouseConnection = ref(false)

function fnBoolCheckClickhouseConnection() {
    fetch("/api/bool_check_clickhouse_connection")
        .then((response) => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        }).then((data) => {
            boolCheckClickhouseConnection.value = data;
            console.log(`get_clickhouse_connection_info: ${boolCheckClickhouseConnection.value}`);
        }).catch((error) => {
            console.error(
                "There was a problem with the fetch operation:",
                error
            );
        });
}

onMounted(() => {
    fnBoolCheckClickhouseConnection();
});

</script>
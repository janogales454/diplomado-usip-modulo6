<template>
    <form @submit.prevent="submit($event)" novalidate>
        <div class="container mt-4">
            <!-- Nombre -->
            <input v-model="item.nombre" type="text" class="form-control" placeholder="Nombre"/>
            <div class="invalid-feedback">Nombre es obligatorio</div>
            <!-- Descripcion -->
            <textarea v-model="item.descripcion" class="form-control" rows="3" placeholder="Descripcion"></textarea>
            <div class="invalid-feedback">Descripcion es obligatoria</div>
            <!-- Precio -->
            <input v-model="item.precio" type="number" class="form-control" step="0.01" min="0" pattern="^\d*\.\d{2}$" placeholder="Precio"/>
            <div class="invalid-feedback">Descripcion es obligatoria</div>
            <hr/>
            <!-- Tipo -->
            <label class="form-label">Tipo de Helado *</label>
            <select v-model="item.tipoId" class="form-select" required>
                <option v-for="(value, index) in tiposLst" :key="index" :value="value.id">{{ value.nombre }}</option>
            </select>
            <div class="invalid-feedback">Tipo de Helado es obligatorio</div>
            <!-- Acciones -->
            <button type="submit" class="btn btn-primary">Guardar Tipo</button>
        </div>
    </form>
</template>


<script>
import { getTipos } from '@/services/apiClient';

export default {
    name: 'HeladosNew',
    data() {
        return {
            title: 'Nuevo Tipo de Helado',
            item: {
                "tipoId": 1,
                "nombre": "",
                "descripcion": "",
                "precio": 0.00
            },
            tiposLst: []
        }
    },
    mounted() {
        this.extraerTipos();
    },
    methods: {
        submit(event) {
            const form = event.target;
            if (!form.checkValidity()) {
                form.classList.add('was-validated');
                return;
            }
            this.$emit('created', this.item);
        },
        extraerTipos() {
            getTipos("")
                .then((response) => {
                    this.tiposLst = response.data;
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    },
}
</script>

<style>
</style>
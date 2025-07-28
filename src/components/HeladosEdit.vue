<template>
    <form @submit.prevent="submit($event)" novalidate>
        <div class="container mt-4">
            <!-- Nombre -->
            <input v-model="selectedItem.nombre" type="text" class="form-control" placeholder="Nombre" />
            <div class="invalid-feedback">El valor es requerido.</div>
            <!-- Descripcion -->
            <textarea v-model="selectedItem.descripcion" class="form-control" rows="3" placeholder="Descripcion"></textarea>
            <div class="invalid-feedback">Descripcion es obligatoria</div>
            <!-- Precio -->
            <input v-model="selectedItem.precio" type="number" class="form-control" min="0" step="0.01" pattern="^\d*\.\d{2}$" placeholder="Precio"/>
            <div class="invalid-feedback">Descripcion es obligatoria</div>
            <hr/>
            <!-- Tipo -->
            <label class="form-label">Tipo de Helado *</label>
            <select v-model="selectedItem.tipoId" class="form-select" required>
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
    name: 'HeladosEdit',
    data() {
        return {
            title: 'Editar Tipo de Helado',
            selectedItem: { ...this.item },
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
            this.$emit('updated', this.selectedItem);
        },
        extraerTipos() {
            getTipos("")
                .then((response) => {
                    this.tiposLst = response.data;
                })
                .catch((error) => {
                    console.error(error);
                });
        },
    },
    computed: {
    },
    props: {
        item: {
            type: Object,
            required: true
        }
    },
}
</script>

<style>
    form input{
        margin-bottom: 10px;
    }
</style>
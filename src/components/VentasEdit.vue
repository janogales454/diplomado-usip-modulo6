<template>
    <form @submit.prevent="submit($event)" novalidate>
        <div class="container mt-4">
            <input v-model="selectedItem.codigo" type="text" class="form-control" placeholder="Codigo" disabled/>
            <div class="invalid-feedback">El valor es requerido.</div>
            <!-- Nombre -->
            <input v-model="selectedItem.nombre" type="text" class="form-control" placeholder="Nombre" />
            <div class="invalid-feedback">El valor es requerido.</div>
            <!-- NIT -->
            <input v-model="selectedItem.nit" type="text" class="form-control" placeholder="NIT" />
            <div class="invalid-feedback">NIT es obligatoria</div>
            <!-- Precio -->
            <input v-model="selectedItem.fecha" type="date" class="form-control" placeholder="Fecha" />
            <div class="invalid-feedback">Fecha es obligatoria</div>
            <hr/>
            <!-- Tipo -->
            <label class="form-label">Helado</label>
            <select v-model="selectedItem.heladoId" class="form-select" @change="calcularPrecio" required>
                <option v-for="(value, index) in itemsLst" :key="index" :value="value.id">{{ value.nombre }}</option>
            </select>
            <label class="form-label">Cantidad</label>
            <input v-model="selectedItem.cantidad" type="number" min="1" class="form-control" step="0" placeholder="Cantidad" @change="calcularPrecio"/>
            <!-- Acciones -->
            <label class="form-label">Precio</label>
            <input v-model="selectedItem.total" type="number" min="0" class="form-control" step="0.01" placeholder="Precio" disabled/>
            <!-- Acciones -->
            <button type="submit" class="btn btn-primary">Guardar</button>
        </div>
    </form>
</template>

<script>
import { getHelados, getTipos } from '@/services/apiClient';

export default {
    name: 'VentasEdit',
    data() {
        return {
            title: 'Editar Venta',
            selectedItem: { ...this.item },
            itemsLst: []
        }
    },
    mounted() {
        this.extraerHelados();
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
        extraerHelados() {
            getHelados("")
                .then((response) => {
                    this.itemsLst = response.data;
                })
                .catch((error) => {
                    console.error(error);
                });
        },
        calcularPrecio() {
            const helado = this.itemsLst.find(item => item.id === this.selectedItem.heladoId);
            if (helado) {
                this.selectedItem.total = helado.precio * this.selectedItem.cantidad;
            } else {
                this.selectedItem.total = 0;
            }
        }
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
</style>
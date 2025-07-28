<template>
    <form @submit.prevent="submit($event)" novalidate>
        <div class="container mt-4">
            <input v-model="item.codigo" type="text" class="form-control" placeholder="Codigo" disabled/>
            <div class="invalid-feedback">El valor es requerido.</div>
            <!-- Nombre -->
            <input v-model="item.nombre" type="text" class="form-control" placeholder="Nombre" />
            <div class="invalid-feedback">El valor es requerido.</div>
            <!-- NIT -->
            <input v-model="item.nit" type="text" class="form-control" placeholder="NIT" />
            <div class="invalid-feedback">NIT es obligatoria</div>
            <!-- Precio -->
            <input v-model="item.fecha" type="date" class="form-control" placeholder="Fecha" />
            <div class="invalid-feedback">Fecha es obligatoria</div>
            <hr/>
            <!-- Tipo -->
            <label class="form-label">Helado</label>
            <select v-model="item.heladoId" class="form-select" @change="calcularPrecio" required>
                <option v-for="(value, index) in itemsLst" :key="index" :value="value.id">{{ value.nombre }}</option>
            </select>
            <label class="form-label">Cantidad</label>
            <input v-model="item.cantidad" type="number" min="1" class="form-control" step="0" placeholder="Cantidad" @change="calcularPrecio"/>
            <!-- Acciones -->
            <label class="form-label">Precio</label>
            <input v-model="item.total" type="number" min="0" class="form-control" step="0.01" placeholder="Precio" disabled/>
            <button type="submit" class="btn btn-primary">Guardar</button>
        </div>
    </form>
</template>


<script>
import { getHelados, getTipos } from '@/services/apiClient';

export default {
    name: 'VentasNew',
    data() {
        return {
            title: 'Nuevo Tipo de Helado',
            item: {
                "codigo": String(Date.now()),
                "nombre": "",
                "nit": "",
                "fecha": "",
                "heladoId": 1,
                "cantidad": 1,
                "total": 0,
            },
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
            this.$emit('created', this.item);
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
            const helado = this.itemsLst.find(item => item.id === this.item.heladoId);
            if (helado) {
                this.item.total = helado.precio * this.item.cantidad;
            } else {
                this.item.total = 0;
            }
        }
    },
}
</script>

<style>
</style>
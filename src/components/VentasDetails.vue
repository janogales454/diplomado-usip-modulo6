<template>
        <div class="container mt-4">
            <!-- Codigo -->
            <label class="form-label">Codigo</label>
            <input v-model="selectedItem.codigo" type="text" class="form-control" placeholder="Codigo" disabled/>
            <div class="invalid-feedback">El valor es requerido.</div>
            <!-- Nombre -->
            <label class="form-label">Nombre</label>
            <input v-model="selectedItem.nombre" type="text" class="form-control" placeholder="Nombre" disabled/>
            <div class="invalid-feedback">El valor es requerido.</div>
            <!-- NIT -->
            <label class="form-label">NIT</label>
            <input v-model="selectedItem.nit" type="text" class="form-control" placeholder="NIT" disabled/>
            <div class="invalid-feedback">NIT es obligatoria</div>
            <!-- Precio -->
            <label class="form-label">Fecha</label>
            <input v-model="selectedItem.fecha" type="date" class="form-control" placeholder="Fecha" disabled/>
            <div class="invalid-feedback">Descripcion es obligatoria</div>
            <hr/>
            <!-- Tipo -->
            <div class="mb-3 table-responsive">
                <table class="table">
                    <thead class="table-dark">
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Nombre</th>
                            <th scope="col">Cantidad</th>
                            <th scope="col">Total</th>
                        </tr>
                    </thead>
                    <tbody class="table-group-divider">
                        <tr v-for="(item, index) in itemsLst" :key="item.id">
                            <th scope="row">{{ item.id }}</th>
                            <td>{{ item.helado.nombre }}</td>
                            <td>{{ item.cantidad }}</td>
                            <td>{{ item.total }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <!-- Precio -->
            <label class="form-label">Precio Total</label>
            <input v-model="totalPrice" type="number" class="form-control"  step="0.01" pattern="^\d*\.\d{2}$" disabled/>
            <div class="invalid-feedback">Descripcion es obligatoria</div>
        </div>
</template>

<script>
import { getHelados, getTipos, getVentas } from '@/services/apiClient';

export default {
    name: 'VentasDetails',
    data() {
        return {
            title: 'Editar Tipo de Helado',
            selectedItem: { ...this.item },
            itemsLst: [],
            totalPrice: 0
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
            let filter = "";
            let filterArray = [];
            filterArray.push("codigo=" + this.selectedItem.codigo);
            filterArray.push("_expand=helado");
            if (filterArray.length > 0) {
                filter = "?" + filterArray.join("&");
            }
            getVentas(filter)
                .then((response) => {
                    this.itemsLst = response.data;
                    this.calcularTotal();
                })
                .catch((error) => {
                    console.error(error);
                });
        },
        calcularTotal() {
            this.totalPrice = this.itemsLst.reduce((accumulator, currentValue) => {
                return accumulator + currentValue.total;
            }, 0);
            console.log("Items List: ", this.itemsLst);
            console.log("Total Price: ", this.totalPrice);
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
    form input{
        margin-bottom: 10px;
    }
</style>
<template>
    <div class="view-container">
        
        <div class="mb-3">
            <div class="input-group">
                <span class="input-group-text" id="basic-addon3">Buscar por nombre</span>
                <input type="search" v-model="searchText" class="form-control" @change="loadContent">
            </div>
        </div>

        <div class="mb-3">
            <div class="input-group">
                <span class="input-group-text" id="basic-addon3">Filtrar por Tipo de Helado</span>
                <select v-model="filtroHelado" id="filerID" class="form-select" @change="loadContent">
                    <option value="0">Todos</option>
                    <option v-for="item in tiposLst" :key="item.id" :value="item.id">{{ item.nombre }}</option>
                </select>
            </div>
        </div>
        <div class="mb-3 table-responsive">
            <table class="table">
                <thead class="table-dark">
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Codigo</th>
                        <th scope="col">Nombre</th>
                        <th scope="col">NIT</th>
                        <th scope="col">Fecha de Venta</th>
                        <th scope="col">Acciones</th>
                    </tr>
                </thead>
                <tbody class="table-group-divider">
                    <tr v-for="(item, index) in items" :key="item.id">
                        <th scope="row">{{ item.id }}</th>
                        <td>{{ item.codigo }}</td>
                        <td>{{ item.nombre }}</td>
                        <td>{{ item.nit }}</td>
                        <td>{{ item.fecha }}</td>
                        <td>
                            <div class="btn-group" role="group">
                                <button type="button" class="btn btn-secondary" @click="showDetails(item)" title="Detalles"><span class="material-symbols-outlined">description</span></button>
                                <button type="button" class="btn btn-primary" @click="showEdit(item)" title="Editar"><span class="material-symbols-outlined">edit</span></button>
                                <button type="button" class="btn btn-danger" @click="deleteItem(item.id)" title="Eliminar"><span class="material-symbols-outlined">delete</span></button>
                            </div>
                        </td>
                    </tr>
                </tbody>
                <tfoot class="table-dark">
                    <tr>
                        <td colspan="8">
                            <button type="button" class="btn btn-primary" @click="showCreate()" title="Crear Nuevo Contacto"><span class="material-symbols-outlined">add</span></button>
                        </td>
                    </tr>
                </tfoot>
            </table>
        </div>
    </div>
    <div class="modal fade" id="itemModal" tabindex="-1" aria-labelledby="itemModalLabel" ref="modalRef">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="itemModalLabel">Detalles de Contacto</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
                </div>
                <div class="modal-body">
                    <VentasNew v-if="modalMode == 1" @created="createNewItem($event)"></VentasNew>
                    <VentasEdit v-if="modalMode == 2" :item="selectedItem" 
                        @updated="editItem($event)" @cancelar="closeModal"></VentasEdit> 
                    <VentasDetails v-if="modalMode == 3" :item="selectedItem" @cancelar="closeModal"></VentasDetails> 
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { createHelado, createVenta, deleteHelado, deleteVenta, getHelados, getTipos, getVentas, updateHelado, updateVenta } from '@/services/apiClient';
import VentasNew from '@/components/VentasNew.vue';
import VentasEdit from '@/components/VentasEdit.vue';
import VentasDetails from '@/components/VentasDetails.vue';

export default {
    name: 'VentasView',
    data() {
        return {
            title: 'Helados',
            items: [],
            modalInst: null,
            modalMode: 1,
            selectedItem: null,
            searchText: '',
            filtroHelado: '0',
            tiposLst: []
        };
    },
    components: {
        VentasNew,
        VentasEdit,
        VentasDetails,
    },
    mounted() {
        this.$nextTick(() => {
            if (this.$refs.modalRef) {
                this.modalInst = new bootstrap.Modal(this.$refs.modalRef);
            } else {
                console.error('No se pudo inicializar el Modal.');
            }
        });
        this.loadContent();
        this.extraerTipos();
    },
    methods:{
        loadContent() {
            let filter = "";
            let filterArray = [];
            if(this.filtroHelado !== "0") {
                filterArray.push("heladoId=" + this.filtroHelado);
            }
            if (this.searchText !== "") {
                filterArray.push("q=" + this.searchText);
            }
            filterArray.push("_expand=helado");
            if (filterArray.length > 0) {
                filter = "?" + filterArray.join("&");
            }
            getVentas(filter).then(response => {
                this.items = response.data;
            }).catch(error => {
                console.error("Error fetching ventas:", error);
            });
        },
        showCreate() {
            this.modalMode=1;
            this.openModal();
        },
        showEdit(item) {
            this.modalMode=2;
            this.selectedItem = item;
            this.selectedIndex = item.id;
            setTimeout(() => {
                
                this.openModal();
            });

        },
        showDetails(item) {
            this.modalMode=3;
            this.selectedItem = item;
            this.selectedIndex = item.id;
            setTimeout(() => {
                
                this.openModal();
            });

        },
        openModal(){
            if (this.modalInst) {
                this.modalInst.show();
            } else {
                console.error('La ventana no fue inicializada');
            }
        },
        closeModal() {
            if (this.modalInst) {
                this.modalInst.hide();
            }
        },
        createNewItem(value){
            createVenta(value)
                .then((response) => {
                    this.closeModal();
                    this.loadContent();
                })
                .catch((error) => {
                    console.error(error);
                });
        },
        editItem(value) {
            updateVenta(value.id, value)
                .then((response) => {
                    this.closeModal();
                    this.loadContent();
                })
                .catch((error) => {
                    console.error("Error updating tipo:", error);
                });
        },
        deleteItem(index) {
            if (confirm('¿Está seguro de eliminar esta Venta?')) {
                deleteVenta(index)
                    .then((response) => {
                        this.loadContent();
                    }).catch((error) => {
                        console.error("Error deleting tipo:", error);
                    });
            }
        },
        extraerTipos() {
            getHelados("")
                .then((response) => {
                    this.tiposLst = response.data;
                })
                .catch((error) => {
                    console.error(error);
                });
        },
    },
}
</script>

<style>
</style>
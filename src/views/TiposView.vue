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
                <span class="input-group-text" id="basic-addon3">Filtrar por ID</span>
                <select v-model="filtroID" id="filerID" class="form-select" @change="loadContent">
                    <option disabled value="">-- Selecciona --</option>
                    <option value="">Todos</option>
                    <option v-for="item in items" :key="item.id" :value="item.id">{{ item.id }}</option>
                </select>
            </div>
        </div>
        <div class="mb-3 table-responsive">
            <table class="table">
                <thead class="table-dark">
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Nombre</th>
                        <th scope="col">Acciones</th>
                    </tr>
                </thead>
                <tbody class="table-group-divider">
                    <tr v-for="(item, index) in items" :key="item.id">
                        <th scope="row">{{ item.id }}</th>
                        <td>{{ item.nombre }}</td>
                        <td>
                            <div class="btn-group" role="group">
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
                    <NewTipo v-if="modalMode == 1" @created="createNewItem($event)"></NewTipo>
                    <EditTipo v-if="modalMode == 2" :item="selectedItem" 
                        @updated="editItem($event)" @cancelar="closeModal"></EditTipo> 
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { createTipo, deleteTipo, getTipos, updateTipo } from '@/services/apiClient';
import NewTipo from '@/components/TipoNew.vue';
import EditTipo from '@/components/TipoEdit.vue';

export default {
    name: 'TiposView',
    data() {
        return {
            title: 'Tipos',
            items: [],
            modalInst: null,
            modalMode: 1,
            selectedItem: null,
            searchText: '',
            filtroID: ''
        };
    },
    components: {
        NewTipo,
        EditTipo,
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
    },
    methods:{
        loadContent() {
            let filter = "";
            let filterArray = [];
            if(this.filtroID !== "") {
                filterArray.push("id=" + this.filtroID);
            }
            if (this.searchText !== "") {
                filterArray.push("q=" + this.searchText);
            }
            if (filterArray.length > 0) {
                filter = "?" + filterArray.join("&");
            }
            getTipos(filter).then(response => {
                this.items = response.data;
            }).catch(error => {
                console.error("Error fetching tipos:", error);
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
            createTipo(value)
                .then((response) => {
                    this.closeModal();
                    this.loadContent();
                })
                .catch((error) => {
                    console.error(error);
                });
        },
        editItem(value) {
            updateTipo(value.id, value)
                .then((response) => {
                    this.closeModal();
                    this.loadContent();
                })
                .catch((error) => {
                    console.error("Error updating tipo:", error);
                });
        },
        deleteItem(index) {
            if (confirm('¿Está seguro de eliminar este contacto?')) {
                deleteTipo(index)
                    .then((response) => {
                        this.loadContent();
                    }).catch((error) => {
                        console.error("Error deleting tipo:", error);
                    });
            }
        },
    },
}
</script>

<style>
</style>
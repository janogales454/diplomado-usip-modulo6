<template>
    <form @submit.prevent="submit($event)" novalidate>
        <div class="container mt-4">
            <!-- Nombre -->
            <input v-model="selectedItem.nombre" type="text" class="form-control" placeholder="Nombre" />
            <div class="invalid-feedback">El valor es requerido.</div>
            <!-- Acciones -->
            <button type="submit" class="btn btn-primary">Guardar Tipo</button>
        </div>
    </form>
</template>

<script>
export default {
    name: 'EditTipo',
    data() {
        return {
            title: 'Editar Tipo de Helado',
            selectedItem: { ...this.item },
        }
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
<template>
    <form @submit.prevent="submit($event)" novalidate>
        <div class="container mt-4">
            <!-- Nombre -->
            <input v-model="item.nombre" type="text" class="form-control" placeholder="Nombre"/>
            <div class="invalid-feedback">Nombre es obligatorio</div>
            <!-- Acciones -->
            <button type="submit" class="btn btn-primary">Guardar Tipo</button>
        </div>
    </form>
</template>


<script>
export default {
    name: 'NewTipo',
    data() {
        return {
            title: 'Nuevo Tipo de Helado',
            item: {},
        }
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
    },
}
</script>

<style>
</style>
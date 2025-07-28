<template>
    <nav class="navbar navbar-expand-lg nav-container">
        <div class="container-fluid">
            <router-link  class="navbar-brand" to="/">
                <img src="../assets/logo.png" alt="" width="30" height="24" class="d-inline-block align-text-top">
                Heladeria Montaño
            </router-link>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" 
                aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Administración
                        </a>
                        <ul class="dropdown-menu">
                            <li><a class="dropdown-item" href="/tipos">Administrar Tipos de Helados</a></li>
                            <li><a class="dropdown-item" href="/helados">Administrar Menu de Helados</a></li>
                        </ul>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" to="/ventas">Ventas</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" to="/about">About</router-link>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<script>
// @ is an alias to /src
export default {
  name: 'MenuView',
  components: {
    
  },
}
</script>

<style scoped lang="scss">

.nav-container {
  background-color: #44d192;
  border-bottom: 1px solid #ddd;
}

nav a.router-link-exact-active {
    color: #1c6d48;
}

.img-logo {
  width: 50px;
  height: 50px;
  margin-right: 10px;
}
</style>
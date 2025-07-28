<template>
  <div class="hello">
    <div class="px-4 py-5 my-5 text-center center-panel">
      <div class="inner-cell">
        <img class="d-block mx-auto mb-4" src="../assets/logo.png" alt="" width="72" height="57"> 
        <h1 class="display-5 fw-bold text-body-emphasis">¡Bienvenidos a la Heladeria Montaño!</h1>
        <div class="col-lg-6 mx-auto">
          <p class="lead mb-4">Ofrecemos servicios de venta de helados para pequeñas empresas, que aun esten en las etapas iniciales de levantar sus negocios en el mercado.</p> 
          <div class="d-grid gap-2 d-sm-flex justify-content-sm-center"> 
            <router-link :to="{ path: '/about' }">
            
            <button type="button" class="btn btn-outline-secondary btn-lg px-4">Acerca de nosotros</button></router-link>
          </div>
        </div>
      </div>
      
    </div>
    <div class="b-example-divider"></div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

.center-panel {
  background-color: #f8f9fa;
  background-image: url('../assets/heladeria.png'); 
  background-size: cover; 
  background-position: center;
}

.inner-cell
{
  background: rgba(255, 255, 255, 0.8);
  padding: 20px;
  border-radius: 10px;
}
</style>

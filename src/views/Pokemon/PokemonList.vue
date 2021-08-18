<template>
  <div>
    <h1>Pokemon list</h1>
    <pre>{{ pokemons }}</pre>
  </div>
</template>

<script>
export default {
    data:function(){
        return{
            pokemons:[]
        }
    },
    mounted(){
    this.$api.get(`https://pokeapi.co/api/v2/pokemon`)
    .then(response => {
      this.pokemons = response.data
    })
    .catch(e => {
      this.errors.push(e)
    })
  }
};
</script>

<style>
</style>
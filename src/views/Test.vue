<template>
  <div>
    <h1>TestPage</h1>
    <div>{{test}}</div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
    name: 'Test',
    computed: {
        test() {
            axios.get('http://127.0.0.1:8888/api/blog/list').then(result=>{
                console.log(result)
                return result.data
            })
        }
    }

}
</script>

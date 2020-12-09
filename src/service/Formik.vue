<template>
  <form class="form" @submit.prevent="onSubmit">
    <slot />
  </form>
</template>

<script>

  export default {
    name: 'Formik',
    props: {
      initialValues: {
        type: Object
      },
      onValidate: {
        type: Function
      }
    },
    data() {
      return {...this.$props.initialValues}
    },
    methods: {
      async onSubmit(e) {
        for(let el of e.target){
            if(el.name 
            && el.name !== "checkbox" 
            && el.value !== ""){
              this.$data[el.name] = el.value;
            }else{
              this.$data[el.name] = el.checked;
            }
        }
        let isValidated = await this.onValidate(this.$data);
        if(isValidated){
          this.$emit('onSubmit', this.$data);
        }
      }
    }
  };

  export const Field = {
    props: {
      name: {
        default: "",
        type: String
      },
      value: {
        default: "",
        type: String
      }
    },
    render() {
      return (
        this.$props.type !== "checkbox" && this.$props.type !== "select" ?
          <input name={this.$props.name} value={this.$props.value} {...this.$attrs} />
        :
          this.$props.type === "checkbox" ?
            <input name={this.$props.name} {...this.$attrs} />
          :
            <select name={this.$props.name} {...this.$attrs} >
              {this.$slots.default}
            </select>
      );
    },
  };

</script>
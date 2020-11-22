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
      onValidate: {type: Function}
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
      type: {
        default: "text",
        type: String
      },
      name: {
        default: "",
        type: String
      },
      placeholder: {
        default: "",
        type: String
      },
      value: {
        default: "",
        type: String
      },
      checked: {
        default: false,
        type: Boolean
      },
      required: {
        default: "false",
        type: String
      }
    },
    render() {
      return (
        this.$props.type !== "checkbox" && this.$props.type !== "select" ?
          <input type={this.$props.type} name={this.$props.name} placeholder={this.$props.placeholder} required={this.$props.required}/>
        :
          this.$props.type === "checkbox" ?
            <input type={this.$props.type} name={this.$props.name} checked={this.$props.checked} />
          :
            <select type={this.$props.type} name={this.$props.name} >
              {this.$slots.default}
            </select>
      );
    },
  };

</script>
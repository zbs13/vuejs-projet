<template>
  <div>
    <slot />
  </div>
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
      handleSubmit(e) {
        let els;
        if(!(e instanceof MouseEvent)){
          e.preventDefault();
          els = e.target;
        }else{
          els = this.$children;
        }

        for(let el of els){
            if(e instanceof MouseEvent){
              el = el.$el;
            }
            if((el.name && el.type
            && el.type !== "checkbox")
            || !el.type){
              this.$data[el.name] = el.value;
            }else{
              this.$data[el.name] = el.checked;
            }
        }

        this.onSubmit();
      },
      async onSubmit() {
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

  export const Button = {
    props: {
      handleSubmit: {
        default: false,
        type: Boolean
      },
      value: {
        default: "",
        type: String
      }
    },
    render() {
      return (
        this.$props.handleSubmit ?
          <input type="button" value={this.$props.value} {...this.$attrs} on-click={this.$parent.handleSubmit} />
        :
          <input type="button" value={this.$props.value} {...this.$attrs} />
      );
    },
  };

  export const Form = {
    render() {
      return (
        <form on-submit={this.$parent.handleSubmit} >
          {this.$slots.default}
        </form>
      );
    },
  };

</script>
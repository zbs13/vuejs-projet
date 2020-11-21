<script>

export const Formik = {
  props: {
    onSubmit: {
      default: 'onSubmit',
      type: String,
    }
  },

  render() {
    return (
      <div>
        {this.onSubmit}
        {this.$slots.default}
      </div>
    );
  },
};

export const Field = {
  render() {
    return (
      <div>
      bbb
      </div>
    );
  },
};

export default Formik;

</script>
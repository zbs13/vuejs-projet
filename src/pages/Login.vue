<template>
    <div>
        <Formik 
            onSubmit="aaa"
        >
            <Field />
        </Formik>
    </div>
</template>

<script>
    import { Formik, Field } from '../service/Formik';

    export default {
        name: 'Login',
        components: {
            Formik,
            Field
        }
    }
</script>

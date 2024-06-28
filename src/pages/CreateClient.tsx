import React from "react";
import { clientFormValidationSchema } from "@/formik/ValidationSchemas";
import { ICreateClientFormValues } from "@/interfaces/ClientInterfaces";
import { Field, FormikProvider, useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { createClient } from "@/repositories/client/clientRepository";
import { toast } from "react-toastify";

const Create: React.FC = () => {
    const navigate = useNavigate();
    const formValues: ICreateClientFormValues = {
        email: '',
        name: '',
        cin: '',
        pin: '',
    };

    const formik = useFormik<ICreateClientFormValues>({
        initialValues: formValues,
        validationSchema: clientFormValidationSchema,
        onSubmit: async (values) => {
            try {
                await createClient(values);
                toast.success('Client created successfully!')
                navigate('/');
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } catch (error: any) {
                if (error.isAxiosError) {
                    if (error.response.status == 409) {
                        toast.error(error.response.data.message);
                    }
                    else {
                        toast.error('Something went wrong! Please try again');
                    }
                }
            }
        },
    });

    return (
        <FormikProvider value={formik}>
            <section className='mid-section d-flex flex-column'>
                <div className='mid-info container-fluid py-4'>
                    <form onSubmit={formik.handleSubmit}>
                        <div className='mt-3 row'>
                            <div className='mb-3'>
                                <label className='mb-2 lh-sm small'>
                                    Name<span className='text-danger'>*</span>
                                </label>
                                <Field
                                    as='input'
                                    type='text'
                                    name='name'
                                    id='name'
                                    className='form-control'
                                    placeholder='Enter name'
                                    value={formik.values.name}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                {formik.touched.name && <small className="text-danger">{formik.errors.name}</small>}
                            </div>
                            <div className='mb-3'>
                                <label className='mb-2 lh-sm small'>
                                    Email<span className='text-danger'>*</span>
                                </label>
                                <Field
                                    as='input'
                                    type='email'
                                    name='email'
                                    id='email'
                                    className='form-control'
                                    placeholder='Enter email'
                                    value={formik.values.email}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                {formik.touched.email && <small className="text-danger">{formik.errors.email}</small>}
                            </div>
                            <div className='mb-3'>
                                <label className='mb-2 lh-sm small'>
                                    CIN<span className='text-danger'>*</span>
                                </label>
                                <Field
                                    as='input'
                                    type='text'
                                    name='cin'
                                    id='cin'
                                    className='form-control'
                                    placeholder='Enter CIN'
                                    value={formik.values.cin}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    min="0"
                                />
                                {formik.touched.cin && <small className="text-danger">{formik.errors.cin}</small>}
                            </div>
                            <div className='mb-3'>
                                <label className='mb-2 lh-sm small'>
                                    PIN<span className='text-danger'>*</span>
                                </label>
                                <Field
                                    as='input'
                                    type='text'
                                    name='pin'
                                    id='pin'
                                    className='form-control'
                                    placeholder='Enter PIN'
                                    value={formik.values.pin}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    min="0"
                                />
                                {formik.touched.pin && <small className="text-danger">{formik.errors.pin}</small>}
                            </div>
                            <div className='mb-3 mt-4'>
                                <button
                                    className='btn btn-primary'
                                    type="submit"
                                >
                                    Create Client
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </section>
        </FormikProvider>
    );
};

export default Create;

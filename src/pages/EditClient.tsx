import React, { useEffect, useState } from "react";
import { clientFormValidationSchema } from "@/formik/ValidationSchemas";
import { ClientInterface, IUpdateClientFormValues } from "@/interfaces/ClientInterfaces";
import { Field, FormikProvider, useFormik } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import { updateClient, getClient } from "@/repositories/client/clientRepository";
import { toast } from "react-toastify";

const EditClient: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const initFormValues: IUpdateClientFormValues = {
    email: '',
    name: '',
    cin: '',
    pin: '',
  };
  const [formValues, setFormValues] = useState(initFormValues);
  const [client, setClient] = useState<ClientInterface>();

  useEffect(() => {
    initClientData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  async function initClientData() {
    try {
      const clientData = await getClient(parseInt(id as string));
      setFormValues(clientData.data)
      setClient(clientData.data);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error.isAxiosError) {
        if (error.response.status == 409) {
          toast.error(error.response.data.message);
        }
        if (error.response.status == 404) {
          navigate('/404')
        }
        else {
          toast.error('Something went wrong! Please try again');
        }
      }
    }
  }

  const formik = useFormik<IUpdateClientFormValues>({
    initialValues: formValues,
    validationSchema: clientFormValidationSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      try {
        await updateClient(client!.id as number, values);
        toast.success('Client updated successfully!')
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

  function handleBack() {
    navigate('/');
  }

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
                  onClick={handleBack}
                  className='btn btn-primary me-3'
                >
                  Back
                </button>
                <button
                  className='btn btn-success'
                  type="submit"
                >
                  Update Client
                </button>
              </div>
            </div>
          </form>
        </div>
      </section>
    </FormikProvider>
  );
};

export default EditClient;

import { useContext } from 'react'
import { Form, Input, Button } from 'antd'
import * as yup from 'yup'
import { Modal } from 'react-bootstrap'
import { Formik } from 'formik'
import { HexColorPicker } from "react-colorful";

import { DataContext } from '../../contexts/data'
import { AuthContext } from '../../contexts/auth'
import Service from '../../utils/Service'
import { getToken } from '../../utils/getToken';


const validationSchema = yup.object({
  name: yup.string().required('Name is required'),
  hex: yup.string().required(),
})

const initialValues = {
  _id: 0,
  name: '',
  hex: '#ccc',
}

const CategoryModal = ({ action = 'create', onHide, overrideInitialValues = {}, ...rest }) => {
  const { addData, updateData } = useContext(DataContext)
  const { isAuthenticate } = useContext(AuthContext)

  const onSubmit = async (values) => {
    if (!isAuthenticate) return
    const token = getToken()

    if (action === 'create') {
      const response = await Service.addCategory(token, values);
      addData('category', response)
    } else {
      const response = await Service.updateCategory(token, values._id, values);
      updateData('category', response)
    }

    onHide()
  }

  return (
    <Modal onHide={onHide} {...rest}>
      <Formik
        onSubmit={onSubmit}
        initialValues={{ ...initialValues, ...overrideInitialValues }}
        validationSchema={validationSchema}
      >
        {({ values, handleChange, setFieldValue, handleSubmit, isSubmitting, errors }) => (
          <Form
            onFinish={handleSubmit}
            layout='vertical'
          >
            <Modal.Header closeButton>
              <Modal.Title>{action === 'create' ? 'Add' : 'Edit'} Category</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form.Item
                label="Name"
                validateStatus={errors.name ? 'error' : ''}
                help={errors.name}
              >
                <Input
                  size="large"
                  name="name"
                  placeholder='Add name...'
                  onChange={handleChange}
                  value={values.name}
                />
              </Form.Item>
              <Form.Item label="Pick a color:">
                <HexColorPicker
                  className='w-100'
                  color={values.hex}
                  onChange={value => setFieldValue('hex', value)}
                />
              </Form.Item>
            </Modal.Body>
            <Modal.Footer>
              <Button disabled={isSubmitting} onClick={onHide}>
                Close
              </Button>
              <Button htmlType='submit' type='primary' loading={isSubmitting}>
                Save
              </Button>
            </Modal.Footer>
          </Form>
        )}
      </Formik>
    </Modal>
  )
}

export default CategoryModal

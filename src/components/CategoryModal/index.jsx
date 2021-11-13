import { Form, Input, Button } from 'antd'
import * as yup from 'yup'
import { Modal } from 'react-bootstrap'
import { Formik } from 'formik'
import { HexColorPicker } from "react-colorful";

const validationSchema = yup.object({
  name: yup.string().required(),
  hex: yup.string().required(),
})

const initialValues = {
  name: '',
  hex: '#ccc',
}

const CategoryModal = ({ onHide, overrideInitialValues = {}, ...rest }) => {
  const onSubmit = (values) => {
    console.log(values);
    onHide()
  }

  return (
    <Modal onHide={onHide} {...rest}>
      <Formik
        onSubmit={onSubmit}
        initialValues={{ ...initialValues, ...overrideInitialValues }}
        validationSchema={validationSchema}
      >
        {({ values, handleChange, setFieldValue }) => (
          <Form
            onFinish={() => onSubmit(values)}
            layout='vertical'
          >
            <Modal.Header closeButton>
              <Modal.Title>Add Category</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form.Item label="Name">
                <Input
                  size="large"
                  name="name"
                  placeholder='Add title...'
                  onChange={handleChange}
                  value={values.title}
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
              <Button onClick={onHide}>
                Close
              </Button>
              <Button htmlType='submit' type='primary'>
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

import { Form, Input, Radio, Checkbox, DatePicker, TimePicker, Button } from 'antd'
import { Modal } from 'react-bootstrap'
import { Formik } from 'formik'
import moment from 'moment';
import * as yup from 'yup'

const now = new Date()

const validationSchema = yup.object({
  title: yup.string().required(),
  description: yup.string().required(),
  type: yup.string().required(),
  dateStart: yup.string().required(),
  timeStart: yup.string().required(),
  timeEnd: yup.string().required(),
  categoryId: yup.string().required(),
})

const initialValues = {
  title: '',
  description: '',
  type: 'Event',
  dateStart: moment(now, 'yyyy-MM-DD'),
  dateEnd: moment(now, 'yyyy-MM-DD'),
  timeStart: moment(now, 'HH:mm'),
  timeEnd: moment(now, 'HH:mm').add(1, 'h'),
  categoryId: '',
  isAllDay: false
}

const EventTaskModal = ({ onHide, overrideInitialValues = {}, ...rest }) => {

  const onSubmit = (values) => {
    console.log({
      dateStart: values.dateStart.format('YYYY-MMMM-DD'),
      dateEnd: values.dateEnd.format('YYYY-MMMM-DD')
    });
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
              <Modal.Title>Add {values.type}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form.Item>
                <Radio.Group name='type' onChange={handleChange} defaultValue={values.type}>
                  <Radio.Button value="Event">EVENT</Radio.Button>
                  <Radio.Button value="Task">TASK</Radio.Button>
                </Radio.Group>

              </Form.Item>
              <Form.Item label="Title">
                <Input
                  size="large"
                  name="title"
                  placeholder='Add title...'
                  onChange={handleChange}
                  value={values.title}
                />
              </Form.Item>

              <Form.Item label="Date" className={values.isAllDay ? 'm-0' : ''}>
                {values.isAllDay ? (
                  <DatePicker.RangePicker
                    allowClear={false}
                    size='large'
                    className='w-100'
                    popupStyle={{ zIndex: 99999999 }}
                    defaultValue={[values.dateStart, values.dateEnd]}
                    onChange={([newDateStart, newDateEnd]) => {
                      setFieldValue('dateStart', newDateStart)
                      setFieldValue('dateEnd', newDateEnd)
                    }}
                  />
                ) : (
                  <DatePicker
                    name="dateStart"
                    className='w-100'
                    popupStyle={{ zIndex: 99999999 }}
                    size='large'
                    onChange={(date) => {
                      setFieldValue('dateStart', date)
                      setFieldValue('dateEnd', date)
                    }}
                    defaultValue={values.dateStart}
                  />
                )}
              </Form.Item>
              {!values.isAllDay && (
                <>
                  <Form.Item label="Time" className='m-0'>
                    <TimePicker.RangePicker
                      allowClear={false}
                      size='large'
                      className='w-100'
                      popupStyle={{ zIndex: 99999999 }}
                      format='HH:mm'
                      defaultValue={[values.timeStart, values.timeEnd]}
                      onChange={([newTimeStart, newTimeEnd]) => {
                        setFieldValue('timeStart', newTimeStart)
                        setFieldValue('timeEnd', newTimeEnd)
                      }}
                    />
                  </Form.Item>
                </>
              )}
              <Form.Item>
                <Checkbox
                  name='isAllDay'
                  checked={values.isAllDay}
                  onChange={handleChange}
                >
                  All day
                </Checkbox>
              </Form.Item>
              <Form.Item label="Description">
                <Input
                  size="large"
                  name="description"
                  placeholder='Add description...'
                  onChange={handleChange}
                  value={values.description}
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

export default EventTaskModal

import { useState, useContext } from 'react'
import { Form, Input, Radio, Checkbox, DatePicker, TimePicker, Button, Row, Col, Select, Typography } from 'antd'
import { Modal } from 'react-bootstrap'
import { Formik } from 'formik'
import moment from 'moment';
import * as yup from 'yup'

import { NotFoundContainer, CircleIndicator } from './components'
import { DataContext } from '../../contexts/data'
import { AuthContext } from '../../contexts/auth'
import Service from '../../utils/Service'
import { getToken } from '../../utils/getToken';


const { TextArea } = Input
const { Option } = Select
const { Text } = Typography


const validationSchema = yup.object({
  title: yup.string().required('Title is required'),
  description: yup.string().default(''),
  type: yup.string().required(),
  dateStart: yup.string().required(),
  timeStart: yup.string().required(),
  timeEnd: yup.string().required(),
  categoryId: yup.string().required('Please select the category'),
})

const getInitialValues = () => {
  const now = moment()
  let timeEnd = moment(now, 'HH:mm').add(1, 'h');
  if (!timeEnd.isSame(now, 'day')) timeEnd = moment(now).hour(23).minute(59)
  return {
    _id: 0,
    title: '',
    description: '',
    type: 'Event',
    dateStart: now,
    dateEnd: now,
    timeStart: now,
    timeEnd,
    categoryId: '',
    isAllDay: false,
    isDone: false
  }
}

const EventTaskModal = ({ action = 'create', onHide, overrideInitialValues = {}, ...rest }) => {
  const { addData, updateData, categories } = useContext(DataContext)
  const { isAuthenticate } = useContext(AuthContext)

  const [category, setCategory] = useState('')
  const initialValues = getInitialValues()

  const onSubmit = async (values) => {
    if (!isAuthenticate) return
    const token = getToken()

    const { dateStart, dateEnd, timeStart, timeEnd, ...restValues } = values

    const formattedValues = {
      ...restValues,
      dateStart: `${dateStart.format('YYYY-MM-DD')} ${timeStart.format('HH:mm')}+0700`,
      dateEnd: `${values.isAllDay ? dateEnd.format('YYYY-MM-DD') : dateStart.format('YYYY-MM-DD')} ${timeEnd.format('HH:mm')}+0700`,
    }


    if (action === 'create') {
      const response = await Service.addEvent(token, formattedValues);
      addData('event', response)
    } else {
      const response = await Service.updateEvent(token, values._id, formattedValues);
      updateData('event', response)
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
        {({ values, handleChange, setFieldValue, handleSubmit, isSubmitting, errors, touched, handleBlur, setFieldTouched }) => (
          <Form
            onFinish={handleSubmit}
            layout='vertical'
          >
            <Modal.Header closeButton>
              <Modal.Title>{action === 'create' ? 'Add' : 'Edit'} {values.type}</Modal.Title>
            </Modal.Header>
            <Modal.Body>

              <Form.Item
                label="Title"
                validateStatus={Boolean(touched.title && errors.title) ? 'error' : ''}
                help={Boolean(touched.title && errors.title) && errors.title}
              >
                <Input
                  size="large"
                  name="title"
                  placeholder='Add title...'
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.title}
                />
              </Form.Item>
              <Form.Item
                label="Description"
                validateStatus={errors.description ? 'error' : ''}
                help={errors.description}
              >
                <TextArea
                  size="large"
                  rows={3}
                  name="description"
                  placeholder='Add description...'
                  onChange={handleChange}
                  value={values.description}
                />
              </Form.Item>
              <Row gutter={8}>
                <Col span={8} className='d-flex align-items-end'>
                  <Form.Item className={values.isAllDay ? 'm-0' : ''}>
                    <Radio.Group name='type' size="large" onChange={handleChange} defaultValue={values.type}>
                      <Radio.Button className='left-border-rounded' value="Event">EVENT</Radio.Button>
                      <Radio.Button className='right-border-rounded' value="Task">TASK</Radio.Button>
                    </Radio.Group>
                  </Form.Item>
                </Col>
                <Col span={16}>
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
                        allowClear={false}
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
                </Col>
              </Row>
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
              <Form.Item
                label='Category'
                validateStatus={Boolean(touched.categoryId && errors.categoryId) ? 'error' : ''}
                help={Boolean(touched.categoryId && errors.categoryId) && errors.categoryId}
              >
                <Select
                  size='large'
                  showSearch
                  value={values.categoryId ? values.categoryId : null}
                  placeholder="Select a category"
                  dropdownStyle={{ zIndex: 99999999 }}
                  onSearch={value => setCategory(value)}
                  notFoundContent={<SelectNotFound text={category} />}
                  optionFilterProp='data'
                  onChange={value => setFieldValue('categoryId', value)}
                  onBlur={() => setFieldTouched('categoryId')}
                >
                  {categories.map((c) => (
                    <Option value={c._id} data={c.name}>
                      <div className='d-flex align-items-center'>
                        <CircleIndicator color={c.hex} />
                        <Text>{c.name}</Text>
                      </div>
                    </Option>
                  ))}
                </Select>
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

const SelectNotFound = ({ text }) => {
  return (
    <NotFoundContainer onClick={() => console.log('Show color picker')}>
      <Text>+ Create "{text}"</Text>
    </NotFoundContainer>
  )
}

export default EventTaskModal

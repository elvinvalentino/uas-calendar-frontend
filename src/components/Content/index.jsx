import { useRef, useState, useEffect } from 'react'
import { Container } from 'react-bootstrap'
import { Row, Col } from 'antd'
import EventTask from '../EvenTask'
import Calendar from '../Calendar'
import CalendarCategories from '../CalendarCategories'

import { ExpandIndicator } from './components'

const Content = ({ calendarRef, date, setDate, goToDate }) => {
  const [isExpandedRight, setIsExpandedRight] = useState(false)
  const [isExpandedLeft, setIsExpandedLeft] = useState(true)
  const [maxHeight, setMaxHeight] = useState('100vh')
  const calendarContainer = useRef()

  useEffect(() => {
    const handleResize = () => {
      const height = calendarContainer.current.children[0].getBoundingClientRect().height
      setMaxHeight(height)
    }

    handleResize();
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  let calendarSpan = 24
  if (isExpandedRight) calendarSpan -= 5
  if (isExpandedLeft) calendarSpan -= 5
  return (
    <Container fluid>
      <Row gutter={8}>
        {isExpandedLeft && <Col span={5} style={{ maxHeight }}>
          <EventTask setIsExpanded={setIsExpandedLeft} goToDate={goToDate} />
        </Col>}
        <Col span={calendarSpan} ref={calendarContainer} style={{
          ...(!isExpandedRight && {
            paddingRight: '1em'
          }),
          ...(!isExpandedLeft && {
            paddingLeft: '1em'
          })
        }} >
          <Calendar calendarRef={calendarRef} />
        </Col>
        {isExpandedRight && <Col span={5} style={{ maxHeight }}>
          <CalendarCategories
            setIsExpanded={setIsExpandedRight}
            date={date}
            setDate={setDate}
            goToDate={goToDate}
          />
        </Col>}
      </Row>
      {!isExpandedRight && <ExpandIndicator position='right' onClick={() => setIsExpandedRight(true)} />}
      {!isExpandedLeft && <ExpandIndicator position='left' onClick={() => setIsExpandedLeft(true)} />}
    </Container>
  )
}

export default Content

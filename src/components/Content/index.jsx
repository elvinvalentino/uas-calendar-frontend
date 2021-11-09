import { useRef, useState, useEffect } from 'react'
import { Container } from 'react-bootstrap'
import { Row, Col } from 'antd'
import EventTask from '../EvenTask'
import Calendar from '../Calendar'
import CalendarCategories from '../CalendarCategories'

import { ExpandIndicator } from './components'

const Content = ({ calendarRef, date, setDate, goToDate }) => {
  const [isExpanded, setIsExpanded] = useState(false)
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

  return (
    <Container fluid>
      <Row gutter={8}>
        <Col span={5} style={{ maxHeight }}>
          <EventTask />
        </Col>
        <Col span={isExpanded ? 14 : 19} ref={calendarContainer} style={{
          ...(!isExpanded && {
            paddingRight: '1em'
          })
        }} >
          <Calendar calendarRef={calendarRef} />
        </Col>
        {isExpanded && <Col span={5} style={{ maxHeight }}>
          <CalendarCategories
            setIsExpanded={setIsExpanded}
            date={date}
            setDate={setDate}
            goToDate={goToDate}
          />
        </Col>}
      </Row>
      {!isExpanded && <ExpandIndicator onClick={() => setIsExpanded(true)} />}
    </Container>
  )
}

export default Content

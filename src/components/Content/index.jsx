import { useEffect, useRef, useState } from 'react'
import { Container } from 'react-bootstrap'
import { Row, Col } from 'antd'
import EventTask from '../EvenTask'
import Calendar from '../Calendar'

import { ExpandIndicator } from './components'

const Content = () => {
  const [isExpanded, setIsExpanded] = useState(false)
  const [maxHeight, setMaxHeight] = useState('100vh');
  const calendarContainer = useRef()

  useEffect(() => {
    function handleResize() {
      const height = calendarContainer.current.children[0].getBoundingClientRect().height
      setMaxHeight(height)
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [setMaxHeight])


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
          <Calendar />
        </Col>
        {isExpanded && <Col span={5}>
          test
        </Col>}
      </Row>
      {!isExpanded && <ExpandIndicator onClick={() => setIsExpanded(true)} />}
    </Container>
  )
}

export default Content

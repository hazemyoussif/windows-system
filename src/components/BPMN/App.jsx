import React, { useState } from 'react'
import { Bpmn } from './Bpmn'
import { BpmnSelector } from './BpmnSelector'
import converter from 'xml-js'

export const App = () => {
  const [bpmnXML, setBpmnXML] = useState(null)

  return (
    <div style={{ width: '100%', height: '60vh' }}>
      <Bpmn
        xml={bpmnXML}
        onChange={data => {
          console.log('data', converter.xml2json(data, { compact: true, spaces: 2 }))
        }}
      />
      <BpmnSelector onChange={setBpmnXML} />
    </div>
  )
}

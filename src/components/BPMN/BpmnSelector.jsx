import { useCallback } from 'react'

const BpmnSelector = ({ onChange }) => {
  const onChangeHandler = useCallback(
    async event => {
      const bpmnFile = await event.target.files[0].text()

      onChange(bpmnFile)
    },
    [onChange]
  )

  return <input type='file' accept='.bpmn' multiple={false} onChange={onChangeHandler} />
}

export default BpmnSelector;
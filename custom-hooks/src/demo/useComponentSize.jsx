import React, { useRef } from 'react'
import useComponentSize from '../hooks/useComponentSize'

export default function MyComponent() {
  let ref = useRef(null)
  let size = useComponentSize(ref)
  // size == { width: 100, height: 200 }
  let { width, height } = size
  let imgUrl = `https://via.placeholder.com/${width}x${height}`

  return (
    <div  style={{ width: '100%', height: '100%', border: '1px solid' }}>
      <img  src={imgUrl} ref={ref} />
    </div>
  )
}
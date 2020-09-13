import {useLayoutEffect, useState, useCallback}  from 'react';


function getSize(el) {
  if (!el) {
    return {
      width: 0,
      height: 0
    }
  }

  return {
    width: el.offsetWidth,
    height: el.offsetHeight
  }
}

/* eslint-disable */
export default function useComponentSize(ref) {
  const [ComponentSize, setComponentSize] = useState(getSize(ref ? ref.current : {}))


  const handleResize = useCallback(
    function handleResize() {
      if (ref.current) {
        setComponentSize(getSize(ref.current))
      }
    },
    [ref]
  )

  useLayoutEffect(() => {
    if (!ref.current) {
      return
    }
    handleResize();
  
    let resizeObserver = new ResizeObserver(() => handleResize());
    resizeObserver.observe(ref.current);
  
    return () => {
      resizeObserver.disconnect(ref.current);
      resizeObserver = null;
    };
  },  [ref.current]);
  return ComponentSize
}
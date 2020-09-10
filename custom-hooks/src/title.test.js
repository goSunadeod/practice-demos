import { renderHook, act } from '@testing-library/react-hooks'
import  useDocumentTitle from './hooks/useDocumentTitle';

describe('useTitle', () => {
  describe('change', () => {
     it('change hello', () => {
      renderHook(() => useDocumentTitle('hello'))
      expect(document.title).toBe('hello')
    })
  })
});
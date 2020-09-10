import {useEffect} from 'react';

export default function useDocumentTitle(title) {
  useEffect(
    () => {
      document.title = title;
      return () => (document.title = "Hi");
    },
    [title]
  );
}
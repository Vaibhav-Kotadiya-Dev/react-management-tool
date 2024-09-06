import { useRef, useEffect } from 'react'

function useDocumentTitle(title?: string, prevailOnUnmount?: boolean) {
  const defaultTitle = useRef<any>(document.title);

  useEffect(() => {
    document.title = (title ? `${title} - ` : '') + 'Board' 
  }, [title]);

  useEffect(() => () => {
    if (!prevailOnUnmount) {
      document.title = defaultTitle.current;
    }
  }, [])
}

export default useDocumentTitle
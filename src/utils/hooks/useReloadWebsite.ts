import { useEffect, useState } from 'react';

export default function useReloadWebsite() {
  const [networkStatus, setNetworkStatus] = useState('offline');
  const [visibilityChangeTime, setVisibilityChangeTime] = useState(Date.now());

  useEffect(() => {
    window.addEventListener('online', () => {
      if (networkStatus === 'offline') {
        // @ts-ignore
        window.location.reload(true);
      }
      setNetworkStatus('online');
    });
    window.addEventListener('offline', () => {
      setNetworkStatus('offline');
    });

    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'visible') {
        if ((Date.now().valueOf() - visibilityChangeTime.valueOf()) / 3600000 > 1) {
          // @ts-ignore
          window.location.reload(true);
        }
      } else {
        setVisibilityChangeTime(Date.now());
      }
    });
    // eslint-disable-next-line
  }, []);

  return null;
}

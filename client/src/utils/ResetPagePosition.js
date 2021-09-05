import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ResetPagePosition(pathName) {
  pathName = useLocation().pathname;

  useEffect(() => {
    // RESET PAGE POSITION
    window.scrollTo(0, 0);
  }, [pathName]);
}

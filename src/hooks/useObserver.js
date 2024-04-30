import { useEffect, useRef } from "react";

export default function useObserver(ref, canLoad, isLoading, callback) {
  const observer = useRef();
  useEffect(() => {
    console.log('use observer')
    if (isLoading) return;
    if (observer.current) observer.current.disconnect();
    let options = {
      root: null, // по умолчанию (можно и не указывать)
    };
    const cb = function (entries, observer) {
      if (entries[0].isIntersecting && canLoad) {
        callback();
      }
    };

    observer.current = new IntersectionObserver(cb, options);
    observer.current.observe(ref.current);
  }, [isLoading]);
}

import { useState } from "react";

export default function useFetching(callback) {
  const [isLoading, setIsLoading] = useState(false);
  // базовый случай обработка ошибки при фетчинге
  const [error, setError] = useState('');

  const fetching = async (...args) => {
    try {
      setIsLoading(true);
      await callback(...args);
    } catch (e) {
      setError(e.message);
      console.log({ e });
    } finally {
      setIsLoading(false);
    }
  }

  return [fetching, isLoading, error];
}


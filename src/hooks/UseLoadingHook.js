import { useState } from 'react';

const UseLoadingHook = () => {
  const [isLoading, setIsLoading] = useState(false);

  const enableLoading = () => {
    setIsLoading(true);
  };

  const disableLoading = () => {
    setIsLoading(false);
  };

  return { enableLoading, disableLoading, isLoading };
};

export default UseLoadingHook;

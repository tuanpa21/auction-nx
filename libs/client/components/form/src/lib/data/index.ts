import { useState } from 'react';

export default function useFormData() {
  const [showPassword, setShowPassword] = useState(false);

  return {
    showPassword,
    setShowPassword,
  };
}

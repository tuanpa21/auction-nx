function checkEnv(env: string | undefined, name: string) {
  if (!env) {
    throw new Error(
      `Please define the ${name} environment variable inside .env`
    );
  }

  return env;
}

export function getAPIEndpoint() {
  const value = import.meta.env.VITE_API_URL;
  console.log(value);
  return checkEnv(value, 'VITE_API_URL');
}

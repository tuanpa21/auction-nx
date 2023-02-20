function checkEnv(env: string | undefined, name: string) {
  if (!env) {
    throw new Error(
      `Please define the ${name} environment variable inside .env`
    );
  }

  return env;
}

export function getAPIEndpoint() {
  const value = import.meta.env.VITE_URL_API;
  return checkEnv(value, 'URL_API');
}

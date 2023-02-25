import { Inject } from '@nestjs/common';
import { PinoLogger } from 'nestjs-pino';
import { AppException } from '.';

// Rare used, auto help convert function to try catch for quick err handling
export function log(appError?: AppException, isThrow = true) {
  const injectLogger = Inject(PinoLogger);

  return (
    target: any,
    propertyKey: string,
    propertyDescriptor: PropertyDescriptor
  ) => {
    injectLogger(target, 'logger');
    const originalMethod = propertyDescriptor.value;

    propertyDescriptor.value = async function (...args: any[]) {
      try {
        return await originalMethod.apply(this, args);
      } catch (error: any) {
        const logger: PinoLogger = this.logger;
        logger.setContext(target.constructor.name);
        logger.error(error.message, error.stack);

        if (isThrow) throw appError || error;

        return null;
      }
    };
  };
}

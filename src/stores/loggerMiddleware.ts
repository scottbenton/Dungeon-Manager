import { Logger } from '@/lib/logger';
import { Middleware, PayloadAction } from '@reduxjs/toolkit';
import deepCopy from 'deepcopy';
import { logSanitizers } from './logSanitation';

export const loggerMiddleware: Middleware =
  ({ getState }) =>
  (next) =>
  (action: PayloadAction) => {
    console.log('will dispatch', action);

    const sliceKey = action.type.split('/')[0];

    const returnValue = next(action);

    let sliceCopy = deepCopy((getState() as { [key: string]: any })[sliceKey]);
    let actionCopy = deepCopy(action);

    // Remove personal information, if needed
    const sliceSanitizer = logSanitizers[sliceKey];
    if (sliceSanitizer?.actionSanitizer) {
      actionCopy = sliceSanitizer.actionSanitizer(actionCopy);
    }
    if (sliceSanitizer?.stateSanitizer) {
      sliceCopy = sliceSanitizer?.stateSanitizer(sliceCopy);
    }

    Logger.debug(action.type, {
      action: actionCopy,
      state: sliceCopy,
    });

    // Call the next dispatch method in the middleware chain.

    console.log('state after dispatch', sliceCopy);

    // This will likely be the action itself, unless
    // a middleware further in chain changed it.
    return returnValue;
  };

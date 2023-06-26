import {
  PLATFORM_ID,
  TransferState,
  inject,
  makeStateKey,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

/**
 * Set value in TransferState store on server, and get it on browser
 *
 * @param key Key to use for TransferState store
 * @param value Value to set if on server
 * @returns Value from TransferState store if on browser, otherwise the value passed in
 */
export function getOrSet<T>(
  key: string,
  value: T,
  defaultValue: T | null = null
): T | null {
  const transferState = inject(TransferState);
  const platformId = inject(PLATFORM_ID);
  const stateKey = makeStateKey<T>(key);

  if (isPlatformBrowser(platformId)) {
    return transferState.get(stateKey, defaultValue);
  } else {
    transferState.set(stateKey, value);
    return value;
  }
}

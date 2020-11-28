import { CONFIG } from '../../config';

export const normalizeNumber = (num: number) => num * CONFIG.SIZE_MULTIPLIER;

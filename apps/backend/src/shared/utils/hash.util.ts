import { createHash } from 'crypto';

export const calculateRowHash = (values: (string | number | boolean | null | undefined)[]): string => {
  const hash = createHash('sha256');
  hash.update(values.map((value) => (value ?? '').toString()).join('|'));
  return hash.digest('hex');
};

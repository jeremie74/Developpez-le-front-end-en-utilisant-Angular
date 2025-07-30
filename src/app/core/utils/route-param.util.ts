export function parseRouteParam<T extends 'number' | 'boolean' | 'string'>(
  value: string | null | undefined,
  type: T,
): T extends 'number' ? number : T extends 'boolean' ? boolean : string {
  if (value === null || value === undefined) {
    throw new Error('Missing route param');
  }

  switch (type) {
    case 'number':
      const num = Number(value);
      if (isNaN(num)) throw new Error(`Invalid number param: "${value}"`);
      return num as any;
    case 'boolean':
      return (value === 'true') as any;
    case 'string':
    default:
      return value as any;
  }
}

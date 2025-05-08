export function toNumber(value: any, options?: { default?: number; min?: number; max?: number }): number {
    let num = Number(value);
  
    if (isNaN(num)) {
      num = options?.default ?? 0;
    }
  
    if (options?.min !== undefined && num < options.min) {
      num = options.min;
    }
  
    if (options?.max !== undefined && num > options.max) {
      num = options.max;
    }
  
    return num;
  }
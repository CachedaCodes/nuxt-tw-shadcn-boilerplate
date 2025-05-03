import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useCount } from '../count';

// Mock the useState function from Nuxt
vi.mock('#app', () => ({
  useState: vi.fn((key, init) => {
    // Create a reactive reference with the initial value
    const value = init();
    const ref = {
      value
    };
    return ref;
  })
}));

describe('useCount', () => {
  let count: ReturnType<typeof useCount>;
  
  beforeEach(() => {
    // Reset the random number seed to ensure consistent tests
    vi.spyOn(Math, 'random').mockReturnValue(0.5);
    count = useCount();
  });

  it('should initialize with a random value between 0 and 20', () => {
    // Math.random() = 0.5, so Math.round(0.5 * 20) = 10
    expect(count.count.value).toBe(10);
  });

  it('should increment the count', () => {
    const initialValue = count.count.value;
    count.inc();
    expect(count.count.value).toBe(initialValue + 1);
  });

  it('should decrement the count', () => {
    const initialValue = count.count.value;
    count.dec();
    expect(count.count.value).toBe(initialValue - 1);
  });

  it('should return the count object with proper methods', () => {
    expect(count).toHaveProperty('count');
    expect(count).toHaveProperty('inc');
    expect(count).toHaveProperty('dec');
    expect(typeof count.inc).toBe('function');
    expect(typeof count.dec).toBe('function');
  });
});
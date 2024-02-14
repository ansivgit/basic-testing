// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 2, b: 2, action: Action.Add, expected: 4 },
  { a: 3, b: 2, action: Action.Add, expected: 5 },
  { a: 9, b: 3, action: Action.Add, expected: 12 },
  { a: 9, b: 3, action: Action.Subtract, expected: 6 },
  { a: 9, b: 3, action: Action.Multiply, expected: 27 },
  { a: 1, b: 3, action: Action.Multiply, expected: 3 },
  { a: 3, b: 3, action: Action.Divide, expected: 1 },
  { a: 9, b: 1, action: Action.Divide, expected: 9 },
  { a: 9, b: 3, action: Action.Exponentiate, expected: 729 },
  { a: 9, b: 3, action: '%%', expected: null },
  { a: true, b: '55', action: Action.Add, expected: null },
  { a: 1, b: '55', action: Action.Add, expected: null },
];

describe('simpleCalculator', () => {
  describe.each(testCases)(
    'calculate(%i, %i, %s)',
    ({ a, b, action, expected }) => {
      test(`returns ${expected}`, () => {
        const result = simpleCalculator({ a, b, action });
        expect(result).toBe(expected);
      });
    },
  );
});

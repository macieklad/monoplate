import { greet } from './index.js';

test('greet returns greeting message', () => {
	expect(greet('World')).toBe('Hello, World!');
});

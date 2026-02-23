import { DebounceTimer } from './debounce-timer';

describe('DebounceTimer', () => {
  it('should create an instance', () => {
    const directive = new DebounceTimer();
    expect(directive).toBeTruthy();
  });
});

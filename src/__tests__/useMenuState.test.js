import { renderHook, act } from '@testing-library/react';
import { useMenuState } from './entry';

describe('useMenuState', () => {
  const onMenuChange = jest.fn();

  test('default props', () => {
    const { result } = renderHook(() => useMenuState());

    expect(result.current[0].state).toBeUndefined();
    act(() => {
      result.current[1]();
    });
    expect(result.current[0].state).toBe('open');
    act(() => {
      result.current[1]();
    });
    expect(result.current[0].state).toBe('closed');
  });

  test('initialMounted', () => {
    const { result } = renderHook(() => useMenuState({ initialMounted: true, onMenuChange }));

    expect(result.current[0].state).toBe('closed');
    act(() => {
      result.current[1]();
    });
    expect(result.current[0].state).toBe('open');
    expect(onMenuChange).toHaveBeenLastCalledWith({ open: true });
    act(() => {
      result.current[1]();
    });
    expect(result.current[0].state).toBe('closed');
    expect(onMenuChange).toHaveBeenLastCalledWith({ open: false });
    expect(onMenuChange).toHaveBeenCalledTimes(2);
  });

  test('transition', () => {
    const { result } = renderHook(() => useMenuState({ transition: true, onMenuChange }));

    expect(result.current[0].state).toBeUndefined();
    act(() => {
      result.current[1]();
    });
    expect(result.current[0].state).toBe('opening');
    expect(onMenuChange).toHaveBeenLastCalledWith({ open: true });
    act(() => {
      result.current[0].endTransition();
    });
    expect(result.current[0].state).toBe('open');
    expect(onMenuChange).toHaveBeenCalledTimes(1);
    act(() => {
      result.current[1]();
    });
    expect(result.current[0].state).toBe('closing');
    expect(onMenuChange).toHaveBeenLastCalledWith({ open: false });
    act(() => {
      result.current[0].endTransition();
    });
    expect(result.current[0].state).toBe('closed');
    expect(onMenuChange).toHaveBeenCalledTimes(2);
  });

  test('unmounting after close transition', () => {
    const { result } = renderHook(() =>
      useMenuState({ transition: { close: true }, unmountOnClose: true, onMenuChange })
    );

    expect(result.current[0].state).toBeUndefined();
    act(() => {
      result.current[1]();
    });
    expect(result.current[0].state).toBe('open');
    expect(onMenuChange).toHaveBeenLastCalledWith({ open: true });
    act(() => {
      result.current[1]();
    });
    expect(result.current[0].state).toBe('closing');
    expect(onMenuChange).toHaveBeenLastCalledWith({ open: false });
    act(() => {
      result.current[0].endTransition();
    });
    expect(result.current[0].state).toBeUndefined();
    expect(onMenuChange).toHaveBeenCalledTimes(2);
  });
});

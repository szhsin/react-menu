import {
    useRef,
    useEffect
} from 'react';
import { safeCall } from './utils';


export const useMenuChange = (onChange, isOpen) => {
    const prevOpen = useRef(isOpen);

    useEffect(() => {
        if (prevOpen.current !== isOpen) safeCall(onChange, { open: isOpen });
        prevOpen.current = isOpen;
    }, [onChange, isOpen]);
}

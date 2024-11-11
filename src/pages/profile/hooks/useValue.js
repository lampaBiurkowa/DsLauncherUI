import { useEffect, useState } from "react";

function useValue(src) {
    const [value, setValue] = useState(null);
    useEffect(() => {
        setValue();
    }, [src]);

    return value;
}

export default useBase64Image;
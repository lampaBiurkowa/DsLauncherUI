import { getBase64FromFile } from "@/services/Utility";
import { useEffect, useState } from "react";

function useBase64ImageCollection(paths, src) {
    const [images, setImages] = useState([]);

    useEffect(() => {
        async function loadImages() {
            if (!paths || paths.length === 0) return;

            const base64Images = await Promise.all(paths.map(async (path) => {
                return await getBase64FromFile(path);
            }));
            setImages(base64Images);
        }

        if (src && paths.length > 0) {
            loadImages();
        }
    }, [src]);

    return images;
}

export default useBase64ImageCollection;

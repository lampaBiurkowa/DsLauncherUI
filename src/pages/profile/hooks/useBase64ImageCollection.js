import { getBase64FromFile } from "@/services/Utility";
import { useEffect, useState } from "react";

function useBase64ImageCollection(paths, src) {
    const [images, setImages] = useState([]);

    useEffect(() => {
        async function loadImages() {
            console.log("yy");
            if (!paths || paths.length === 0) return;

            const base64Images = await Promise.all(paths.map(async (path) => {
                return await getBase64FromFile(path);
            }));
            console.log("sakces");
            setImages(base64Images);
        }

        if (src && paths.length > 0) {
            console.log("ee");
            loadImages();
        }
        console.log("aa");
        console.log(src);
    }, [src]);

    return images;
}

export default useBase64ImageCollection;

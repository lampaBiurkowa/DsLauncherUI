import { getBase64FromFile } from "@/services/Utility";
import { useEffect, useState } from "react";

function useBase64Image(path, src) {
    const [image, setImage] = useState("");
    useEffect(() => {
        async function loadImage() {
            const base64 = await getBase64FromFile(path);
            setImage(base64);
        }

        if (src) {
            loadImage();
        }
    }, [src]);

    return image;
}

export default useBase64Image;
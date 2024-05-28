import { publicPath } from "../App";

function getFilesData(product) {
    let data = {};
    data.Icon = `${publicPath}/${product.guid}/icon.png`;
    data.Background = `${publicPath}/${product.guid}/bg.png`;
    data.Images = [];
    for (let i = 0; i < product.imageCount; i++)
        data.Images[i] = `${publicPath}/${product.guid}/${i + 1}.png`;

    return data;
}

export default getFilesData;
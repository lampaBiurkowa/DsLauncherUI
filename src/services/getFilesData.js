async function getFilesData(productName) {
    let url = `https://raw.githubusercontent.com/DibrySoft/static/master/${productName}/files.json`;
    const response = await fetch(url);
    let data = null;
    try
    {
        data = await response.json();
        data.Icon = `https://raw.githubusercontent.com/DibrySoft/static/master/${productName}/${data.Icon}`;
        data.Background = `https://raw.githubusercontent.com/DibrySoft/static/master/${productName}/${data.Background}`;
        for (let i = 0; i < data.Images.length; i++)
            data.Images[i] = `https://raw.githubusercontent.com/DibrySoft/static/master/${productName}/${data.Images[i]}`;
    }
    catch {}

    return data;
}

export default getFilesData;
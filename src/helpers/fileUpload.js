export const fileUpload = async ( file ) => {
    const cloudUrl = process.env.REACT_APP_cloudUrl;

    const data = new FormData();
    data.append('upload_preset', 'react-journal');
    data.append('file', file);

    try {
        const resp = await fetch( cloudUrl, {
            method: 'POST',
            body: data
        });

        if( resp.ok ){
            const cloudResp = await resp.json();
            return cloudResp.secure_url;
        }else {
            throw await resp.json();
        }
    } catch (error) {
        throw error;
    }
}
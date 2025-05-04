import axios from "axios";


const API_KEY = "09caa40fff1053706114d05a3173a82c"
const imgbbUrl = "https://api.imgbb.com/1/upload";

let imgUrl ;
const allowedTypes = [
        "image/jpeg",
        "image/png",
        "image/bmp",
        "image/gif",
        "image/tiff",
        "image/webp",
        "image/heic",
        "image/avif",
        "application/pdf"
];

export async function getImageURL(imageField,setIsLoading){
    let imgUrl;
    const image = imageField.files[0];
    if(image){
        if (!allowedTypes.includes(image.type)){
            alert("not supported file")
            imageField.value=null;
            return;
        }
        if (image.size > 32 * 1024 * 1024) {
            alert("File is too large. Max size is 32 MB.");
            imageField.value=null;
            return;
        }
        const formData = new FormData();
        formData.append("image", image);
        setIsLoading(true);
        await axios.post(`${imgbbUrl}?expiration=604800&key=${API_KEY}`,formData).then((res)=>{console.log(res),imgUrl=res.data.data.display_url,setIsLoading(false);}).catch((err)=>{console.log(err);setIsLoading(false)})
    }
    return imgUrl;
}
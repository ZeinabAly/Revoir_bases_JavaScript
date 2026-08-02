
export default function handleRequest(request, {successMessage, errorMessage, type}){
    return new Promise((resolve, reject) => {
        request.onsuccess = () => {
            if(type == "delete" || type == "update"){
                resolve({
                    success: true,
                    message: successMessage,
                    data: true,
                });
            }else{
                resolve({
                    success: true,
                    message: successMessage,
                    data: request.result,
                })
            }

        }
        request.onerror = () => {
            console.error(errorMessage, request.error);
            reject(request.error);
        }
    })
}
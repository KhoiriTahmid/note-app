
export const successResponseMaker = (message: string, data:any, page:any=null)=>{
    if (page) {
        return {
            success:true,
            message,
            data,
            page
        }
    }
    return {
        success:true,
        message,
        data,
    }
}


export const errorResponseMaker = (message: string, errors:any)=>{
    return {
        success:false,
        message,
        errors,
    }
}


export interface productFilter{
    key:string;
    title:string;
    price:number;
    category:string;
    imageUrl:string;
    payload:{
       val():{
        title:string; 
       } 
    }
}
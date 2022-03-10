exports.handling = (args,maxs=[],mins=[])=>{
    const erros = Object.keys(args).map((key,index)=>{
       if(!args[key]){
       
           return `Campo ${key} não pode ser vazio!`
       }
       else if(typeof(maxs[index])!="boolean" && String(args[key]).length > maxs[index]){
    
           return `Campo ${key} deve ser menor que ${maxs[index]} caracteres!`
       }
       else if (typeof(mins[index])!="boolean" && String(args[key]).length < mins[index]){

        return `Campo ${key} deve ser mais que ${mins[index]} caracteres!`

       }
       
   }).filter(curr => !!curr)

   return erros
}

exports.validPhoneNumber = (phone)=>{
 
      let phoneno = /^\+?([0-9]{2})\)?[-. ]?([0-9]{5})[-. ]?([0-9]{4})$/;
      if((phone.value.match(phoneno)))
        {
          return true;
        }
        return false;
        
  
}
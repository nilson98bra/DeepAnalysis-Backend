exports.handling = (args,maxs=[],mins=[])=>{
    const erros = Object.keys(args).map((key,index)=>{
       if(!args[key]){
       
           return `Campo ${key} não pode ser vazio!`
       }
       else if(typeof(maxs[index])!="boolean"  && (String(args[key]).length > maxs[index] || String(args[key]).length < mins[index]) && maxs[index]==mins[index]){
        return `Campo ${key} deve ter exatamente ${maxs[index]} caracteres!`
       }
       else if(typeof(maxs[index])!="boolean" && String(args[key]).length > maxs[index]){
    
           return `Campo ${key} deve ter menos que ${maxs[index]} caracteres!`
       }
       else if (typeof(mins[index])!="boolean" && String(args[key]).length < mins[index]){

        return `Campo ${key} deve ter mais que ${mins[index]} caracteres!`

       }
       
   }).filter(curr => !!curr)

   return erros
}

exports.validPhoneNumber = (phone)=>{
  phone = phone.replace("(","")
  phone = phone.replace(")","")
  console.log(phone)
  const regex = /^\(?([0-9]{2})\)?[-. ]?([0-9]{5})[-. ]?([0-9]{4})$/;
  return regex.test(phone)

  
}

exports.validCoordinates = (args) =>{

  const erros = Object.keys(args).map((key)=>{
    switch(key){
      case "lt":
        campoAtual="Topo Esquerda";
        break;
      case "rt":
        campoAtual="Topo Direita";
        break;
      case "lb":
        campoAtual="Esqueda Baixo";
        break;
      case "rb":
        campoAtual="Direita Baixo";
        break;
      }
    
    if(!args[key].coordinates){
      return `Campo '${campoAtual}' não pode ser vazio!`
    }

    else if(isNaN(args[key].coordinates[0])){
      return `Latitude do campo '${campoAtual}' deve ser numérica!`
    }
    else if(isNaN(args[key].coordinates[1])){
      return `Longitude do campo '${campoAtual}' deve ser numérica!`
    }

    else if(args[key].coordinates[0] > 90 || args[key].coordinates[0] < -90){
      return `Latitude do campo '${campoAtual}' está com valor inválido!`
    }
    else if(args[key].coordinates[1] > 180 || args[key].coordinates[1] < -180){
      return `Longitude do campo '${campoAtual}' está com valor inválido!`
    }

    else if(String(args[key].coordinates[0]).split(".")[1].length != 6){
 
      return `Os decimais da latitude do campo '${campoAtual}' deve ter 6 casas!`
    }
    else if(String(args[key].coordinates[1]).split(".")[1].length != 6){
      return `Os decimais da longitude do campo '${campoAtual}' deve ter 6 casas!`
    }

  }).filter(curr => !!curr)

  return erros
}
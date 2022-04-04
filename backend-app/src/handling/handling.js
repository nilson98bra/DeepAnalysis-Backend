exports.validateString = (args,maxs=[],mins=[])=>{
    let erros = Object.keys(args).map((key,index)=>{
      const listErros = []
       if(!args[key]){
       
          listErros.push(`Campo '${key}' não pode ser vazio!`)
       }

       else{
        if(String(args[key]).length != maxs[index] && maxs[index]==mins[index]){    
          listErros.push(`Campo '${key}' deve ter exatamente ${maxs[index]} caracteres!`)
       }
       if(maxs[index]!=mins[index]){
          if( String(args[key]).length > maxs[index]){   
              listErros.push(`Campo '${key}' deve ter menos que ${maxs[index]} caracteres!`)
          }
          if (String(args[key]).length < mins[index]){
            listErros.push(`Campo '${key}' deve ter mais que ${mins[index]} caracteres!`)
          }
       }
       }


       return listErros.length == 0? null : listErros
       
   }).filter(curr => !!curr)
  
   return erros
}

exports.validPhoneNumber = (phone)=>{
  phone = String(phone)
  phone = phone.replace("(","")
  phone = phone.replace(")","")

  const regex = /^\(?([0-9]{2})\)?[-. ]?([0-9]{5})[-. ]?([0-9]{4})$/;
  return regex.test(phone)
}

exports.validateEmail = (email)=>{
  const erros = []
  var regex = /\S+@\S+\.\S+/;
  if(email.length > 40){
    erros.push("O e-mail não pode ter mais que 40 caracteres")
  }
  if(email.length < 16){
    erros.push("O e-mail não pode ter menos que 16 caracteres")
  }
  if(regex.test(email)==false){
    erros.push("O e-mail deve conter os caracteres '@' e '.'")
  }
  return erros;
}

exports.validNumericValues = (args,maxs=[],mins=[])=>{
  
  let erros = Object.keys(args).map((key,index)=>{
    const listErros = []
     if(!args[key]){
     
         listErros.push(`Campo '${key}' não pode ser vazio!`)
     }
     else{
      if(!!isNaN(args[key])){

        listErros.push(`Campo '${key}' deve ser numérico!`)
  
       }
       if(args[key] > maxs[index]){
    
        listErros.push(`Campo '${key}' deve ter menos que ${maxs[index]} caracteres!`)
       }
       if (args[key] < mins[index]){
  
        listErros.push(`Campo '${key}' deve ter mais que ${mins[index]} caracteres!`)
  
       }
     }

     return listErros.length == 0? null : listErros
     
 }).filter(curr => !!curr)

 return erros
}

exports.validCoordinates = (args) =>{

  let erros = Object.keys(args).map((key)=>{
    const listErros = []
    let campoAtual
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
      default:
        campoAtual="coordinate"
        break;
      }
    
    if(!args[key].coordinates){
      listErros.push(`Campo '${campoAtual}' não pode ser vazio!`)
    }
    else{
      if(isNaN(args[key].coordinates[0])){
        listErros.push(`Latitude do campo '${campoAtual}' deve ser numérica!`)
      }
      if(isNaN(args[key].coordinates[1])){
        listErros.push(`Longitude do campo '${campoAtual}' deve ser numérica!`)
      }
  
      if(args[key].coordinates[0] > 90 || args[key].coordinates[0] < -90){
        listErros.push(`Latitude do campo '${campoAtual}' deve estar no intervalode 90 a -90!`)
      }
      if(args[key].coordinates[1] > 180 || args[key].coordinates[1] < -180){
        listErros.push(`Longitude do campo '${campoAtual}' deve estar no intervalo de 180 a -180!`)
      }
  
      if(String(args[key].coordinates[0]).split(".")[1].length < 4){
   
        listErros.push(`Deve ter no mínimo 5 casas decimais na latitude do campo '${campoAtual}'!`)
      }
      if(String(args[key].coordinates[1]).split(".")[1].length < 4){
        listErros.push(`Deve ter no mínimo 5 casas decimais na longitude do campo '${campoAtual}'!`)
      }
    }


    return listErros.length == 0? null : listErros

  }).filter(curr => !!curr)
 
  return erros
}

exports.validBooleanValues = (args)=>{
      let erros = Object.keys(args).map((key,index)=>{
      const listErros = []
       if(!args[key]){
       
          listErros.push(`Campo '${key}' não pode ser vazio!`)
       }else{
        if(typeof(args[key])!="boolean"){    
          listErros.push(`Campo '${key}' deve ter booleano`)
       }
       }

 

       return listErros.length == 0? null : listErros
       
   }).filter(curr => !!curr)
  
   return erros
}
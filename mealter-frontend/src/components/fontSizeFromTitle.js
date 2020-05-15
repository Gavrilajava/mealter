
const fontSizeFromTitle = (title, height, width, lineheiht, startFont) => { 
  const canvas = document.createElement("canvas")
  const context  = canvas.getContext("2d")
  const titleArr = title.split(" ")
  let fontSize = startFont
  let isFit = true
  while (isFit){
    context.font = (fontSize+1) + "px Roboto"
    let lines  = []
    for (let word of titleArr){
      if (context.measureText(word).width > width*0.95){
        isFit = false
      }
      if (lines.length > 0){
        if (context.measureText(lines[lines.length - 1] + " " + word).width <= 350){
          lines[lines.length - 1] = lines[lines.length - 1] + " " + word
        }
        else{
          lines.push(word)
        }
      }
      else{
        lines.push(word)
      }
    }
    if (isFit && ((lines.length * (fontSize+1) * lineheiht) > height)){
      isFit = false
    }
    else{
      fontSize++
    }
    
  }
  
  return fontSize
}





export default fontSizeFromTitle

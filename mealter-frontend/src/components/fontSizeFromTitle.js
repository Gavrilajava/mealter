const wordSize = (word) => {
  const irregular ={
    "i": 0.5,
    'l': 0.5,
    'r': 0.8,
    'm': 1.2,
    'M': 1.2
  }

  let result = word.split("").reduce((size, letter) => {
    if (irregular[letter]){
      size = size + irregular[letter]
      return size
    }
    else{
      size++
      return size
    }
  }, 0)
  return result
}

const countLines = (title, lfactor) => Math.round(title.split('').length/(title.split(' ').length + lfactor))

const maxWordSize = (title) => title.split(" ").reduce((max, word) => wordSize(word) > max ? max = wordSize(word) : max , 0)

const fontSizeFromTitle = (title) => { 
  // constants depending on font
  const sfactor = 36
  const cfactor = 0.2
  const lfactor = 1.8
  let maxFromWordsSize = Math.round(((sfactor / maxWordSize(title)) - cfactor)*10)/10
  let maxFromLinesCount = Math.round(15 * 10 /countLines(title, lfactor))/10
  return `${Math.min(maxFromWordsSize, maxFromLinesCount)*17}px`
}

export default fontSizeFromTitle

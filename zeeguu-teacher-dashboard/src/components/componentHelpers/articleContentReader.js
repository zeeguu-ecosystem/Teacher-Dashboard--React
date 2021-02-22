export const articleContentReader = article => {
    const reader = new FileReader()
    return new Promise((resolve, reject) => {
      reader.onload = function(event) {
        const content = event.target.result
  
        resolve(content)
      }
      reader.onerror = function(e) {
        reject(e)
      }
      reader.readAsText(article)
    })
  }
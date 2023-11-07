import { Dispatch, SetStateAction } from 'react'

export const useRenderImages = () => {
  const onChangeRenderImgs = (
    event: React.ChangeEvent<HTMLInputElement>,
    setFiles: Dispatch<SetStateAction<File[]>>,
    setImagesSrc: Dispatch<SetStateAction<string[]>>
  ) => {
    const filesArr = event.target.files
    if (filesArr) setFiles((prev: File[]) => [...prev, ...Array.from(filesArr)])

    if (filesArr) {
      let fileReaderPromises: any[] = []
      let newSelectedFiles = []
      for (let i = 0; i < filesArr.length; i++) {
        newSelectedFiles.push(filesArr[i])
        fileReaderPromises.push(readAsDataURL(filesArr[i]))
      }

      Promise.all(fileReaderPromises).then((newImagesSrc: ArrayBuffer[]) => {
        const newImg = newImagesSrc.map((img: ArrayBuffer) => img.toString())
        setImagesSrc((prev: string[]) => [...prev, ...newImg])
      })
    } else {
      setImagesSrc([])
    }
  }

  function readAsDataURL(file: Blob) {
    return new Promise((resolve, reject) => {
      var reader = new FileReader()
      reader.onload = function ({ target }) {
        resolve(target?.result)
      }
      reader.readAsDataURL(file)
    })
  }
  return { onChangeRenderImgs }
}

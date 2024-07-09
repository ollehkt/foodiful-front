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
  const onChangeRenderImg = (
    event: React.ChangeEvent<HTMLInputElement>,
    setFile: Dispatch<SetStateAction<File | null>>,
    setImageSrc: Dispatch<SetStateAction<string | null>>
  ) => {
    const file = event.target.files?.[0]
    if (file) {
      setFile(file)
      readAsDataURL(file).then((imageSrc: unknown) => {
        if (typeof imageSrc === 'string' || imageSrc instanceof String) {
          setImageSrc(imageSrc.toString())
        }
      })
    } else {
      setFile(null)
      setImageSrc(null)
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
  return { onChangeRenderImgs, onChangeRenderImg }
}

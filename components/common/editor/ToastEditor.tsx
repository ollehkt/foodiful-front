import React, { Dispatch, SetStateAction, useRef } from 'react'
import '@toast-ui/editor/dist/toastui-editor.css'
import { Editor } from '@toast-ui/react-editor'
import colorSyntax from '@toast-ui/editor-plugin-color-syntax'
import 'tui-color-picker/dist/tui-color-picker.css'
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css'
import '@toast-ui/editor/dist/i18n/ko-kr'
import { useGetPresignedUrl } from '../hooks/useGetPresignedUrl'
import { ProductType } from '../../../types/productTypes'

type HookCallback = (url: string, text?: string) => void

interface PropsType {
  product: ProductType
  setProduct: Dispatch<SetStateAction<ProductType>>
}

const ToastEditor = ({ product, setProduct }: PropsType) => {
  const { getPresignedUrlByFiles } = useGetPresignedUrl()
  const editorRef = useRef<Editor>(null)

  const onUploadImage = async (blob: File | Blob, cb: HookCallback) => {
    const url = await getPresignedUrlByFiles([blob], 'product')
    if (url) cb(url[0], '업로드 된 이미지')
  }

  let timer: NodeJS.Timer
  const onChangeText = () => {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      const data = editorRef.current?.getInstance().getHTML()
      if (data) setProduct({ ...product, description: data })
    }, 1500)
  }
  return (
    <Editor
      ref={editorRef}
      initialValue="여기에 사진을 포함한 상품 설명을 입력하면 됩니다."
      previewStyle="vertical"
      height="600px"
      initialEditType="wysiwyg"
      hideModeSwitch={true}
      plugins={[colorSyntax]}
      onChange={onChangeText}
      language="ko-KR"
      hooks={{ addImageBlobHook: onUploadImage }}
    />
  )
}

export default ToastEditor

import React, { Dispatch, SetStateAction, useRef } from 'react'
import '@toast-ui/editor/dist/toastui-editor.css'
import { Editor } from '@toast-ui/react-editor'
import colorSyntax from '@toast-ui/editor-plugin-color-syntax'
import 'tui-color-picker/dist/tui-color-picker.css'
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css'
import '@toast-ui/editor/dist/i18n/ko-kr'
import { useGetPresignedUrl } from '../hooks/useGetPresignedUrl'
import { ProductType } from '../../product/types/productTypes'
import { LectureType } from '../../lecture/types/lectureTypes'

type HookCallback = (url: string, text?: string) => void

interface PropsType {
  content: ProductType | Omit<LectureType, 'id'>
  setContent:
    | Dispatch<SetStateAction<ProductType>>
    | Dispatch<SetStateAction<Omit<LectureType, 'id'>>>
  bucket: string
}

const ToastEditor = ({ content, setContent, bucket }: PropsType) => {
  const { getPresignedUrlByFiles } = useGetPresignedUrl()
  const editorRef = useRef<Editor>(null)

  const onUploadImage = async (blob: File | Blob, cb: HookCallback) => {
    const url = await getPresignedUrlByFiles([blob], bucket)
    if (url) cb(url[0], '업로드 된 이미지')
  }

  let timer: NodeJS.Timer
  const onChangeText = () => {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      const data = editorRef.current?.getInstance().getHTML()
      if (data) setContent((prev: any) => ({ ...prev, description: data }))
    }, 1500)
  }
  const changeATag = () => {
    if (editorRef.current) {
      const html = editorRef.current?.getInstance().getEditorElements()
      const aTags = html.wwEditor.querySelectorAll('a')
      aTags.forEach((tag) => {
        tag.setAttribute('rel', 'noReferrer')
        tag.setAttribute('target', '_blank')
      })
    }
  }

  return (
    <Editor
      ref={editorRef}
      initialValue={`${
        content ? content.description : '여기에 사진을 포함한 모든 설명을 입력하면 됩니다.'
      }`}
      previewStyle="vertical"
      height="600px"
      initialEditType="wysiwyg"
      hideModeSwitch={true}
      plugins={[colorSyntax]}
      onChange={onChangeText}
      language="ko-KR"
      hooks={{ addImageBlobHook: onUploadImage }}
      onBlur={changeATag}
    />
  )
}

export default ToastEditor

// @flow
import * as React from "react"
import { RefObject } from "react"

type Props = {
  handleFileChange:(event: React.ChangeEvent<HTMLInputElement>)=>void,
  fileInputRef:RefObject<HTMLInputElement>
};

export const InputTypeFile = ({handleFileChange,fileInputRef}: Props) => {
  return (
    <input
      type="file"
      accept=".jpg,.jpeg,.png"
      onChange={handleFileChange}
      ref={fileInputRef}
      style={{ display: "none" }} // Скрываем элемент input
      multiple
    />
  )
}
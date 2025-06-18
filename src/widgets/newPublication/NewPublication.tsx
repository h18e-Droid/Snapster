"use client"
import { useRef, useState } from "react"
import "./newPublication.scss"
import { ImageOutlineIcon } from "@/shared/assets/icons/components/ImageOutlineIcon"
import { ButtonsGroup } from "@/widgets/newPublication/ButtonsGroup"
import { HeaderOnThePost } from "@/widgets/newPublication/header/HeaderOnThePost"
import { ImagePreview } from "@/widgets/newPublication/ImagePreview"
import { PublicationPages } from "@/widgets/newPublication/PublicationPages"
import { ModalFix } from "@/widgets/newPublication/windows/modalFix/Modal"
import { CardsFix } from "@/widgets/newPublication/windows/cardsFix/Card"
import { Confirmation } from "@/widgets/newPublication/Confirmation"

const NewPublication = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(true)
  const [selectedFiles, setSelectedFiles] = useState<Array<File>>([])
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const [isPreviewOpen, setIsPreviewOpen] = useState<boolean>(false)
  const [newPost, setNewPost] = useState(false)
  const [currentIndex, setCurrentIndex] = useState<number>(0)
  const [showConfirmation, setShowConfirmation] = useState(false)

  const NextStageHandler = () => {
    setNewPost(true)
    setIsPreviewOpen(false)
  }

  // const handleCloseModal = () => {
  //
  //   setShowConfirmation(true);
  //   console.log("closeModal")
  //
  //   setIsModalOpen(false)
  //   setSelectedFiles([])
  //   setIsPreviewOpen(false)
  // }

  const handleCloseModal = () => {
    setShowConfirmation(true)
    console.log("closeModal")
  }

  const handleBackToFersPage = () => {
    setSelectedFiles([])
    setIsPreviewOpen(false)
  }

  const handleBackToSecondPage = () => {
    setIsPreviewOpen(false)
    setNewPost(false)
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (files) {
      const selectedFilesArray = Array.from(files)
      if (selectedFilesArray.length + selectedFiles.length <= 10) {
        setSelectedFiles((prev) => [...prev, ...selectedFilesArray])
        setCurrentIndex(selectedFiles.length) // Установите индекс на последний выбранный файл
      } else {
        alert("Можно выбрать до 10 фотографий.")
      }
    }
  }

  const addFileFoo = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  const handleAddPhotosClick = () => {
    if (!isPreviewOpen) {
      setIsPreviewOpen(true)
    }
  }

  const handleRemoveFile = (index: number) => {
    setSelectedFiles((prev) => {
      const updatedFiles = prev.filter((_, i) => i !== index)
      // Проверяем, остались ли файлы
      if (updatedFiles.length === 0) setIsPreviewOpen(false)
      return updatedFiles
    })
  }

  const handleNextImage = () => {
    if (currentIndex < selectedFiles.length - 1) setCurrentIndex(currentIndex + 1)
  }

  const handlePrevImage = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1)
  }

  const imageUrl = selectedFiles.length > 0 ? URL.createObjectURL(selectedFiles[currentIndex]) : ""

  return (
    <div className={"modalWrapper"}>
      {showConfirmation && (
        <Confirmation
          onConfirm={() => {
            setIsModalOpen(false)
            setSelectedFiles([])
            setIsPreviewOpen(false)
            setShowConfirmation(false)
          }}
          onCancel={() => setShowConfirmation(false)}
        />
      )}
      {newPost ? (
        <PublicationPages
          handleCloseModal={handleCloseModal}
          selectedFiles={selectedFiles}
          handleBackToSecondPage={handleBackToSecondPage}
        />
      ) : (
        <ModalFix
          classNameContent={"change-for-newPublication"}
          title=""
          active={isModalOpen}
          setActive={handleCloseModal}
        >
          <HeaderOnThePost
            selectedFiles={selectedFiles}
            handleCloseModal={handleCloseModal}
            handleBack={handleBackToFersPage}
            NextStageHandler={NextStageHandler}
          />
          <div className="divider"></div>

          {selectedFiles.length > 0 ? (
            <>
              <ImagePreview
                imageUrl={imageUrl}
                handleAddPhotosClick={handleAddPhotosClick}
                noImage={true}
                handleNextImage={handleNextImage} // Передаем функции
                handlePrevImage={handlePrevImage} // Передаем функции
                currentIndex={currentIndex} // Передаем текущий индекс
                totalImages={selectedFiles.length} // Передаем общее количество изображений
                selectedFiles={selectedFiles}
                handleRemoveFile={handleRemoveFile}
                addFileFoo={addFileFoo}
                isPreviewOpen={isPreviewOpen}
              />
            </>
          ) : (
            <CardsFix title="" classNameContent={"content-special"} classNameContainer={"container-special"}>
              <ImageOutlineIcon />
            </CardsFix>
          )}

          <input
            type="file"
            accept=".jpg,.jpeg,.png"
            onChange={handleFileChange}
            ref={fileInputRef}
            style={{ display: "none" }} // Скрываем элемент input
            multiple
          />
          {selectedFiles.length === 0 && <ButtonsGroup addFileFoo={addFileFoo} />}
        </ModalFix>
      )}
    </div>
  )
}

export default NewPublication
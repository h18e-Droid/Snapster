import { ImagePreview } from "@/widgets/newPublication/ImagePreview"
import { useState } from "react"
import { Input } from "@/shared/ui/input"
import { TextArea } from "@/shared/ui/textArea"
// import Profile from "@/views/profile/Profile"
import { ModalFix } from "@/widgets/newPublication/windows/modalFix/Modal"

type Props = {
  handleCloseModal: () => void
  selectedFiles: File[]
  handleBackToSecondPage: () => void
}

export const PublicationPages = ({ handleCloseModal, selectedFiles: initialFiles, handleBackToSecondPage }: Props) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0)
  const [location, setLocation] = useState<string>("") // Состояние для ввода локации
  const [selectedFiles, setSelectedFiles] = useState<File[]>(initialFiles)
  const [isPreviewOpen, setIsPreviewOpen] = useState(false)

  const handleRemoveFile = (index: number) => {
    const newFiles = [...selectedFiles]
    newFiles.splice(index, 1)
    setSelectedFiles(newFiles)

    // Корректируем currentIndex если удалили текущий или предыдущий файл
    if (index <= currentIndex) {
      setCurrentIndex(Math.max(0, currentIndex - 1))
    }
  }

  const addFileFoo = () => {
    // Здесь можно добавить логику для добавления новых файлов
    // Например, открыть диалог выбора файлов
    // Для примера просто закроем превью
    setIsPreviewOpen(false)
  }

  const togglePreview = () => {
    setIsPreviewOpen(!isPreviewOpen)
  }

  const handleNextImage = () => {
    if (currentIndex < selectedFiles.length - 1) {
      setCurrentIndex(currentIndex + 1)
    }
  }

  const handlePrevImage = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
    }
  }

  const imageUrl = selectedFiles.length > 0 ? URL.createObjectURL(selectedFiles[currentIndex]) : ""

  const handleLocationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    setLocation(value)
  }

  return (
    <ModalFix active={true} setActive={handleCloseModal} title="" classNameContent={"publication-pages"}>
      <div className="modal-header">
        <button className={"backBtn"} onClick={handleBackToSecondPage}>
          <svg width="7" height="14" viewBox="0 0 7 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M5.83016 14.0003C5.68077 14.0008 5.53316 13.9678 5.39818 13.9038C5.2632 13.8398 5.14428 13.7463 5.05016 13.6303L0.220164 7.63028C0.073082 7.45134 -0.00732422 7.2269 -0.00732422 6.99528C-0.00732422 6.76365 0.073082 6.53921 0.220164 6.36028L5.22016 0.360276C5.3899 0.156059 5.63381 0.0276347 5.89824 0.00325494C6.16267 -0.0211248 6.42595 0.0605371 6.63016 0.230276C6.83438 0.400014 6.9628 0.643926 6.98718 0.908352C7.01156 1.17278 6.9299 1.43606 6.76016 1.64028L2.29016 7.00028L6.61016 12.3603C6.73245 12.5071 6.81012 12.6858 6.834 12.8753C6.85788 13.0649 6.82697 13.2573 6.74491 13.4299C6.66285 13.6024 6.53309 13.7478 6.37098 13.8489C6.20887 13.95 6.0212 14.0025 5.83016 14.0003Z"
              fill="white"
            />
          </svg>
        </button>
        <h2>Publication</h2>
        <button className={"nextBtn"} onClick={() => {}}>
          Publish
        </button>
      </div>
      <div className="divider"></div>
      <div className="publish-content">
        <div className="left">
          {selectedFiles.length > 0 ? (
            <ImagePreview
              noImage={false}
              handleAddPhotosClick={togglePreview}
              imageUrl={imageUrl}
              handleNextImage={handleNextImage}
              handlePrevImage={handlePrevImage}
              currentIndex={currentIndex}
              totalImages={selectedFiles.length}
              isPreviewOpen={isPreviewOpen}
              selectedFiles={selectedFiles}
              handleRemoveFile={handleRemoveFile}
              addFileFoo={addFileFoo}
            />
          ) : (
            <p>No images selected.</p>
          )}
        </div>
        <div className="right">
          <div className="top">
            {/*<Profile/>*/}
            <div style={{ width: "433px", height: "60px", position: "relative", margin: "24px" }}>
              <TextArea title={"Add publication descriptions"} width={433} height={120} />
            </div>
          </div>
          <div className="divider"></div>

          <div className="bottom">
            <div style={{ width: "433px", height: "60px", position: "relative", margin: "24px" }}>
              <Input
                type={"text"}
                placeholder={"add location"}
                label={"Add location"}
                value={location}
                onChange={handleLocationChange}
              />
            </div>
          </div>
        </div>
      </div>
    </ModalFix>
  )
}

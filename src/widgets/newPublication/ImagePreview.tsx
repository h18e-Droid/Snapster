import "./newPublication.scss"
import { AddImageButton } from "@/widgets/newPublication/AddImageButton"
import { PopupWindow } from "@/widgets/newPublication/PopupWindow"

type Props = {
  imageUrl: string
  handleAddPhotosClick: () => void
  noImage?: boolean
  //---------------
  handleNextImage: () => void
  handlePrevImage: () => void
  currentIndex: number
  totalImages: number
  //----
  isPreviewOpen?: boolean
  selectedFiles: Array<File>
  handleRemoveFile: (index: number) => void
  addFileFoo: () => void
}

export const ImagePreview = ({
  noImage,
  imageUrl,
  handleAddPhotosClick,
  handleNextImage,
  handlePrevImage,
  currentIndex,
  totalImages,
  isPreviewOpen,
  selectedFiles,
  handleRemoveFile,
  addFileFoo
}: Props) => {
  return (
    <div style={{ display: "flex", width: "100%", height: "100%", position: "relative" }}>
      <button className={"leftBtn"} onClick={handlePrevImage} disabled={currentIndex === 0}>
        <svg width="7" height="14" viewBox="0 0 7 14" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M5.83016 13.9998C5.68077 14.0003 5.53316 13.9673 5.39818 13.9033C5.2632 13.8393 5.14428 13.7458 5.05016 13.6298L0.220164 7.62979C0.073082 7.45085 -0.00732422 7.22641 -0.00732422 6.99479C-0.00732422 6.76316 0.073082 6.53872 0.220164 6.35979L5.22016 0.359788C5.3899 0.155571 5.63381 0.0271464 5.89824 0.00276666C6.16267 -0.0216131 6.42595 0.0600488 6.63016 0.229787C6.83438 0.399526 6.9628 0.643437 6.98718 0.907864C7.01156 1.17229 6.9299 1.43557 6.76016 1.63979L2.29016 6.99979L6.61016 12.3598C6.73245 12.5066 6.81012 12.6853 6.834 12.8749C6.85788 13.0644 6.82697 13.2568 6.74491 13.4294C6.66285 13.6019 6.53309 13.7473 6.37098 13.8484C6.20887 13.9495 6.0212 14.002 5.83016 13.9998Z"
            fill="white"
          />
        </svg>
      </button>
      <img src={imageUrl} alt="Selected" style={{ width: "100%", height: "100%", objectFit: "fill" }} />
      <button className={"rightBtn"} onClick={handleNextImage} disabled={currentIndex === totalImages - 1}>
        <svg width="7" height="14" viewBox="0 0 7 14" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M1.16984 0.000213623C1.31923 -0.000286377 1.46684 0.0327137 1.60182 0.0967137C1.7368 0.160713 1.85572 0.254213 1.94984 0.370213L6.77984 6.37021C6.92692 6.54915 7.00732 6.77359 7.00732 7.00521C7.00732 7.23684 6.92692 7.46028 6.77984 7.63921L1.77984 13.6392C1.6101 13.8434 1.36619 13.9718 1.10176 13.9972C0.83733 14.0226 0.57405 13.9409 0.36984 13.7712C0.16562 13.6015 0.0372 13.3576 0.01282 13.0932C-0.01256 12.8288 0.06854 12.5655 0.23828 12.3612L4.29016 7.00021L0.970164 1.64021C0.847855 1.49349 0.770182 1.3147 0.7463 1.12522C0.722417 0.935737 0.804081 0.743337 0.97384 0.539139C1.1436 0.334941 1.36488 0.000213623 1.16984 0.000213623Z"
            fill="white"
          />
        </svg>
      </button>

      {noImage ? <AddImageButton handleAddPhotosClick={handleAddPhotosClick} /> : null}

      {totalImages > 1 && ( // Условие для отображения индикатора только если больше одной точки
        <div
          className="imageIndicator"
          style={{
            position: "absolute",
            height: "24px",
            top: "90%",
            left: "50%",
            transform: "translateX(-50%)",
            opacity: 0.5,
            borderRadius: "2px",
            backgroundColor: "#000",
            display: "flex",
            alignItems: "center",
            padding: "0 8px", // Отступы по бокам
          }}
        >
          {Array.from({ length: totalImages }).map((_, index) => (
            <div
              key={index}
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                backgroundColor: index === currentIndex ? "#397DF6" : "#FFFFFF",
                margin: "0 6px", // Расстояние между точками
              }}
            />
          ))}
        </div>
      )}

      {isPreviewOpen && (
        <PopupWindow selectedFiles={selectedFiles} handleRemoveFile={handleRemoveFile} addFileFoo={addFileFoo} />
      )}
    </div>
  )
}

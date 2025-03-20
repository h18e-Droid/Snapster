import { IconProps, IconWrapper } from "@/app/assets/icons/iconWrapper"

export const ArrowDown = (allProps: IconProps) => {
  const { svgProps: props, ...restProps } = allProps

  return (
    <IconWrapper
      icon={
        <svg
          fill={"none"}
          height={"100%"}
          viewBox={"0 0 24 24"}
          width={"100%"}
          xmlns={"http://www.w3.org/2000/svg"}
          {...props}
        >
          <g clipPath={"url(#clip0_5661_1754)"}>
            <path
              d={
                "M5.51414 9.45842C5.51369 9.22477 5.59506 8.99834 5.74414 8.81842C5.82809 8.71717 5.93119 8.63346 6.04754 8.57211C6.16389 8.51076 6.29119 8.47296 6.42217 8.46089C6.55315 8.44881 6.68522 8.46269 6.81082 8.50174C6.93643 8.54078 7.05309 8.60422 7.15414 8.68842L12.5141 13.1684L17.8841 8.84843C17.9864 8.76536 18.1041 8.70333 18.2305 8.6659C18.3568 8.62846 18.4893 8.61637 18.6203 8.63031C18.7514 8.64425 18.8783 8.68395 18.994 8.74712C19.1096 8.81029 19.2116 8.8957 19.2941 8.99843C19.3852 9.10189 19.4538 9.22306 19.4958 9.35432C19.5378 9.48558 19.5522 9.62411 19.5381 9.7612C19.5241 9.89829 19.4818 10.031 19.414 10.151C19.3462 10.271 19.2543 10.3756 19.1441 10.4584L13.1441 15.2884C12.9652 15.4355 12.7408 15.5159 12.5091 15.5159C12.2775 15.5159 12.0531 15.4355 11.8741 15.2884L5.87414 10.2884C5.75313 10.1881 5.65746 10.0607 5.59491 9.91646C5.53236 9.77225 5.50469 9.61533 5.51414 9.45842Z"
              }
              fill={"currentColor"}
            />
          </g>
          <defs>
            <clipPath id={"clip0_5661_1754"}>
              <rect fill={"white"} height={"24"} width={"24"} />
            </clipPath>
          </defs>
        </svg>
      }
      {...restProps}
    />
  )
}

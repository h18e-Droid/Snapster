import { IconProps, IconWrapper } from "@/app/assets/icons/IconWrapper"

export const ImageIcon = (allProps: IconProps) => {
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
          <g clipPath="url(#clip0_306_4276)">
            <path
              d="M18 3H6C5.20435 3 4.44129 3.31607 3.87868 3.87868C3.31607 4.44129 3 5.20435 3 6V18C3 18.7956 3.31607 19.5587 3.87868 20.1213C4.44129 20.6839 5.20435 21 6 21H18C18.7956 21 19.5587 20.6839 20.1213 20.1213C20.6839 19.5587 21 18.7956 21 18V6C21 5.20435 20.6839 4.44129 20.1213 3.87868C19.5587 3.31607 18.7956 3 18 3ZM6 5H18C18.2652 5 18.5196 5.10536 18.7071 5.29289C18.8946 5.48043 19 5.73478 19 6V14.36L15.8 11.63C15.3042 11.222 14.6821 10.999 14.04 10.999C13.3979 10.999 12.7758 11.222 12.28 11.63L5 17.7V6C5 5.73478 5.10536 5.48043 5.29289 5.29289C5.48043 5.10536 5.73478 5 6 5Z"
              fill={"currentColor"}
            />
            <path
              d="M8 10C8.82843 10 9.5 9.32843 9.5 8.5C9.5 7.67157 8.82843 7 8 7C7.17157 7 6.5 7.67157 6.5 8.5C6.5 9.32843 7.17157 10 8 10Z"
              fill={"currentColor"}
            />
          </g>
          <defs>
            <clipPath id="clip0_306_4276">
              <rect width="24" height="24" fill="white" />
            </clipPath>
          </defs>
        </svg>
      }
      {...restProps}
    />
  )
}

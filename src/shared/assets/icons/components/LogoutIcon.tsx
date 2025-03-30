import { IconProps, IconWrapper } from "@/shared/assets/icons/IconWrapper"

export const LogoutIcon = (allProps: IconProps) => {
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
          <g clipPath="url(#clip0_301_3590)">
            <path id="Vector"
                  d="M7 6C7.26 6 7.51 5.89 7.7 5.7C7.89 5.51 8 5.26 8 5C8 4.73 7.89 4.48 7.7 4.29C7.51 4.1 7.26 4 7 4L5 4C4.73 4 4.48 4.1 4.29 4.29C4.1 4.48 4 4.73 4 5L4 19C4 19.26 4.1 19.51 4.29 19.7C4.48 19.89 4.73 20 5 20L7 20C7.26 20 7.51 19.89 7.7 19.7C7.89 19.51 8 19.26 8 19C8 18.73 7.89 18.48 7.7 18.29C7.51 18.1 7.26 18 7 18L6 18L6 6L7 6Z"
                  fill="#FFFFFF"  />
            <path id="Vector"
                  d="M20.82 11.41L18 7.41C17.84 7.2 17.61 7.05 17.35 7.01C17.09 6.96 16.82 7.02 16.61 7.17C16.5 7.25 16.4 7.35 16.33 7.46C16.26 7.57 16.22 7.69 16.19 7.82C16.17 7.96 16.17 8.09 16.2 8.22C16.23 8.35 16.29 8.47 16.37 8.57L18.09 11L10 11C9.73 11 9.48 11.1 9.29 11.29C9.1 11.48 9 11.73 9 12C9 12.26 9.1 12.51 9.29 12.7C9.48 12.89 9.73 13 10 13L18 13L16.2 15.39C16.12 15.5 16.06 15.62 16.03 15.75C15.99 15.87 15.99 16.01 16.01 16.14C16.02 16.27 16.07 16.39 16.13 16.5C16.2 16.62 16.29 16.72 16.4 16.79C16.57 16.92 16.78 17 17 17C17.15 17 17.3 16.96 17.44 16.89C17.58 16.82 17.7 16.72 17.79 16.59L20.8 12.59C20.92 12.43 20.99 12.22 21 12.01C21 11.8 20.94 11.59 20.82 11.41Z"
                  fill="#FFFFFF"  />
          </g>
          <defs>
            <clipPath id="clip0_301_3590">
              <rect width="24" height="24" fill="white" />
            </clipPath>
          </defs>
        </svg>
      }
      {...restProps}
    />
  )
}

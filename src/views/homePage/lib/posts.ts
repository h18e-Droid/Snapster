import image from "@/public/avatar.svg"

export const usersPosts = [
  {
    id: "123123",
    userName: "test1",
    avatar: image,
    desc: "Lorem ipsum dolor sit amet sdf sdfsdf, sfdfsdf consectetur adinvnpis  sdfsdf, sfdfsdf conscing elit, sed do eisdf s susmodsd inct amet sdf sdfsdf, sfdfsdf consectetur adinvnpis  sdfsdf, sfdfsdf conscing elit, sed do eisdf s susmodsd inc t amet sdf sdfsdf, sfdfsdf consectetur adinvnpis  sdfsdf, sfdfsdf conscing elit, sed do eisdf s susmodsd inc zs",
    posts: [
      { id: "123456", photos: [image, image] },
      { id: "123", photos: [image] },
    ],
  },
  {
    id: "6754",
    avatar: image,
    userName: "2test",
    desc: "Lorem ipsum dolor sit amet sdf sdfsdf, sfdfsdf consectetur  sfdfsdf c adinvnpiscing eli etur  sfdfsdf c adinvnpisci etur  sfdfsdf c adinvnpiscit, sed do ei susmodsd inc",
    posts: [{ id: "132454", photos: [image, image] }],
  },
  {
    id: "34534",
    avatar: image,
    userName: "test3",
    desc: "Lorem ipsum dolor sit amet sdf sdfsdf, sfdfsdf consectetur adinvnpiscing elit, sed do ei susmodsd inc sit amet sdf sdfsdf, sfdfsdf consectetu  sit amet sdf sdfsdf, sfdfsdf consectetu v",
    posts: [{ id: "254366", photos: [image] }],
  },
  {
    id: "9878657",
    avatar: image,
    userName: "4test",
    desc: "Lorem ipsum dolor sit amet sdf sdfsdf, sfdfsdf consectetur adinvnpiscing elit, sed do ei susmodsd inc",
    posts: [
      { id: "2345", photos: [image, image] },
      { id: "2345", photos: [image, image, image] },
      { id: "675463", photos: [image] },
    ],
  },
] as const

export type user = (typeof usersPosts)[number]

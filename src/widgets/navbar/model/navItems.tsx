import {
  BookmarkIcon,
  BookmarkOutlineIcon,
  HomeIcon,
  HomeOutlineIcon,
  LogoutIcon,
  MessageIcon,
  MessageOutlineIcon,
  PersonIcon,
  PersonOutlineIcon,
  PlusSquareIcon,
  PlusSquareOutlineIcon,
  SearchIcon,
  TrendingUpIcon,
} from "@/shared/assets/icons"
import React from "react"
import { appRoutes } from "@/shared/lib/routes"

export const items = [
  {
    id: 1,
    title: "Home",
    icon: [<HomeIcon key="filled" />, <HomeOutlineIcon key="outline" />],
    link: appRoutes.home,
  },
  {
    id: 2,
    title: "Create",
    icon: [<PlusSquareIcon key="filled" />, <PlusSquareOutlineIcon key="outline" />],
    link: "",
  },
  {
    id: 3,
    title: "My Profile",
    icon: [<PersonIcon key="filled" />, <PersonOutlineIcon key="outline" />],
    link: "",
  },
  { id: 4, title: "Messenger", icon: [<MessageIcon key="filled" />, <MessageOutlineIcon key="outline" />], link: "" },
  { id: 5, title: "Search", icon: [<SearchIcon key="filled" />, <SearchIcon key="outline" />], link: "" },
  { id: 6, title: "Statistics", icon: [<TrendingUpIcon key="filled" />, <TrendingUpIcon key="outline" />], link: "" },
  {
    id: 7,
    title: "Favorites",
    icon: [<BookmarkIcon key="filled" />, <BookmarkOutlineIcon key="outline" />],
    link: "",
  },
  { id: 8, title: "Log Out", icon: [<LogoutIcon key="filled" />, <LogoutIcon key="outline" />], link: "" },
]

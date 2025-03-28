"use client"
import React, { useState } from "react"
import styles from "./SideBar.module.scss"
import { HomeIcon } from "@/shared/assets/icons/components/HomeIcon"
import { PlusSquareOutlineIcon } from "@/shared/assets/icons/components/PlusSquareOutlineIcon"
import { PersonIcon } from "@/shared/assets/icons/components/PersonIcon"
import { MessageOutlineIcon } from "@/shared/assets/icons/components/MessageOutlineIcon"
import { SearchIcon } from "@/shared/assets/icons/components/SearchIcon"
import { TrendingUpIcon } from "@/shared/assets/icons/components/TrendingUpIcon"
import { BookmarkOutlineIcon } from "@/shared/assets/icons/components/BookmarkOutlineIcon"
import { LogoutIcon } from "@/shared/assets/icons/components/LogoutIcon"
import { HomeOutlineIcon } from "@/shared/assets/icons/components/HomeOutlineIcon"
import { PlusSquareIcon } from "@/shared/assets/icons/components/PlusSquareIcon"
import { PersonOutlineIcon } from "@/shared/assets/icons/components/PersonOutlineIcon"
import { MessageIcon } from "@/shared/assets/icons/components/MessageIcon"
import { BookmarkIcon } from "@/shared/assets/icons/components/BookmarkIcon"



 type TypeItem = {
  id: number | string
  title: string
  icon: React.ReactNode[]
  link: string
}

const SideBar = () => {
  const items = [
    { id: 1, title: "Home", icon: [<HomeIcon />, <HomeOutlineIcon />], link: "" },
    { id: 2, title: "Create", icon:[<PlusSquareIcon/>, <PlusSquareOutlineIcon />], link: "" },
    { id: 3, title: "My Profile", icon: [<PersonIcon  />, <PersonOutlineIcon/>], link: "" },
    { id: 4, title: "Messenger", icon: [<MessageIcon/>,<MessageOutlineIcon  />], link: "" },
    { id: 5, title: "Search", icon:[ <SearchIcon  />, <SearchIcon/>], link: "" },
    { id: 6, title: "Statistics", icon: [ <TrendingUpIcon/>,<TrendingUpIcon/>], link: "" },
    { id: 7, title: "Favorites", icon:[ <BookmarkIcon/>,<BookmarkOutlineIcon/>], link: "" },
    { id: 8, title: "Log Out", icon:[ <LogoutIcon />, <LogoutIcon />], link: "" }
  ]

  const [isActive, setIsActive] = useState<Record<string | number, boolean>>({})

  const handleMouseDown = (id:number | string) => {
    setIsActive((prev) => ({ ...prev, [id]: true }));
  }

  const handleMouseUp = (id:number | string) => {
    setIsActive((prev) => ({ ...prev, [id]: false }));
  }

  return (
    <nav className={styles.wrapper}>
      <ul className={styles.listContainer}>
        {items.map((item: TypeItem) => (
          <div  className={item.id === 6 ? styles.itemStatistic : item.id === 7 ? styles.itemFavorite : styles.item}>
            <li className={styles.listItem} key={item.id}>
              <a href={item.link} className={styles.listItem}
                 onMouseDown={()=>handleMouseDown(item.id)}
                 onMouseUp={()=>handleMouseUp(item.id)}
              >
                {isActive[item.id] ?
                  <span className={styles.itemIcon}>
                    {item.icon[0]}
                  </span>
                  :
                  <span className={styles.itemIcon}
                        >{item.icon[1]}</span>}
                <span className={styles.titleIcon}>{item.title}</span>
              </a>
            </li>
          </div>
        ))}
      </ul>
    </nav>
  )
}

export default SideBar

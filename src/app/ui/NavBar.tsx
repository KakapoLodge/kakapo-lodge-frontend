"use client";
import Image from "next/image";
import styled from "styled-components";
import BookDirectButton from "./BookDirectButton";
import { usePathname } from "next/navigation";
import CustomLink from "./CustomLink";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

type Page = {
  name: string;
  path: string;
  target: string;
};

const SUB_PAGES: Page[] = [
  { name: "Accommodation", path: "/accommodation", target: "_self" },
  { name: "Facilities", path: "/facilities", target: "_self" },
  {
    name: "Attractions",
    path: "https://visithanmersprings.co.nz/things-to-do/",
    target: "_blank",
  },
  { name: "Contact", path: "/contact", target: "_self" },
];

const MOBILE_MAX_WIDTH = 800;

const NavBar = () => {
  const pathname = usePathname();

  const isMobile = document.documentElement.clientWidth < MOBILE_MAX_WIDTH;

  const [showMenu, setShowMenu] = useState(!isMobile);
  const toggleMenu = () => setShowMenu(!showMenu);
  const closeMenu = () => setShowMenu(false);

  return (
    <TopBar>
      <PreMenu>
        <CustomLink href="/" isSelected={pathname === "/"} onClick={closeMenu}>
          <Logo
            src={"/kakapo_logo_with_text.png"}
            alt="Kakapo logo with text"
            width={2963}
            height={1278}
          />
        </CustomLink>

        {isMobile ? <MenuButton icon={faBars} onClick={toggleMenu} /> : <></>}
      </PreMenu>

      <MainNav showMenu={showMenu}>
        <MainMenu>
          {SUB_PAGES.map((page) => (
            <MenuItem>
              <CustomLink
                href={page.path}
                target={page.target}
                isSelected={pathname === page.path}
                onClick={closeMenu}
              >
                {page.name}
              </CustomLink>
            </MenuItem>
          ))}
        </MainMenu>

        {isMobile ? <></> : <BookDirectButton />}
      </MainNav>
    </TopBar>
  );
};

export default NavBar;

const TopBar = styled.header`
  display: flex;
  justify-content: space-between;

  background-color: white;
  box-shadow: 0px 2px 32px 2px rgba(0, 64, 0, 0.1);

  position: sticky;
  top: 0px;

  z-index: 4;

  @media (width < 800px) {
    flex-direction: column;
  }
`;

const PreMenu = styled.div`
  display: flex;
  justify-content: space-between;

  @media (width < 800px) {
    width: 100%;
  }
`;

const Logo = styled(Image)`
  width: auto;
  height: 80px;

  @media (width < 800px) {
    height: 64px;
  }
`;

const MenuButton = styled(FontAwesomeIcon)`
  font-size: 32px;
  padding: 16px 28px;
`;

type MainNavProps = {
  showMenu: boolean;
};

const MainNav = styled.div<MainNavProps>`
  display: ${(props) => (props.showMenu ? "flex" : "none")};

  @media (width < 800px) {
    flex-direction: column;
  }
`;

const MainMenu = styled.ul`
  display: flex;
  margin: 0px;

  @media (width < 800px) {
    flex-direction: column;
    gap: 8px;

    margin: 0px 16px;
    padding-left: 0px;
  }
`;

const MenuItem = styled.li`
  list-style: none;

  display: flex;
  justify-content: right;
  align-items: center;

  margin: 0px 12px;
`;

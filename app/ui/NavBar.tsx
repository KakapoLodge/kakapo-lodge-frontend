"use client";

import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { MouseEventHandler, useContext, useState } from "react";
import styled from "styled-components";
import { IsMobileContext } from "../lib/context";
import { useIsMobile } from "../lib/hooks";
import { IsMobileProps } from "../lib/types";
import BookDirectButton from "./BookDirectButton";
import CustomLink from "./CustomLink";

const NavBar = () => {
  const pathname = usePathname();
  const isMobile = useIsMobile();

  const [showMenu, setShowMenu] = useState(!isMobile);
  const closeMenu = isMobile ? () => setShowMenu(false) : undefined;

  const [disableMenuButton, setDisableMenuButton] = useState(false);
  const toggleMenu = () => {
    setShowMenu(!showMenu);

    setDisableMenuButton(true);
    setTimeout(() => setDisableMenuButton(false), 500);
  };

  return (
    <IsMobileContext.Provider value={isMobile}>
      <TopBar>
        <PreMenu>
          <Logo pathname={pathname} onClick={closeMenu} />
          <MenuButton disabled={disableMenuButton} onClick={toggleMenu} />
        </PreMenu>

        <MainNav pathname={pathname} showMenu={showMenu} onClick={closeMenu} />
      </TopBar>
    </IsMobileContext.Provider>
  );
};

export default NavBar;

const TopBar = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const isMobile = useContext(IsMobileContext);
  return <_TopBar $isMobile={isMobile}>{children}</_TopBar>;
};

const _TopBar = styled.header<IsMobileProps>`
  display: flex;
  justify-content: space-between;
  flex-direction: ${(props) => (props.$isMobile ? "column" : "row")};

  background-color: white;
  box-shadow: 0px 2px 32px 2px rgba(0, 64, 0, 0.1);

  position: sticky;
  top: 0px;

  z-index: 1002;
`;

const PreMenu = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const isMobile = useContext(IsMobileContext);
  return <_PreMenu $isMobile={isMobile}>{children}</_PreMenu>;
};

const _PreMenu = styled.div<IsMobileProps>`
  display: flex;
  justify-content: space-between;
  width: ${(props) => (props.$isMobile ? "100%" : "auto")};
`;

type LogoProps = {
  pathname: string;
  onClick?: MouseEventHandler<Element>;
};

const Logo = ({ pathname, onClick }: LogoProps) => {
  const isMobile = useContext(IsMobileContext);
  return (
    <CustomLink href="/" $isSelected={pathname === "/"} onClick={onClick}>
      <_Logo
        src={"/kakapo_logo_with_text.png"}
        alt="Kakapo logo with text"
        width={371}
        height={160}
        $isMobile={isMobile}
        priority
      />
    </CustomLink>
  );
};

const _Logo = styled(Image)<IsMobileProps>`
  width: auto;
  height: ${(props) => (props.$isMobile ? "64px" : "80px")};
`;

type MenuButtonProps = {
  disabled: boolean;
  onClick: MouseEventHandler<Element>;
};

const MenuButton = ({ disabled, onClick }: MenuButtonProps) => {
  const isMobile = useContext(IsMobileContext);

  return isMobile ? (
    <MenuIcon icon={faBars} disabled={disabled} onClick={onClick} />
  ) : (
    <></>
  );
};

type MenuIconProps = {
  disabled: boolean;
};

const MenuIcon = styled(FontAwesomeIcon)<MenuIconProps>`
  font-size: 32px;
  padding: 16px 24px;
  pointer-events: ${(props) => (props.disabled ? "none" : "auto")};
`;

type Page = {
  name: string;
  path: string;
  target?: string;
};

const SUB_PAGES: Page[] = [
  { name: "Accommodation", path: "/accommodation" },
  { name: "Facilities", path: "/facilities" },
  {
    name: "Attractions",
    path: "https://visithanmersprings.co.nz/things-to-do/",
    target: "_blank",
  },
  { name: "Contact", path: "/contact" },
];

type MainNavProps = {
  pathname: string;
  showMenu: boolean;
  onClick?: MouseEventHandler<Element>;
};

const MainNav = ({ pathname, showMenu, onClick }: MainNavProps) => {
  return showMenu ? (
    <Nav>
      <MainMenu>
        {SUB_PAGES.map(({ name, path, target = "_self" }) => (
          <MenuItem key={name}>
            <CustomLink
              href={path}
              target={target}
              $isSelected={pathname.includes(path)}
              onClick={onClick}
            >
              {name}
            </CustomLink>
          </MenuItem>
        ))}
      </MainMenu>

      <BookDirectButton />
    </Nav>
  ) : (
    <></>
  );
};

const Nav = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const isMobile = useContext(IsMobileContext);
  return <_Nav $isMobile={isMobile}>{children}</_Nav>;
};

const _Nav = styled.nav<IsMobileProps>`
  display: flex;
  flex-direction: ${(props) => (props.$isMobile ? "column" : "row")};
  gap: 8px;
`;

const MainMenu = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const isMobile = useContext(IsMobileContext);
  return <_MainMenu $isMobile={isMobile}>{children}</_MainMenu>;
};

const _MainMenu = styled.ul<IsMobileProps>`
  display: flex;
  flex-direction: ${(props) => (props.$isMobile ? "column" : "row")};
  gap: ${(props) => (props.$isMobile ? "8px" : "24px")};

  margin: ${(props) => (props.$isMobile ? "0px 16px" : "0px")};
  padding-left: 0px;
`;

const MenuItem = styled.li`
  list-style: none;

  display: flex;
  justify-content: right;
  align-items: center;
`;

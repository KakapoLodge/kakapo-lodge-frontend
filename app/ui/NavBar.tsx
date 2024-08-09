"use client";
import Image from "next/image";
import styled from "styled-components";
import BookDirectButton from "./BookDirectButton";
import { usePathname } from "next/navigation";
import NavLink from "./NavLink";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { MouseEventHandler, useContext, useState } from "react";
import { IsMobileContext } from "../context";
import { IsMobileProps } from "../types";
import { useIsMobile } from "../hooks";

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
  return <StyledTopBar $isMobile={isMobile}>{children}</StyledTopBar>;
};

const StyledTopBar = styled.header<IsMobileProps>`
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
  return <StyledPreMenu $isMobile={isMobile}>{children}</StyledPreMenu>;
};

const StyledPreMenu = styled.div<IsMobileProps>`
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
    <NavLink href="/" $isSelected={pathname === "/"} onClick={onClick}>
      <StyledLogo
        src={"/kakapo_logo_with_text.png"}
        alt="Kakapo logo with text"
        width={2963}
        height={1278}
        $isMobile={isMobile}
      />
    </NavLink>
  );
};

const StyledLogo = styled(Image)<IsMobileProps>`
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
  padding: 16px 28px;
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
    <_MainNav>
      <MainMenu>
        {SUB_PAGES.map(({ name, path, target = "_self" }) => (
          <MenuItem key={name}>
            <NavLink
              href={path}
              target={target}
              $isSelected={pathname === path}
              onClick={onClick}
            >
              {name}
            </NavLink>
          </MenuItem>
        ))}
      </MainMenu>

      <BookDirectButton />
    </_MainNav>
  ) : (
    <></>
  );
};

const _MainNav = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const isMobile = useContext(IsMobileContext);
  return <StyledMainNav $isMobile={isMobile}>{children}</StyledMainNav>;
};

const StyledMainNav = styled.div<IsMobileProps>`
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
  return <StyledMainMenu $isMobile={isMobile}>{children}</StyledMainMenu>;
};

const StyledMainMenu = styled.ul<IsMobileProps>`
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

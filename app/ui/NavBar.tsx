import Image from "next/image";
import { usePathname } from "next/navigation";
import { MouseEventHandler, useContext, useState } from "react";
import styled from "styled-components";
import { MobileDetectionContext } from "../lib/context";
import { IsMobileProps } from "../lib/types";
import BookDirectButton from "./BookDirectButton";
import CustomIcon from "./CustomIcon";
import CustomLink from "./CustomLink";

const NavBar = () => {
  const pathname = usePathname();
  const isMobile = useContext(MobileDetectionContext);

  const [showMenu, setShowMenu] = useState(!isMobile);
  const closeMenu = isMobile ? () => setShowMenu(false) : undefined;

  const [disableMenuButton, setDisableMenuButton] = useState(false);
  const toggleMenu = () => {
    setShowMenu(!showMenu);

    setDisableMenuButton(true);
    setTimeout(() => setDisableMenuButton(false), 500);
  };

  return (
    <TopBar>
      <PreMenu>
        <Logo pathname={pathname} onClick={closeMenu} />
        <MenuButton disabled={disableMenuButton} onClick={toggleMenu} />
      </PreMenu>

      <MainNav pathname={pathname} showMenu={showMenu} onClick={closeMenu} />
    </TopBar>
  );
};

export default NavBar;

const TopBar = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const isMobile = useContext(MobileDetectionContext);
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
  const isMobile = useContext(MobileDetectionContext);
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
  const isMobile = useContext(MobileDetectionContext);
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
  const isMobile = useContext(MobileDetectionContext);

  return isMobile ? (
    <_MenuButton disabled={disabled} onClick={onClick}>
      <CustomIcon icon="fa-bars" />
    </_MenuButton>
  ) : (
    <></>
  );
};

type _MenuButtonProps = {
  disabled: boolean;
};

const _MenuButton = styled.button<_MenuButtonProps>`
  display: flex;
  align-items: center;
  justify-content: center;

  background-color: white;
  border: 0px;

  width: 64px;
  height: 64px;
  font-size: 24px;

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
  const isMobile = useContext(MobileDetectionContext);
  return <_Nav $isMobile={isMobile}>{children}</_Nav>;
};

const _Nav = styled.nav<IsMobileProps>`
  display: flex;
  flex-direction: ${(props) => (props.$isMobile ? "column" : "row")};
  gap: 8px;

  height: ${(props) => (props.$isMobile ? "180px" : "auto")};
`;

const MainMenu = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const isMobile = useContext(MobileDetectionContext);
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

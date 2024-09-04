import Image from "next/image";
import { usePathname } from "next/navigation";
import { MouseEventHandler, useState } from "react";
import styled from "styled-components";
import { HOME_URL, KAKAPO_LODGE_NAME, LOGO_PATH, SUB_PAGES } from "../content";
import { useGoogleAnalyticsEvents } from "../lib/hooks/useGoogleAnalyticsEvents";
import { useMobileDetection } from "../lib/hooks/useMobileDetection";
import { useScrollPosition } from "../lib/hooks/useScrollPosition";
import { linearInterpolate } from "../lib/math";
import { IsMobileProps } from "../lib/types";
import BookDirectButton from "./BookDirectButton";
import CustomIcon from "./CustomIcon";
import CustomLink from "./CustomLink";

const NavBar = () => {
  const pathname = usePathname();
  const isMobile = useMobileDetection();

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
        <Logo pathname={pathname} closeMenu={closeMenu} />
        <MenuButton disabled={disableMenuButton} onClick={toggleMenu} />
      </PreMenu>

      <MainNav pathname={pathname} closeMenu={closeMenu} showMenu={showMenu} />
    </TopBar>
  );
};

export default NavBar;

const TopBar = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const isMobile = useMobileDetection();
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
  const isMobile = useMobileDetection();
  return <_PreMenu $isMobile={isMobile}>{children}</_PreMenu>;
};

const _PreMenu = styled.div<IsMobileProps>`
  display: flex;
  justify-content: space-between;
  width: ${(props) => (props.$isMobile ? "100%" : "auto")};
`;

type LogoProps = {
  pathname: string;
  closeMenu?: (() => void) | undefined;
};

const Logo = ({ pathname, closeMenu }: LogoProps) => {
  const { sendLinkClickedEvent } = useGoogleAnalyticsEvents();

  const handleClick = (url: string) => {
    closeMenu && closeMenu();
    sendLinkClickedEvent(url);
  };

  const isMobile = useMobileDetection();
  const scrollPosition = useScrollPosition();

  const heightRange = isMobile ? [40, 64] : [64, 80];
  const height = linearInterpolate(scrollPosition, [0, 50], heightRange);

  return (
    <CustomLink
      href={HOME_URL}
      $isSelected={pathname === HOME_URL}
      onClick={() => handleClick(HOME_URL)}
    >
      <_Logo
        src={LOGO_PATH}
        alt={KAKAPO_LODGE_NAME}
        width={371}
        height={160}
        $height={height}
        priority
      />
    </CustomLink>
  );
};

const _Logo = styled(Image)<{ $height: number }>`
  width: auto;
  height: ${(props) => props.$height}px;
`;

type MenuButtonProps = {
  disabled: boolean;
  onClick: MouseEventHandler<Element>;
};

const MenuButton = ({ disabled, onClick }: MenuButtonProps) => {
  const isMobile = useMobileDetection();

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
  color: var(--primary-color);
  border: 0px;

  width: 64px;
  font-size: 24px;

  pointer-events: ${(props) => (props.disabled ? "none" : "auto")};
`;

type MainNavProps = {
  pathname: string;
  showMenu: boolean;
  closeMenu?: (() => void) | undefined;
};

const MainNav = ({ pathname, showMenu, closeMenu }: MainNavProps) => {
  const { sendLinkClickedEvent } = useGoogleAnalyticsEvents();

  const handleClick = (url: string) => {
    closeMenu && closeMenu();
    sendLinkClickedEvent(url);
  };

  return showMenu ? (
    <Nav>
      <MainMenu>
        {SUB_PAGES.map(({ name, path, target = "_self" }) => (
          <MenuItem key={name}>
            <CustomLink
              href={path}
              target={target}
              $isSelected={pathname.includes(path)}
              onClick={() => handleClick(path)}
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
  const isMobile = useMobileDetection();
  return <_Nav $isMobile={isMobile}>{children}</_Nav>;
};

const _Nav = styled.nav<IsMobileProps>`
  display: flex;
  flex-direction: ${(props) => (props.$isMobile ? "column" : "row")};
  gap: 8px;

  height: ${(props) => (props.$isMobile ? "200px" : "auto")};
`;

const MainMenu = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const isMobile = useMobileDetection();
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

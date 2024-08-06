"use client";
import Image from "next/image";
import styled from "styled-components";
import BookDirectButton from "./BookDirectButton";
import { usePathname } from "next/navigation";
import CustomLink from "./CustomLink";

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

const NavBar = () => {
  const pathname = usePathname();
  return (
    <TopBar>
      <CustomLink href="/" isSelected={pathname === "/"}>
        <Image
          src={"/kakapo_logo_with_text.png"}
          alt="Kakapo logo with text"
          width={2963}
          height={1278}
          style={{ height: "80px", width: "auto" }}
        />
      </CustomLink>

      <MainNav>
        <MainMenu>
          {SUB_PAGES.map((page) => (
            <MenuItem>
              <CustomLink
                href={page.path}
                target={page.target}
                isSelected={pathname === page.path}
              >
                {page.name}
              </CustomLink>
            </MenuItem>
          ))}
        </MainMenu>

        <BookDirectButton />
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
`;

const MainNav = styled.div`
  display: flex;

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

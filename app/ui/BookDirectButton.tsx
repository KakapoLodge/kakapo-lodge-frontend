"use client";
import Link from "next/link";
import { useContext } from "react";
import styled from "styled-components";
import { IsMobileContext } from "../context";
import { IsMobileProps } from "../types";

type BookDirectButtonProps = {
  isFooter?: boolean;
};

const BookDirectButton = ({ isFooter = false }: BookDirectButtonProps) => {
  const isMobile = useContext(IsMobileContext);

  return isFooter === isMobile ? (
    <Button
      target="_blank"
      href="https://apac.littlehotelier.com/properties/kakapolodgedirect?promotion_code=5OFF"
      $isMobile={isMobile}
    >
      <DiscountSymbol />
      Book Direct
    </Button>
  ) : (
    <></>
  );
};

export default BookDirectButton;

const Button = styled(Link)<IsMobileProps>`
  background-color: var(--primary-color);
  color: white;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  width: ${(props) => (props.$isMobile ? "60%" : "auto")};
  margin: ${(props) => (props.$isMobile ? "0px" : "16px")};
  padding: ${(props) => (props.$isMobile ? "6px 0px" : "0px 24px")};
  border-radius: 8px;

  &:hover {
    background-color: var(--secondary-color);
  }
`;

const DiscountSymbol = () => {
  return (
    <svg
      height="32px"
      version="1.1"
      viewBox="0.0 0.0 1024.0 1024.0"
      fill="none"
      stroke="none"
      strokeLinecap="square"
      strokeMiterlimit="10"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      xmlns="http://www.w3.org/2000/svg"
    >
      <clipPath id="p.0">
        <path
          d="m0 0l1024.0 0l0 1024.0l-1024.0 0l0 -1024.0z"
          clipRule="nonzero"
        />
      </clipPath>
      <g clipPath="url(#p.0)">
        <path
          fill="#8c9b3e"
          d="m-0.0026244095 512.0026l131.28703 -50.123535l-113.84106 -82.391815l139.78412 -14.433777l-88.63509 -109.05087l138.7586 22.236145l-57.392273 -128.27481l128.27481 57.392258l-22.236145 -138.7586l109.05087 88.63508l14.433777 -139.78409l82.391815 113.84106l50.123535 -131.28703l50.123535 131.28703l82.391846 -113.84106l14.433716 139.78409l109.0509 -88.63508l-22.236145 138.7586l128.27484 -57.392258l-57.392273 128.27481l138.7586 -22.236145l-88.63513 109.05087l139.78412 14.433777l-113.841064 82.391815l131.28705 50.123535l-131.28705 50.123535l113.841064 82.391846l-139.78412 14.433716l88.63513 109.0509l-138.7586 -22.236145l57.392273 128.27484l-128.27484 -57.392273l22.236145 138.7586l-109.0509 -88.63513l-14.433716 139.78412l-82.391846 -113.841064l-50.123535 131.28699l-50.123535 -131.28699l-82.391815 113.841064l-14.433777 -139.78412l-109.05087 88.63513l22.236145 -138.7586l-128.27481 57.392273l57.392273 -128.27484l-138.7586 22.236145l88.63509 -109.0509l-139.78412 -14.433716l113.84106 -82.391846z"
          fillRule="evenodd"
        />
        <path
          stroke="#4b5320"
          strokeWidth="16.0"
          strokeLinejoin="round"
          strokeLinecap="butt"
          d="m-0.0026244095 512.0026l131.28703 -50.123535l-113.84106 -82.391815l139.78412 -14.433777l-88.63509 -109.05087l138.7586 22.236145l-57.392273 -128.27481l128.27481 57.392258l-22.236145 -138.7586l109.05087 88.63508l14.433777 -139.78409l82.391815 113.84106l50.123535 -131.28703l50.123535 131.28703l82.391846 -113.84106l14.433716 139.78409l109.0509 -88.63508l-22.236145 138.7586l128.27484 -57.392258l-57.392273 128.27481l138.7586 -22.236145l-88.63513 109.05087l139.78412 14.433777l-113.841064 82.391815l131.28705 50.123535l-131.28705 50.123535l113.841064 82.391846l-139.78412 14.433716l88.63513 109.0509l-138.7586 -22.236145l57.392273 128.27484l-128.27484 -57.392273l22.236145 138.7586l-109.0509 -88.63513l-14.433716 139.78412l-82.391846 -113.841064l-50.123535 131.28699l-50.123535 -131.28699l-82.391815 113.841064l-14.433777 -139.78412l-109.05087 88.63513l22.236145 -138.7586l-128.27481 57.392273l57.392273 -128.27484l-138.7586 22.236145l88.63509 -109.0509l-139.78412 -14.433716l113.84106 -82.391846z"
          fillRule="evenodd"
        />
        <path
          fill="#000000"
          fillOpacity="0.0"
          d="m27.862206 25.422573l968.2835 0l0 973.1654l-968.2835 0z"
          fillRule="evenodd"
        />
        <path
          fill="#ffffff"
          d="m312.2004 386.60526l27.078125 -2.296875q3.0 19.765625 13.953125 29.734375q10.96875 9.953125 26.4375 9.953125q18.609375 0 31.5 -14.03125q12.890625 -14.046875 12.890625 -37.25q0 -22.0625 -12.390625 -34.796875q-12.390625 -12.75 -32.4375 -12.75q-12.453125 0 -22.484375 5.65625q-10.03125 5.65625 -15.75 14.671875l-24.21875 -3.140625l20.34375 -107.859375l104.421875 0l0 24.640625l-83.796875 0l-11.3125 56.421875q18.90625 -13.171875 39.671875 -13.171875q27.5 0 46.40625 19.046875q18.90625 19.046875 18.90625 48.984375q0 28.5 -16.609375 49.28125q-20.203125 25.484375 -55.140625 25.484375q-28.65625 0 -46.78125 -16.03125q-18.109375 -16.046875 -20.6875 -42.546875zm168.01013 -104.546875q0 -22.5 11.3125 -38.25q11.3125 -15.75 32.796844 -15.75q19.765625 0 32.71875 14.109375q12.96875 14.109375 12.96875 41.453125q0 26.640625 -13.109375 41.046875q-13.09375 14.390625 -32.296875 14.390625q-19.046844 0 -31.71872 -14.171875q-12.671875 -14.1875 -12.671875 -42.828125zm44.828094 -36.25q-9.59375 0 -15.9687195 8.3125q-6.375 8.3125 -6.375 30.515625q0 20.1875 6.4375 28.421875q6.4530945 8.234375 15.9062195 8.234375q9.734375 0 16.109375 -8.296875q6.375 -8.3125 6.375 -30.375q0 -20.328125 -6.453125 -28.5625q-6.4375 -8.25 -16.03125 -8.25zm0.140625 203.53125l114.875 -221.28125l20.90625 0l-114.4375 221.28125l-21.34375 0zm90.8125 -57.0q0 -22.640625 11.3125 -38.3125q11.3125 -15.6875 32.9375 -15.6875q19.765625 0 32.71875 14.109375q12.96875 14.109375 12.96875 41.46875q0 26.640625 -13.109375 41.03125q-13.09375 14.390625 -32.4375 14.390625q-19.046875 0 -31.71875 -14.25q-12.671875 -14.25 -12.671875 -42.75zm44.96875 -36.234375q-9.734375 0 -16.109375 8.3125q-6.375 8.296875 -6.375 30.5q0 20.046875 6.4375 28.359375q6.453125 8.296875 15.90625 8.296875q9.875 0 16.25 -8.296875q6.375 -8.3125 6.375 -30.375q0 -20.328125 -6.453125 -28.5625q-6.4375 -8.234375 -16.03125 -8.234375z"
          fillRule="nonzero"
        />
        <path
          fill="#ffffff"
          d="m232.91927 691.3396q0 -52.28125 28.07814 -81.84375q28.078125 -29.578125 72.46875 -29.578125q29.078125 0 52.421875 13.890625q23.34375 13.890625 35.59375 38.75q12.25 24.84375 12.25 56.34375q0 31.9375 -12.890625 57.15625q-12.890625 25.203125 -36.53125 38.171875q-23.625 12.953125 -50.984375 12.953125q-29.640625 0 -53.0 -14.3125q-23.34375 -14.328125 -35.375015 -39.109375q-12.03125 -24.78125 -12.03125 -52.421875zm28.656265 0.4375q0 37.953125 20.40625 59.796875q20.40625 21.84375 51.203125 21.84375q31.375 0 51.640625 -22.0625q20.265625 -22.0625 20.265625 -62.59375q0 -25.640625 -8.671875 -44.75q-8.671875 -19.125 -25.359375 -29.65625q-16.671875 -10.53125 -37.4375 -10.53125q-29.515625 0 -50.78125 20.28125q-21.265625 20.265625 -21.265625 67.671875zm209.39441 101.828125l0 -209.96875l141.65622 0l0 24.78125l-113.87497 0l0 65.015625l98.546844 0l0 24.78125l-98.546844 0l0 95.390625l-27.78125 0zm179.17648 0l0 -209.96875l141.65625 0l0 24.78125l-113.875 0l0 65.015625l98.546875 0l0 24.78125l-98.546875 0l0 95.390625l-27.78125 0z"
          fillRule="nonzero"
        />
      </g>
    </svg>
  );
};

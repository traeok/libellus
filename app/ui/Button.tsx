import { IconProps } from "@radix-ui/react-icons/dist/types";
import { ReactElement } from "react";
import styled from "styled-components";
import { globals } from "~/globals";

type BtnProps = {
  color?: string;
  hoverColor?: string;
};

const StyledBtn = styled.div<BtnProps>`
  background-color: ${(props) => props.color || globals.theme.colors.sand6};
  color: white;
  padding: 0.5rem;
  border-radius: 6px;
  display: flex;
  align-items: center;
  user-select: none;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: ${(props) =>
      props.hoverColor || globals.theme.colors.sand5};
  }
`;

export const Button = ({
  color,
  hoverColor,
  icon,
  title,
  style,
}: {
  color?: string;
  hoverColor?: string;
  icon?: ReactElement<IconProps>;
  title: string;
  style?: React.CSSProperties;
}) => {
  return (
    <StyledBtn color={color} hoverColor={hoverColor} style={style}>
      <>
        {icon}
        <span style={{ marginLeft: "0.5rem" }}>{title}</span>
      </>
    </StyledBtn>
  );
};

import styled from "styled-components";
import WithContext from "~/ui/ContextMenu";
import { globals } from "~/globals";
import { Button } from "~/ui/Button";
import { CaretSortIcon, LayersIcon, PlusIcon } from "@radix-ui/react-icons";

const Content = styled.div`
  padding: 1rem;
`;

const Logo = styled.h2`
  padding: 0.5rem;
  padding-top: 0.25rem;
  padding-bottom: 0.25rem;
  background-color: ${globals.theme.colors.sand6};
  color: white;
`;

const NavMenu = styled.div`
  margin-left: 1rem;
  margin-right: 1rem;
  display: flex;
  align-items: center;
`;

const Items = styled.div`
  z-index: 10;
  width: 100%;
  overflow-y: auto;
  height: 83.333333%;
`;

export default function Index() {
  return (
    <Content>
      <WithContext>
        <NavMenu>
          <Logo>
            libellus
          </Logo>
          <div style={{ display: "flex", alignItems: "center", marginLeft: "auto" }}>
            <Button icon={<LayersIcon />} color={globals.theme.colors.sand8} hoverColor={globals.theme.colors.sand7} title="Filter by..." style={{ marginRight: "0.5rem" }} />
            <Button icon={<PlusIcon />} color={globals.theme.colors.green8} hoverColor={globals.theme.colors.green7} title="Add item" />
          </div>
        </NavMenu>
      </WithContext>
      <Items>
        <WithContext></WithContext>
      </Items>
    </Content>
  );
}

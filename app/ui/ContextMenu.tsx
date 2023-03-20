import React from "react";
import * as ContextMenu from "@radix-ui/react-context-menu";
import {
  DotFilledIcon,
  CheckIcon,
  ChevronRightIcon,
} from "@radix-ui/react-icons";
import { globals } from "~/globals";
import styled from "styled-components";

const ContentStyle = `
font-family: "Inter", sans-serif;
min-width: 220px;
background-color: white;
border-radius: 6px;
overflow: hidden;
padding: 5px;
box-shadow: 0px 10px 38px -10px rgba(22, 23, 24, 0.35),
  0px 10px 20px -15px rgba(22, 23, 24, 0.2);
`;

const Content = styled(ContextMenu.ContextMenuContent)`
  ${ContentStyle}
`;
const SubContent = styled(ContextMenu.SubContent)`
  ${ContentStyle}
`;

const RightAligned = styled.div`
  margin-left: auto;
  padding-left: 20px;
  color: ${globals.theme.colors.blue11};
`;

const ItemStyle = `
font-size: 13px;
line-height: 1;
color: ${globals.theme.colors.blue5};
border-radius: 3px;
display: flex;
align-items: center;
height: 25px;
padding: 0 5px;
position: relative;
padding-left: 25px;
user-select: none;
outline: none;

&[data-disabled] {
  opacity: 0.5;
}

&[data-highlighted] {
  background-color: ${globals.theme.colors.blue9};
  color: white !important;
}

&[data-highlighted] > ${RightAligned} {
  color: white;
}
`;

const CheckboxItem = styled(ContextMenu.ContextMenuCheckboxItem)`
  ${ItemStyle}
`;
const RadioItem = styled(ContextMenu.ContextMenuRadioItem)`
  ${ItemStyle}
`;
const Item = styled(ContextMenu.ContextMenuItem)`
  ${ItemStyle}
`;
const SubTrigger = styled(ContextMenu.ContextMenuSubTrigger)`
  ${ItemStyle}
`;

const ItemIndicator = styled(ContextMenu.ContextMenuItemIndicator)`
  position: absolute;
  left: 0;
  width: 25px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
`;
const Separator = styled(ContextMenu.ContextMenuSeparator)`
  height: 1px;
  background-color: ${globals.theme.colors.blue11};
  opacity: 0.5;
  margin: 5px;
`;
const Label = styled(ContextMenu.ContextMenuLabel)`
  padding-left: 25px;
  font-size: 12px;
  line-height: 25px;
  color: ${globals.theme.colors.blue11};
  opacity: 0.75;
`;

const WithContext = ({ children }) => {
  const [bookmarksChecked, setBookmarksChecked] = React.useState(true);
  const [urlsChecked, setUrlsChecked] = React.useState(false);
  const [person, setPerson] = React.useState("pedro");

  return (
    <ContextMenu.Root>
      <ContextMenu.Trigger className="ContextMenuTrigger">
        {children}
      </ContextMenu.Trigger>
      <ContextMenu.Portal>
        <Content>
          <Item>
            Delete <RightAligned>⌘+⌫</RightAligned>
          </Item>
          <Item>
            Back <RightAligned>⌘+[</RightAligned>
          </Item>
          <Item>
            Reload <RightAligned>⌘+R</RightAligned>
          </Item>
          <ContextMenu.Sub>
            <SubTrigger>
              More Tools
              <RightAligned>
                <ChevronRightIcon />
              </RightAligned>
            </SubTrigger>
            <ContextMenu.Portal>
              <SubContent sideOffset={2} alignOffset={-5}>
                <Item>
                  Save Page As… <RightAligned>⌘+S</RightAligned>
                </Item>
                <Item>Create Shortcut…</Item>
                <Item>Name Window…</Item>
                <Separator />
                <Item>Developer Tools</Item>
              </SubContent>
            </ContextMenu.Portal>
          </ContextMenu.Sub>

          <Separator />

          <CheckboxItem
            checked={bookmarksChecked}
            onCheckedChange={setBookmarksChecked}
          >
            <ItemIndicator className="ContextMenuItemIndicator">
              <CheckIcon />
            </ItemIndicator>
            Show Bookmarks <RightAligned>⌘+B</RightAligned>
          </CheckboxItem>
          <CheckboxItem checked={urlsChecked} onCheckedChange={setUrlsChecked}>
            <ItemIndicator className="ContextMenuItemIndicator">
              <CheckIcon />
            </ItemIndicator>
            Show Full URLs
          </CheckboxItem>

          <Separator />

          <Label className="ContextMenuLabel">People</Label>
          <ContextMenu.RadioGroup value={person} onValueChange={setPerson}>
            <RadioItem value="pedro">
              <ItemIndicator className="ContextMenuItemIndicator">
                <DotFilledIcon />
              </ItemIndicator>
              Pedro Duarte
            </RadioItem>
            <RadioItem value="colm">
              <ItemIndicator className="ContextMenuItemIndicator">
                <DotFilledIcon />
              </ItemIndicator>
              Colm Tuite
            </RadioItem>
          </ContextMenu.RadioGroup>
        </Content>
      </ContextMenu.Portal>
    </ContextMenu.Root>
  );
};

export default WithContext;

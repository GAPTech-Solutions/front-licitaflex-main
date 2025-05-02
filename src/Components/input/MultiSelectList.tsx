import { CheckboxIcon } from "@chakra-ui/react";
import { MultiSelectListContainerCss, MultiSelectListCss } from "./style";

export type ItemMultiSelect<T> = {
  id: string;
} & T;
type MultiSelectListProps<T> = {
  display?: boolean;
  items: ItemMultiSelect<T>[];
  textNoItemToSelect: string;
  getLabel: (item: T) => string;
  onClickList: (item: ItemMultiSelect<T>) => void;
  isItemSelected: (item: ItemMultiSelect<T>) => boolean;
};
export default function MultiSelectList<T>(props: MultiSelectListProps<T>) {
  const {
    display,
    items,
    getLabel,
    onClickList,
    isItemSelected,
    textNoItemToSelect,
  } = props;
  if (!display) return <></>;
  return (
    <MultiSelectListContainerCss>
      {items.length > 0 &&
        items.map((e) => (
          <MultiSelectListCss
            key={e.id}
            onClick={() => onClickList(e)}
            className="multi-select--list"
          >
            {isItemSelected(e) && <CheckboxIcon />}
            {getLabel(e)}
          </MultiSelectListCss>
        ))}

      {items.length === 0 && (
        <MultiSelectListCss>{textNoItemToSelect}</MultiSelectListCss>
      )}
    </MultiSelectListContainerCss>
  );
}

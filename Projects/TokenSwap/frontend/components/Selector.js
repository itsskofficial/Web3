import { useEffect, useState } from "react";
import { TOKENS } from "@utils/tokens";
import { Dropdown } from "@nextui-org/react";

const Selector = ({ defaultValue, ignoreValue, setToken, id }) => {
  const menu = tokenNames.map((tokenName) => ({
		key: tokenName,
		name: TOKENS[tokenName],
  }));

  const [selectedItem, setSelectedItem] = useState()
  const [menuItems, setMenuItems] = useState(getFilteredItems(ignoreValue))

  const getFilteredItems = (ignoreValue) => {
    return menu.filter((item) => item.name !== ignoreValue)
  }

  useEffect(() => {
    setSelectedItem(defaultValue)
  }, [defaultValue])

  useEffect(() => {
    setMenuItems(getFilteredItems(ignoreValue))
  }, [ignoreValue])

  return (
		<Dropdown>
			<Dropdown.Button
				css={{
					backgroundColor:
						selectedItem === TOKENS["Default"]
							? "#7765F3"
							: "#2C2F36",
				}}
			>
				{selectedItem}
			</Dropdown.Button>
			<Dropdown.Menu
				aria-label="Dynamic Actions"
				items={menuItems}
				onAction={(key) => {
					setSelectedItem(
						menuItems.find((item) => item.key === key).name
					);
					setToken(menuItems.find((item) => item.key === key).name);
				}}
			>
				{(item) => {
					<Dropdown.Item
						area-label={id}
						key={item.key}
						color={item.key === "delete" ? "error" : "default"}
					>
						{item.key}
					</Dropdown.Item>;
				}}
			</Dropdown.Menu>
		</Dropdown>
  );
};

export default Selector;
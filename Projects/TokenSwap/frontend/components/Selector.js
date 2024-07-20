import {useEffect, useState} from "react";
import {TOKENS} from "@utils/tokens";
import {Dropdown, DropdownItem, DropdownMenu, DropdownTrigger} from "@nextui-org/react";

const Selector = ({defaultValue, ignoreValue, setToken, id}) => {
	const menu = Object.keys(TOKENS).map((tokenName) => ({
		key: tokenName,
		name: TOKENS[tokenName],
	}));

	const getFilteredItems = (ignoreValue) => {
		return menu.filter((item) => item.name !== ignoreValue);
	};

	const [selectedItem, setSelectedItem] = useState(defaultValue);
	const [menuItems, setMenuItems] = useState(getFilteredItems(ignoreValue));

	useEffect(() => {
		setSelectedItem(defaultValue);
	}, [defaultValue]);

	useEffect(() => {
		setMenuItems(getFilteredItems(ignoreValue));
	}, [ignoreValue]);

	return (
		<Dropdown>
			<DropdownTrigger
				css={{
					backgroundColor:
						selectedItem === TOKENS["Default"]
							? "#7765F3"
							: "#2C2F36",
				}}
			>
				{selectedItem}
			</DropdownTrigger>
			<DropdownMenu
				aria-label="Dynamic Actions"
				items={menuItems}
				onAction={(key) => {
					const selectedToken = menuItems.find(
						(item) => item.key === key
					);
					setSelectedItem(selectedToken.name);
					setToken(selectedToken.name);
				}}
			>
				{(item) => (
					<DropdownItem
						aria-label={id}
						key={item.key}
						color={item.key === "delete" ? "error" : "default"}
					>
						{item.name}
					</DropdownItem>
				)}
			</DropdownMenu>
		</Dropdown>
	);
};

export default Selector;
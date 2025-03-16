"use client";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { DropdownMenuGroup, DropdownMenuItem } from "../ui/dropdown-menu";

export const NavThemeToggle = () => {
	const { theme, setTheme } = useTheme();

	const toggleTheme = () => {
		setTheme(theme === "dark" ? "light" : "dark");
	};

	return (
		<DropdownMenuGroup>
			<DropdownMenuItem onClick={toggleTheme}>
				{theme === "dark" ? <Sun /> : <Moon />}
				<span>{theme === "dark" ? "Licht" : "Donker"}</span>
			</DropdownMenuItem>
		</DropdownMenuGroup>
	);
};

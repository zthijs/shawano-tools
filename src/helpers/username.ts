export const getInitials = (fullName: string): string => {
	const names = fullName.trim().split(/\s+/);

	if (names.length === 0) return "";

	if (names.length === 1) return names[0].charAt(0).toUpperCase();

	const firstInitial = names[0].charAt(0).toUpperCase();
	const secondInitial = names[1].charAt(0).toUpperCase();

	return firstInitial + secondInitial;
};

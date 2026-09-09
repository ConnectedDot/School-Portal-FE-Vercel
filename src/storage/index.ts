export const setUserItem = (key: string, value: any) => {
	try {
		localStorage.setItem(key, JSON.stringify(value));
	} catch (error) {
		console.error("Error setting item storage:", error);
	}
};

export const getUserItem = (key: string) => {
	try {
		const value = localStorage.getItem(key);
		return value != null ? JSON.parse(value) : null;
	} catch (error) {
		console.error("Error getting item storage:", error);
		return null;
	}
};

export const clearUserData = () => {
	try {
		localStorage.removeItem("token");
		localStorage.removeItem("user_data");
	} catch (error) {
		console.error("Error clearing user data:", error);
	}
};

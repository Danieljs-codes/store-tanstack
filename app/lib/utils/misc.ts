import { createContext, useContext } from "react";

export const sleep = (ms: number) => {
	return new Promise((resolve) => setTimeout(resolve, ms));
};

export function createContextFactory<Context>(
	defaultValue: Context | null = null,
	errorMessage = "useContext must be used within a Provider",
) {
	const context = createContext<Context | null>(defaultValue);

	function useContextFactory(): Context {
		const contextValue = useContext(context);

		if (contextValue === null) {
			throw new Error(errorMessage);
		}

		return contextValue;
	}

	return [context.Provider, useContextFactory] as const;
}

import React from "react";
import AuthProvider from "./AuthProvider";
import NotificationProvider from "./NotificationProvider";
import SearchProvider from "./SearchProvider";

export default function ContextProviders({ children }) {
	return (
		<NotificationProvider>
			<SearchProvider>
				<AuthProvider>
					{children}
				</AuthProvider>
			</SearchProvider>
		</NotificationProvider>
	);
}

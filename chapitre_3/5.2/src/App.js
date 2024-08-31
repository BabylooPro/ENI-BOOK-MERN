import React, { Suspense } from "react";
import ErrorBoundary from "./ErrorBoundary";
const UserProfile = React.lazy(() => import("./UserProfile"));

function App() {
	return (
		<div>
			<h1>Mon Application</h1>
			<ErrorBoundary>
				<Suspense fallback={<div>Loading...</div>}>
					<UserProfile />
				</Suspense>
			</ErrorBoundary>
		</div>
	);
}

export default App;

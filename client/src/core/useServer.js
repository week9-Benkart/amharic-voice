import { useContext } from "react";
import { ServerContext } from "./serverContext";

function useServer() {
	const context = useContext(ServerContext);
	if (typeof context === "undefined") {
		throw new Error(">>> useKafka must be used within a kafkaContext <<<");
	}
	return context;
}

export default useServer;

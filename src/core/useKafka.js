import { useContext } from "react";
import { kafkaContext } from "./kafkaContext";

function useKafka() {
	const context = useContext(kafkaContext);
	if (typeof context === "undefined") {
		throw new Error(">>> useKafka must be used within a kafkaContext <<<");
	}
	return context;
}

export default useKafka;

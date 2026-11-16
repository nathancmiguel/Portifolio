import { useEffect, useState } from "react";
import { fetchPinnedRepos, type PinnedRepo } from "@/utils/github-api";

type State = {
  repos: PinnedRepo[];
  status: "loading" | "ok" | "error";
};

export function usePinnedRepos() {
  const [state, setState] = useState<State>({ repos: [], status: "loading" });

  useEffect(() => {
    const controller = new AbortController();

    fetchPinnedRepos(controller.signal)
      .then((repos) => setState({ repos, status: "ok" }))
      .catch((error) => {
        if (error instanceof DOMException && error.name === "AbortError") return;
        setState({ repos: [], status: "error" });
      });

    return () => controller.abort();
  }, []);

  return state;
}

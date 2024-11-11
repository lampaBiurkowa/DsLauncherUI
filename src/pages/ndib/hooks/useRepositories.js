import { getRepositories } from "@/services/NdibService";
import { useEffect, useState } from "react";

export function useRepositories(developerLibraries) {
    const [repos, setRepos] = useState();

    useEffect(() => {
        (async () => {
            if (developerLibraries) {
                console.log(developerLibraries);
                var repo = await getRepositories(developerLibraries.map(x => x.Path));
                console.log(repo);
                setRepos(repo);
            } else {
                setRepos([]);
            }
        })();
    }, [developerLibraries]);

    return repos;
}
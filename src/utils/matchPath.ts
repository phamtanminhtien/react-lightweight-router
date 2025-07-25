// src/utils/matchPath.ts

interface MatchResult {
    isMatch: boolean;
    params: { [key: string]: string };
}

export function matchPath(pattern: string, pathname: string): MatchResult {
    if (pattern === '*') return { isMatch: true, params: {} };

    // Extract parameter names from the pattern
    const paramNames = pattern.match(/:[^\/]+/g)?.map(param => param.slice(1)) || [];

    // Create a regex pattern that captures parameter values
    const regexPattern = pattern
        .replace(/:[^\/]+/g, '([^/]+)')
        .replace(/\*/g, '.*');

    const regex = new RegExp('^' + regexPattern + '$');
    const match = pathname.match(regex);

    if (!match) {
        return { isMatch: false, params: {} };
    }

    // Extract parameter values from the match
    const paramValues = match.slice(1);
    const params = paramNames.reduce((acc, name, index) => {
        acc[name] = paramValues[index];
        return acc;
    }, {} as { [key: string]: string });

    return { isMatch: true, params };
}

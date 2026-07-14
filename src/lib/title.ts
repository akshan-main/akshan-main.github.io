// ==word== in a post title marks words that stay brick red after the blink
export const cleanTitle = (t: string) => t.replace(/==/g, '');

// split so odd-indexed parts are the highlighted ones
export const titleParts = (t: string) => t.split(/==([^=]+)==/g);

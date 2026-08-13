/**
 * Turns a normal YouTube or Vimeo share URL into a privacy-friendly embed URL,
 * so whoever updates `media.welcomeVideo` can paste whatever the video host
 * gave them without needing to know about embed formats.
 */
export function toEmbedUrl(input: string): string | null {
	if (!input) return null;

	let url: URL;
	try {
		url = new URL(input);
	} catch {
		return null;
	}

	const host = url.hostname.replace(/^www\./, '');

	if (host === 'youtu.be') {
		const id = url.pathname.slice(1);
		return id ? youtube(id) : null;
	}

	if (host === 'youtube.com' || host === 'm.youtube.com' || host === 'youtube-nocookie.com') {
		const watchId = url.searchParams.get('v');
		if (watchId) return youtube(watchId);

		const match = url.pathname.match(/^\/(?:embed|shorts|live|v)\/([^/?]+)/);
		if (match) return youtube(match[1]);
		return null;
	}

	if (host === 'vimeo.com' || host === 'player.vimeo.com') {
		const id = url.pathname.match(/(\d+)/)?.[1];
		return id ? `https://player.vimeo.com/video/${id}?autoplay=1&title=0&byline=0` : null;
	}

	// Anything else (a self-hosted embed, Wistia, a church's own player) is
	// assumed to already be an embeddable URL.
	return input;
}

function youtube(id: string) {
	// youtube-nocookie avoids setting tracking cookies until playback starts.
	// enablejsapi=1 is what lets Analytics' "Video engagement" measurement see
	// the player at all; without it that setting silently records nothing.
	return `https://www.youtube-nocookie.com/embed/${encodeURIComponent(id)}?autoplay=1&rel=0&modestbranding=1&enablejsapi=1`;
}

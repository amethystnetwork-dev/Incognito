/**
 * Incognito
 * 
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 * 
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 * 
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */


/**
 * List of search engines
 * @type {import("./search.d.ts").SearchProviders}
 */
export const searchProviders = {
	google: {
		mapQuery: (query) => `http://google.com/complete/search?q=${query}&client=${(["Chrome", "Firefox", "Safari"].filter(c => navigator.userAgent.includes(c))[0] || "Chrome").toLowerCase()}`,
		parseResponse: (res) => JSON.parse(res)[1],
		frontend: 'https://google.com/search?q=%s'
	},
	ddg: {
		mapQuery: (query) => `https://duckduckgo.com/ac/?q=${encodeURIComponent(query)}`,
		parseResponse: (res) => JSON.parse(res).map(ac => ac.phrase),
		frontend: 'https://duckduckgo.com/?q=%s'
	},
	bing: {
		mapQuery: (query) => `https://www.bing.com/AS/Suggestions?qry=${encodeURIComponent(query)}&cvid=%01&bareServer=`,
		parseResponse: (res) => ([...res.matchAll(/<span class="sa_tm_text">(.*?)<\/span>/g)]).map(phrase => phrase[1].replace(/<strong>|<\/strong>/g, '')),
		frontend: 'https://bing.com/search?q=%s'
	},
	brave: {
		mapQuery: (query) => `https://search.brave.com/api/suggest?q=${encodeURIComponent(query)}`,
		parseResponse: (res) => JSON.parse(res)[1],
		frontend: 'https://search.brave.com/search?q=%s'
	},
	startpage: {
		mapQuery: (query) => `https://www.startpage.com/suggestions?q=${encodeURIComponent(query)}&segment=omnibox`,
		parseResponse: (res) => JSON.parse(res).suggestions.map(ac => ac.text),
		frontend: 'https://www.startpage.com/sp/search?query=%s'
	},
	ecosia: {
		mapQuery: (query) => `https://ac.ecosia.org/?q=${encodeURIComponent(query)}`,
		parseResponse: (res) => JSON.parse(res).suggestions
	}
};
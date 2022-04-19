import http from 'k6/http';
import { sleep } from 'k6';

import { htmlReport } from '../dist/bundle.js'
import { textSummary } from 'https://jslib.k6.io/k6-summary/0.0.1/index.js'

export function handleSummary(data) {
  return {
    'summary.html': htmlReport(data, { debug: false }),
    stdout: textSummary(data, { indent: ' ', enableColors: true }),
  }
}

const url = 'https://dsh-we-dev-as-rnd-cs.azurewebsites.net/home';
const payload = JSON.stringify({"search_string":"berlin",
"datasources":["IP7","PubMed","WeBo","TeamCenter Raws","SharePoint","BusinessFlow"],
"filetype":null,
"filters":null,
"refresh_semantic_answer":false} );

const params = {
  headers: {
    'Content-Type': 'application/json',
    "api-key": "C967B90D531A4DFAC86D1F3C35BBC3CE"
  },
};

export const options = {
    thresholds: {
    http_req_failed: ['rate<0.01'], // http errors should be less than 1%
    http_req_duration: ['p(100)<2000'], // 95% of requests should be below 200ms
  },
  discardResponseBodies: true,
  scenarios: {
    scenario_10_users: {
      executor: 'per-vu-iterations',
      vus: 5,
      iterations: 2,
      //maxDuration: '30s',
    },
    scenario_20_users: {
      executor: 'per-vu-iterations',
      vus: 5,
      iterations: 4,
      //maxDuration: '30s',
    },
    scenario_50_users: {
      executor: 'per-vu-iterations',
      vus: 5,
      iterations: 10,
      //maxDuration: '30s',
    },
    scenario_100_users: {
      executor: 'per-vu-iterations',
      vus: 5,
      iterations: 20,
      //maxDuration: '2s',
    },    
  },
};

export default function LoadTestBeiersdorfCognitiveSearch() {
  const jar = http.cookieJar();
  jar.set(url, 'AppServiceAuthSession', '3eyCVS7Uo7JUBuDbfwHvMX9j9xf2NgykMFlNxKeiL5p6k6VPK4vTf52v5hDdEkdzTDawdrOveEguu3mJjuta5iG8KUDo1+cy3L9LEaR+CzH3cGPEQRu+jKTRrSdIaoUmSUp3tCDDU30jHkyam2OHBEBJhMaAPKzAtK5pD62Nwt/A+/0S4iAv3UVyEpgaSb3HJymzyT7uLDqKBR068pKJahUTjRsYXSU2vTAcfsoO4sYbtfnfKxEfq20+oilMbxDwdhGHujz/qhts/iOPzwonnqkluRCDNjDP4kRJslv7AhqCjNvlo4BpOy6g2EcI7XH+nUKg+maKhyZWpXGuH5VMu43jXMmL/akhWHoK9o4pL57Zq3R6kfa/hSCoyvViu/sl5LEcDX9YpAeLneyDMUC2LDsyz2yNVUlgMRQm62BXTd7QahGs9jvoJBOOcnzBDSKRuA9ifP5GP+IE24P7Ig1XfyulsGlco5iT27sFe9jqnMEns5ggvo60/25+4u1ZR0xjdi6wbuaQlh9v4N+/PZn257K8MzvwrxF+SjPNhuVh+SJW9mC79+v7uAGOU1TVbMv96zKnRaBnPmP3eeOgL9GQucWBbumEYXlePWJNbyferFyxe6F+5JUIftswrExJKvMpis/3lh3FA2P/06Bw2hDZaeD082zEc6KkDXCoXPQwqAiKUVAo2uvMO+XXxst+IFIrqivqb7OG+QI3vtRTOnttgeR+5E0BJm1EMGPBioXpvNCIjGkZyG8HRumkXWRpAQXYLyaq5Up41j/BSPhJieUwkxB+t/Whsi1/wzX4FwM+bLgQRkSmKEEvUhqGAw5zw+NlLhp4unIAUvJn2wtfPEXNhX4VFcZOa1a9eU814Te+0r+1jp/nxGiT/Rsvl2uAL3n1xRM3R/Tq72zBRmTg/4NEAb5jhoFL9Xt5LUNEU5F7ZyQ/qjecp+QVL5iqqh3tVRtOSy3yIcbafjh0URnZhjaLTVa7YnEcJcaA9gyRW0vBsOWKVIcFmzlNc+ZaodNzADvfDQI1QNg0yuc0FQZPFaQiGjdeZYnzXtzVXNyf43w9DaiZC2H75WJOmf/mPHIDRlEDsz/6mU3EFPfjgp6P7beqEF3GBon6yblxAjqYjwclrrUoDYpWrp0IuIg3JIzsBr1Dj5JVXqyrrMuzGOzCcWns/RiMHNjdUuw0VV4B952KAJtIIZMYI/U9VNLZOgNwthpF');
  http.get(url, payload, params);
  sleep(1);
  
  // check(res, {
  //   'is status 200': (r) => r.status === 200,
  // });
}
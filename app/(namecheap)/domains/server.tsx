'use server'

export interface DomainResult {
    name: string;
    available: boolean;
    price?: string;
}

const namecheap_api_endpoints = {
    sandbox: "https://api.sandbox.namecheap.com/xml.response",
    production: "https://api.namecheap.com/xml.response"
}

const fetchDomainCheck = async (domains: string[]) => {
  const apiUser = 'ncuser';
  const apiKey = 'apikey';
  const userName = 'ncuser';
  const clientIp = '121.22.123.22';
  const domainList = domains.join(',');

  const url = `${namecheap_api_endpoints.sandbox}?ApiUser=${apiUser}&ApiKey=${apiKey}&UserName=${userName}&ClientIp=${clientIp}&Command=namecheap.domains.check&DomainList=${domainList}`;

  const response = await fetch(url);
  const data = await response.text(); // Assuming the response is XML

  return data; // You'll need to parse this XML response
};

export async function checkDomains(domains: string[]) {
    'use server'

    // This is a placeholder for the actual API call
    // In a real scenario, you'd use the Namecheap API here
    const results: DomainResult[] = await Promise.all(
        domains.map(async (domain) => {
            // Simulating API call delay
            await new Promise(resolve => setTimeout(resolve, 500));

            // Random availability for demo purposes
            const available = Math.random() > 0.5;
            return {
                name: domain,
                available,
                price: available ? `$${(Math.random() * 10 + 5).toFixed(2)}` : undefined
            };
        })
    );

    return results;
}

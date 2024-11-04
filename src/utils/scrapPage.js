export async function scrapPage(page) {

    try {
        const options = {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${process.env.FIRECLAW_API_KEY}`,
              'Content-Type': 'application/json'
            },
            body: '{"url":"https://xyz.ag3nts.org"}'
          };
          
         var res = await fetch('https://api.firecrawl.dev/v1/scrape', options)
            .then(response => response.json())
            .catch(err => console.error(err));

        if (res && res.success) {
            console.log('Scraped content:', res.data.markdown);
            return res.data.markdown;
        } else {
            console.warn(`No markdown content found for URL: ${page}`);
            return '';
        }
    } catch (error) {
        console.error(`Error scraping URL ${page}:`, error);
        return '';
    }
}
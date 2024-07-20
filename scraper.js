const scrapeCategory = async (browser, url) => new Promise(async (resolve, reject) => {
    try {
        let page = await browser.newPage();
        console.log(">> Mở TAb mới")

        await page.goto(url)
        console.log("Truy cập vào" + url)

        await page.waitForSelector('#webpage')
        console.log(">> Website đã load xong")

        const dataCategory = await page.$$eval('#navbar-menu > ul > li', (elements) => {
            dataCategory = elements.map((element) => {
                return {
                    category: element.querySelector('a').innerText,
                    link: element.querySelector('a').href
                }
            })
            return dataCategory

        })
        await page.close()
        console.log(">> Tab đã đóng")
        resolve(dataCategory)

    } catch (error) {
        console.log("Lỗi ở scrape category:" + error)
        reject(error)
    }

})

const scraper = (browser, url) => new Promise(async (resolve, reject) => {
    try {
        let newPage = await browser.newPage()
        console.log(">> Đã mở Tab mới ....");
        await newPage.goto(url)
        console.log(">> Đã truy cập vào trang: " + url);
        await newPage.waitForSelector('#main')
        console.log(">> Đã load xong tag main ....");

        const scrapeData = {}

        // Lấy header
        const headerData = await newPage.$eval('header', (element) => {
            return {
                title: element.querySelector('h1').innerText,
                description: element.querySelector('p').innerText
            }
        })

        scrapeData.header = headerData

        // Lấy links detail item
        const detailLinks = await newPage.$$eval('#left-col > section.section-post-listing ul > li', (elements) => {
            return elements.map((element) => {
                return element.querySelector('.post-meta > h3 > a').href
            })
        })

        // Lấy thông tin item
        const scraperDetail = async (link) => new Promise(async (resolve, reject) => {
            try {
                let newPageDetail = await browser.newPage()
                await newPageDetail.goto(link)
                console.log(">> Đã truy cập vào trang: " + link);
                await newPageDetail.waitForSelector('#main')

                const detailData = {}

                // bắt đầu cạo
                // cạo ảnh
                const images = await newPageDetail.$$eval('#left-col > article > div.post-images > div > div.swiper-wrapper > div.swiper-slide > img', (elements) => {
                    return elements.map((element) => {
                        return element.src
                    })
                })

                detailData.images = images

                // lấy header detail
                const header = await newPageDetail.$eval('header.page-header', (el) => {
                    return {
                        title: el.querySelector('h1 > a').innerText,
                        star: el.querySelector('h1 > span')?.className?.replace(/^\D+/g, ''),
                        class: {
                            content: el.querySelector('p').innerText,
                            classType: el.querySelector('p > a > strong').innerText
                        },
                        address: el.querySelector('address').innerText,
                        attributes: {
                            price: el.querySelector('div.post-attributes > .price >span').innerText,
                            acreage: el.querySelector('div.post-attributes > .acreage >span').innerText,
                            published: el.querySelector('div.post-attributes > .published >span').innerText,
                            hashtag: el.querySelector('div.post-attributes > .hashtag >span').innerText,
                        }
                    }

                })

                detailData.header = header

                // thông tin mô tả
                const mainContentHeader = await newPageDetail.$eval('#left-col > article.the-post > section.post-main-content', (el) => el.querySelector('div.section-header > h2').innerText)
                const mainContentContent = await newPageDetail.$$eval('#left-col > article.the-post > section.post-main-content > .section-content > p', (els) => els.map(el => el.innerText))

                detailData.mainContent = {
                    header: mainContentHeader,
                    content: mainContentContent
                }

                // Đặc điểm  tin đăng
                const overviewHeader = await newPageDetail.$eval('#left-col > article.the-post > section.post-overview', (el) => el.querySelector('div.section-header > h3').innerText)
                const overviewContent = await newPageDetail.$$eval('#left-col > article.the-post > section.post-overview > .section-content > table.table > tbody > tr', (els) => els.map(el => {
                    return {
                        name: el.querySelector('td:nth-child(1)').innerText,
                        content: el.querySelector('td:nth-child(2)').innerText
                    }
                }))
                
                detailData.overview = {
                    header: overviewHeader,
                    content: overviewContent
                }
                
                // Thông tin liên hệ
                const contactHeader = await newPageDetail.$eval('#left-col > article.the-post > section.post-contact', (el) => el.querySelector('div.section-header > h3').innerText)
                const contactContent = await newPageDetail.$$eval('#left-col > article.the-post > section.post-contact > .section-content > table.table > tbody > tr', (els) => els.map(el => {
                    return {
                        name: el.querySelector('td:nth-child(1)').innerText,
                        content: el.querySelector('td:nth-child(2)').innerText
                    }
                }))
                
                detailData.contact = {
                    header: contactHeader,
                    content: contactContent
                }

                

                await newPageDetail.close()

                console.log(">> Đã đóng trang " + link);

                resolve(detailData)
            } catch (error) {
                console.log('Lấy data detail lỗi: ' + error);
                reject(error)
            }

        })
        
        let details = []
        for (const link of detailLinks) {
            const detail = await scraperDetail(link)
            details.push(detail)
        }

        scrapeData.body = details

        
        console.log(">> Đã cào xong" + url);
        resolve(scrapeData)
    } catch (error) {
        console.log("Lỗi ở scraper:" + error)
        reject(error)
    }
})

module.exports = {
    scrapeCategory,
    scraper
}
const scrapers = require('./scraper')
const fs = require('fs')

const scrapeController = async (browserInstance) => {
    const url = "https://phongtro123.com/"
    const indexs = [1,2,3,4]
    try {
        let browser = await browserInstance()
        //gọi hàm cào ở file scrape.js
        let categories = await scrapers.scrapeCategory(browser, url)
        const selectedCategories = categories.filter((category, index) => indexs.includes(index))
        
        // let result = await scrapers.scraper(browser, selectedCategories[0].link)

        // fs.writeFile('chothuephongtro.json', JSON.stringify(result), (err) => {
        //     if (err) throw err
        //     console.log('Data written to file successfully!')
        // })
        
        let result1 = await scrapers.scraper(browser, selectedCategories[1].link)

        fs.writeFile('nhachothue.json', JSON.stringify(result1), (err) => {
            if (err) throw err
            console.log('Data written to file successfully!')
        })
        

        let result2 = await scrapers.scraper(browser, selectedCategories[2].link)
        fs.writeFile('chothuecanho.json', JSON.stringify(result2), (err) => {
            if (err) throw err
            console.log('Data written to file successfully!')
        })
        
        let result3 = await scrapers.scraper(browser, selectedCategories[3].link)

        fs.writeFile('matbangvanphong.json', JSON.stringify(result3), (err) => {
            if (err) throw err
            console.log('Data written to file successfully!')
        })
        
        await browser.close()
    } catch (error) {
        console.log("Lỗi ở scrape controller: " + error)
    }
}

module.exports = scrapeController
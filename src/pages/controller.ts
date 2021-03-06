// import { JsonController, Get, Param, Put, Body, Post, HttpCode } from 'routing-controllers'
import { JsonController, Get, Param, Put, Body, NotFoundError, Post, HttpCode, Authorized } from 'routing-controllers'
//import pagesById, { Page } from './data'
import Page from './entity'

// type PageList = { pages: Page[] }

@JsonController()
export default class PageController {

    /* @Get('/pages/:id')
    getPage(
        @Param('id') id: number
    ): Page {
        return pagesById[id]
    } */

    @Get('/pages/:id')
    getPage(
        @Param('id') id: number
    ){
        return Page.findOne(id)
    }

    @Get('/pages')
    async allPages(){
        const page = await Page.find()
        return page
    }

    @Put('/pages/:id')
    async updatePage(
        @Param('id') id: number,
        @Body() update: Partial<Page>
    ) {
        const page = await Page.findOne(id)
        if (!page) throw new NotFoundError('Cannot find page')
    return Page.merge(page, update).save()
    }

    @Authorized()
    @Post('/pages')
    @HttpCode(201)
    createPage(
        @Body() page: Page
    ){
        return page.save()    
    }

    /* @Get('/pages')
    allPage(): PageList {
        return {pages: Object.values(pagesById)}
    }

    @Put('/pages/:id')
    updatePage(
        @Param('id') id: number,
        @Body() body: Partial<Page>
    ): Page {
        console.log(`Incoming PUT body param:`, body)
        return pagesById[id]
    }

    @Post('/pages')
    @HttpCode(201)
    createPage(
        @Body() body: Page
    ): Page {
        console.log(`Incoming POST body param:`, body)
        return body
    } */

}
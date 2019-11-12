import { JsonController, Get, Param, Put, Body, NotFoundError, Post, HttpCode } from 'routing-controllers'
import User from './entity'

@JsonController()
export default class UserController {

    @Get('/users/:id')
    getUser(
        @Param('id') id:number
    ){
        return User.findOne(id)
    }
    
    @Get('/users')
    async allUsers(){
        const user = await User.find()
        return user
    }

    @Put('/users/:id')
    async updateUser(
        @Param('id') id: number,
        @Body() update: Partial<User>
    ) {
        const user = await User.findOne(id)
        if (!user) throw new NotFoundError('Cannot find user')
    return User.merge(user, update).save()
    }

    @Post('/users')
    @HttpCode(201)
    async createUser(
        @Body() user: User
    ){
        const {password, ...rest} = user
        const entity = User.create(rest)
        await entity.setPassword(password)
        return entity.save()    
    }
}
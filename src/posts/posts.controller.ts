import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private postsService: PostsService ) {}

  @Get()
  getPosts() {
    return this.postsService.getPosts()
  }

  // @Get(':id')
  // getUser(@Param('id', ParseIntPipe) id: number): Promise<User> {
  //   return this.usersService.getUser(id)
  // }

  @Post()
  createPost(@Body() post: CreatePostDto) {
    return this.postsService.createPost(post)
  }

  // @Delete(':id')
  // deleteUser(@Param('id', ParseIntPipe) id: number): any {
  //   return this.usersService.deleteUser(id)
  // }
  //
  // @Patch(':id')
  // updateUser(@Param('id', ParseIntPipe) id: number, @Body() user: UpdateUserDto): Promise<User> {
  //   return this.usersService.updateUser(id, user)
  // }
}

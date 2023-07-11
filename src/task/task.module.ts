import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { Task } from './entities/task.entity';
import { CategoryModule } from 'src/category/category.module';
import { SubcategoryModule } from 'src/subcategory/subcategory.module';
import { JWTAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from 'src/auth/strategies/jwt.strategy';
import { AuthModule } from 'src/auth/auth.module';
import { UserModule } from 'src/user/user.module';
import { jwtConstants } from 'src/auth/constants';
import { AuthService } from 'src/auth/auth.service';

@Module({ 
  imports: [
    TypeOrmModule.forFeature([Task]),
    CategoryModule,
    SubcategoryModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '24h' },
    }),
    AuthModule,
    UserModule,
  ],
  controllers: [TaskController],
  providers: [TaskService, JwtStrategy, JWTAuthGuard, AuthService] 
})
export class TaskModule {}

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { CategoryModule } from './category/category.module';
import { SubcategoryModule } from './subcategory/subcategory.module';
import { DatabaseModule } from './database/database.module';
import { PriorityModule } from './priority/priority.module';
import { TaskModule } from './task/task.module';
import * as path from 'path';
import { AcceptLanguageResolver, I18nModule, QueryResolver } from 'nestjs-i18n';
import { TranslationsController } from './translations/translations.controller';
import { TranslationsModule } from './translations/translations.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';

@Module({ 
  imports: [
    I18nModule.forRoot({
      fallbackLanguage: 'en',
      loaderOptions: {
        path: path.join(__dirname, '/i18n/'),
        watch: true,
      },
      resolvers: [
        { use: QueryResolver, options: ['lang'] },
        AcceptLanguageResolver,
      ],
    }),
    DatabaseModule,
    AuthModule,
    UserModule,
    CategoryModule,
    SubcategoryModule,
    PriorityModule,
    TaskModule,
    TranslationsModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [AppController, TranslationsController],
  providers: [AppService],
})
export class AppModule {}

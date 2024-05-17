import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { AuthModule } from './auth/auth.module'
import { PostModule } from './post/post.module'
import { UserModule } from './user/user.module'
import { FileModule } from './file/file.module'
import { CategoryModule } from './category/category.module';

@Module({
	imports: [
		ConfigModule.forRoot(),
		AuthModule,
		UserModule,
		PostModule,
		FileModule,
		CategoryModule
	]
})
export class AppModule {}

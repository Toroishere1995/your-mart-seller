import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS ,HttpClientModule } from '@angular/common/http';
import { HttpModule} from '@angular/http'
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { RouterModule, Routes } from '@angular/router';
import { ApiService } from './service/api.service';
import { JwtService } from './service/jwt.service';
import { UserService } from './service/user.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { HttpTokenInterceptor } from './interceptor/http.token.interceptor';
import { AuthenticatedUserDirective } from './authenticated-user.directive';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductPreviewComponent } from './product-preview/product-preview.component';
import { ProductComponent } from './product/product.component';
import { RecaptchaModule } from 'angular-google-recaptcha';
import { DashboardAuthResolverService } from './dashboard/dashboard-auth-resolver.service';
import { SellerService } from './service/seller.service';
import { ProductService } from './service/product.service';
import { CarouselComponent } from './carousel/carousel.component';
import { EditorComponent } from './editor/editor.component';
import {EditableProductResolverService} from './editor/editable-product-resolver.service'
import { AuthGuardService } from './service/auth-guard.service';
import { LogoutComponent } from './logout/logout.component';
import { MessageComponent } from './message/message.component';
import { ErrorComponent } from './error/error.component';
const routes:Routes =[
  {
    path:'login',component:LoginComponent
  },
  {
    path:'register',component:RegisterComponent
  },
  {
    path:'',component:DashboardComponent,canActivate: [AuthGuardService]
  },
  {
    path:'products',component:ProductListComponent ,canActivate: [AuthGuardService]
  },
  {
    path:'products/:productId',component:ProductComponent,canActivate: [AuthGuardService]
  },
  {
    path:'editor',component:EditorComponent,canActivate: [AuthGuardService]
  },
  {
    path: 'editor/:productId', component: EditorComponent,canActivate: [AuthGuardService],
  resolve: { article: EditableProductResolverService }
  
  },
  {
    path: 'logout',component:LogoutComponent
  }
  
]
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    AuthenticatedUserDirective,
    ProductListComponent,
    ProductPreviewComponent,
    ProductComponent,
    CarouselComponent,
    EditorComponent,
    LogoutComponent,
    MessageComponent,
    ErrorComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    RecaptchaModule.forRoot({
      siteKey: '',
  }),
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    HttpClientModule,
    NgbModule,
    HttpModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: HttpTokenInterceptor, multi: true },
    ApiService,
    JwtService,
    UserService,
    SellerService,
    ProductService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

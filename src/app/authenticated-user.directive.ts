import {
  Directive,
  Input,
  OnInit,
  TemplateRef,
  ViewContainerRef
} from '@angular/core';
import { UserService } from './service/user.service';

@Directive({
  selector: '[appAuthenticatedUser]'
})
export class AuthenticatedUserDirective  implements OnInit{

  constructor(
    private templateRef: TemplateRef<any>,
    private userService: UserService,
    private viewContainer: ViewContainerRef
  ) { }

condition:boolean;

  ngOnInit(){
    this.userService.isAuthenticated.subscribe(
      (isAutheticated)=>{
        if(isAutheticated && this.condition || !isAutheticated && !this.condition){
          this.viewContainer.createEmbeddedView(this.templateRef);
        } else {
          this.viewContainer.clear();
        }
      }
    )
  }

  @Input() set appAuthenticatedUser(condition: boolean) {
    this.condition = condition;
  }
}

import { Component, OnInit, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/core/api.service';
import { Router } from '@angular/router';
import { MessageService } from 'src/app/core/message.service';
import { Role } from 'src/app/core/model/model-user/role';
import { getValueInRange } from '@ng-bootstrap/ng-bootstrap/util/util';
import { UserDto } from 'src/app/core/model/model-user/userDto';

@Component({
  selector: 'app-topo',
  templateUrl: './topo.component.html',
  styleUrls: ['./topo.component.css']
})
@Injectable({
  providedIn: 'root',
})
export class TopoComponent {

  roles: Role[];
  users: UserDto[];
  public user = new UserDto;

  public nomeDoRole : string;

  constructor(private apiService: ApiService, 
    private router: Router,
    private messageService: MessageService) { }

  getRole(user: UserDto) {
    return this.apiService.getRole(user.roles);
  }

  logou() {
    this.apiService.logout().subscribe(() => {
      this.clearLocalStore();
      this.messageService.showSuccess('Logout', 'Logout realizado com sucesso');
      this.router.navigate(['loginUser']);
      this.nomeDoRole = "";
    }, error => {
      this.messageService.showError('Logout', 'Erro na realização de logout');
    });

  }

  clearLocalStore() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('currentUser');
  }

  isAutenticated(): Observable<boolean> {
    return this.apiService.isAuthenticated();
  }

  isAuthenticatedADM(): Observable<boolean> {
    return this.apiService.isAuthenticatedADM();
  }
}

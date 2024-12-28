import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RoleService } from "../../services/role.service";
import { DropdownComponent } from "../shared/dropdown/dropdown.component";

@Component({
  selector: "app-role-selector",
  standalone: true,
  imports: [CommonModule, DropdownComponent],
  template: `
    <div *ngIf="(roleService.roles$ | async)?.length! > 1">
      <app-dropdown
        [options]="roleOptions"
        [selected]="currentRole"
        (selectedChange)="onRoleChange($event)"
        label="Select role"
      ></app-dropdown>
    </div>
  `,
})
export class RoleSelectorComponent implements OnInit {
  currentRole = "user";
  roleOptions = [
    { label: "Gebruiker", value: "user" },
    { label: "Administrator", value: "admin" },
  ];

  constructor(public roleService: RoleService) {}

  ngOnInit() {
    this.roleService.loadUserRoles();
    this.roleService.roles$.subscribe((roles) => {
      this.currentRole = roles?.includes("admin") ? "admin" : "user";
    });
  }

  onRoleChange(role: string) {
    this.currentRole = role;
  }
}

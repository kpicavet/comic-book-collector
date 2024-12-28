import { Injectable } from "@angular/core";
import { createClient } from "@supabase/supabase-js";
import { BehaviorSubject } from "rxjs";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: "root",
})
export class RoleService {
  private supabase = createClient(
    environment.supabase.url,
    environment.supabase.anonKey
  );

  private rolesSubject = new BehaviorSubject<string[]>(["user"]);
  roles$ = this.rolesSubject.asObservable();

  async loadUserRoles() {
    try {
      const { data: roles, error } = await this.supabase.rpc("user_roles");

      if (error) {
        console.error("Error loading user roles:", error);
        return;
      }

      this.rolesSubject.next(roles || ["user"]);
    } catch (error) {
      console.error("Error loading user roles:", error);
      this.rolesSubject.next(["user"]); // Default to user role on error
    }
  }

  hasRole(role: string): boolean {
    return this.rolesSubject.value.includes(role);
  }
}

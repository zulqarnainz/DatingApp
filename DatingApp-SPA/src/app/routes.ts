// routes
import { Routes, CanActivate } from "@angular/router";

// components
import { HomeComponent } from "./home/home.component";
import { MemberListComponent } from "./members/member-list/member-list.component";
import { MessagesComponent } from "./messages/messages.component";
import { ListsComponent } from "./lists/lists.component";
import { MemberDetailComponent } from "./members/member-detail/member-detail.component";
import { MemberEditComponent } from "./members/member-edit/member-edit.component";

// guards
import { AuthGuard } from "./_guards/auth.guard";
import { PreventUnsavedChanges } from "./_guards/prevent-unsaved-changes.guard";

// resolvers
import { MemberDetailResolver } from "./_resolvers/member-detail.resolver";
import { MemberListResolver } from "./_resolvers/member-list.resolver";
import { MemberEditResolver } from "./_resolvers/member-edit.resolver";
import { ListsResolver } from "./_resolvers/lists.resolver";

export const appRoutes: Routes = [
  { path: "", component: HomeComponent },
  {
    path: "",
    runGuardsAndResolvers: "always",
    canActivate: [AuthGuard],
    children: [
      {
        path: "members",
        component: MemberListComponent,
        resolve: { usersRouteData: MemberListResolver }
      },
      {
        path: "members/:id",
        component: MemberDetailComponent,
        resolve: { userRouteData: MemberDetailResolver }
      },
      {
        path: "member/edit",
        component: MemberEditComponent,
        resolve: { userToEditRouteData: MemberEditResolver },
        canDeactivate: [PreventUnsavedChanges]
      },
      { path: "messages", component: MessagesComponent },
      {
        path: "lists",
        component: ListsComponent,
        resolve: { usersListRouteData: ListsResolver }
      }
    ]
  },

  { path: "**", redirectTo: "", pathMatch: "full" }
];

// export const appRoutes: Routes = [
//   { path: 'home', component: HomeComponent },
//   { path: 'members', component: MemberListComponent, canActivate: [AuthGuard] },
//   { path: 'messages', component: MessagesComponent },
//   { path: 'lists', component: ListsComponent },
//   { path: '**', redirectTo: 'home', pathMatch: 'full' }

// ];

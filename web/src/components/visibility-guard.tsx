import { useAuthStore } from "@/stores/auth";
import type { Role } from "@/types";
import type { ReactNode } from "react";

interface VisibilityGuard {
  children: ReactNode;
  roles?: Role[];
  userIds?: string[];
}

export const VisibilityGuard = ({
  children,
  roles,
  userIds,
}: VisibilityGuard) => {
  const { user } = useAuthStore();

  if (!user) {
    return null;
  }

  if ((!roles || roles.length === 0) && (!userIds || userIds.length === 0)) {
    return <>{children}</>;
  }

  const hasAllowedRole = user.role ? roles!.includes(user.role) : false;

  const hasAllowedUserId = user.id ? userIds!.includes(user.id) : false;

  if (hasAllowedRole || hasAllowedUserId) {
    return <>{children}</>;
  }

  return null;
};

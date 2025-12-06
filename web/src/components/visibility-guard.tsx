import { useAuthStore } from "@/stores/auth";
import type { ReactNode } from "react";

interface VisibilityGuard {
  children: ReactNode;
  roles?: string[];
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

  const hasAllowedRole =
    roles && roles.length > 0 ? roles.includes(user.role || "") : false;

  const hasAllowedUserId =
    userIds && userIds.length > 0 ? userIds.includes(user.id) : false;

  if (hasAllowedRole || hasAllowedUserId) {
    return <>{children}</>;
  }

  return null;
};

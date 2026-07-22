import { useState, useEffect, useCallback } from 'react';
import { getUsersUseCase } from '../../domain/useCases/GetUsersUseCase';
import { updateUserUseCase } from '../../domain/useCases/UpdateUserUseCase';
import { deleteUserUseCase } from '../../domain/useCases/DeleteUserUseCase';
import type { AdminUser, Role } from '../../domain/entities/AdminUser';
import { ApiError } from '../../../../shared/api/httpClient';

export function useUsers(initialRoleFilter?: string) {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = useCallback(async (role?: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getUsersUseCase(role ?? initialRoleFilter);
      setUsers(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'No se pudo cargar la lista de usuarios.');
    } finally {
      setIsLoading(false);
    }
  }, [initialRoleFilter]);

  
  
  
  
  useEffect(() => {
    let isMounted = true;

    async function load() {
      setIsLoading(true);
      setError(null);
      try {
        const data = await getUsersUseCase(initialRoleFilter);
        if (isMounted) setUsers(data);
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : 'No se pudo cargar la lista de usuarios.');
        }
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    load();

    return () => {
      isMounted = false;
    };
    
  }, []);

  async function updateUser(id: string, role: Role, isActive: boolean): Promise<boolean> {
    setError(null);
    try {
      const updated = await updateUserUseCase(id, role, isActive);
      setUsers((prev) => prev.map((u) => (u.id === id ? updated : u)));
      return true;
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message);
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('No se pudo actualizar el usuario.');
      }
      return false;
    }
  }

  async function deleteUser(id: string): Promise<boolean> {
    setError(null);
    try {
      await deleteUserUseCase(id);
      setUsers((prev) => prev.filter((u) => u.id !== id));
      return true;
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message);
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('No se pudo eliminar el usuario.');
      }
      return false;
    }
  }

    async function toggleActive(user: AdminUser): Promise<boolean> {
    return updateUser(user.id, user.role, !user.isActive);
  }

  return { users, isLoading, error, fetchUsers, updateUser, deleteUser, toggleActive };
}
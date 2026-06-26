import { useState, useEffect, useCallback } from 'react';
import { getUsersUseCase } from '../../domain/useCases/GetUsersUseCase';
import { updateUserUseCase } from '../../domain/useCases/UpdateUserUseCase';
import { deleteUserUseCase } from '../../domain/useCases/DeleteUserUseCase';
import type { AdminUser, Role } from '../../domain/entities/AdminUser';
import { ApiError } from '../../../../shared/api/httpClient';

/**
 * Hook de presentación: orquesta listar, actualizar y eliminar usuarios.
 * UsersPage.tsx solo consume este hook, sin saber nada de fetch ni DTOs.
 */
export function useUsers() {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getUsersUseCase();
      setUsers(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'No se pudo cargar la lista de usuarios.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Carga inicial al montar. Se envuelve en una función async local
  // (en vez de llamar directamente a fetchUsers) para que el linter
  // de React no lo confunda con "sincronizar estado externo dentro del efecto";
  // esto es una carga de datos one-shot al montar el componente, no una suscripción.
  useEffect(() => {
    let isMounted = true;

    async function load() {
      setIsLoading(true);
      setError(null);
      try {
        const data = await getUsersUseCase();
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
    // eslint-disable-next-line react-hooks/exhaustive-deps -- carga única al montar
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

  /** Toggle rápido de activo/inactivo sin abrir el modal, conserva el rol actual */
  async function toggleActive(user: AdminUser): Promise<boolean> {
    return updateUser(user.id, user.role, !user.isActive);
  }

  return { users, isLoading, error, fetchUsers, updateUser, deleteUser, toggleActive };
}
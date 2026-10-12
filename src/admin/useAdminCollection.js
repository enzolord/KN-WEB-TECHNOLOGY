import { useCallback, useEffect, useState } from 'react';
import { fetchAll, insertRow, updateRow, deleteRow, swapOrder } from '../lib/crud';

export function useAdminCollection(table, { orderBy = 'sort_order', ascending = true } = {}) {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const reload = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const data = await fetchAll(table, { orderBy, ascending });
      setRows(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [table, orderBy, ascending]);

  useEffect(() => {
    reload();
  }, [reload]);

  const create = async (payload) => {
    const row = await insertRow(table, payload);
    setRows((r) => [...r, row].sort((a, b) => (a[orderBy] ?? 0) - (b[orderBy] ?? 0)));
    return row;
  };

  const update = async (id, payload) => {
    const row = await updateRow(table, id, payload);
    setRows((r) => r.map((x) => (x.id === id ? row : x)));
    return row;
  };

  const remove = async (id) => {
    await deleteRow(table, id);
    setRows((r) => r.filter((x) => x.id !== id));
  };

  const moveUp = async (id) => {
    const idx = rows.findIndex((r) => r.id === id);
    if (idx <= 0) return;
    await swapOrder(table, rows[idx], rows[idx - 1]);
    await reload();
  };

  const moveDown = async (id) => {
    const idx = rows.findIndex((r) => r.id === id);
    if (idx === -1 || idx >= rows.length - 1) return;
    await swapOrder(table, rows[idx], rows[idx + 1]);
    await reload();
  };

  return { rows, loading, error, reload, create, update, remove, moveUp, moveDown };
}

import { useState, useCallback, DragEvent } from 'react';

interface UseDragReorderOptions<T> {
  items: T[];
  onReorder: (items: T[]) => void;
  getId: (item: T) => string;
}

interface DragReorderState<T> {
  draggedItem: T | null;
  draggedOverId: string | null;
  handleDragStart: (item: T) => (e: DragEvent) => void;
  handleDragOver: (id: string) => (e: DragEvent) => void;
  handleDragEnd: () => void;
  handleDrop: (targetId: string) => (e: DragEvent) => void;
  isDragging: boolean;
}

export function useDragReorder<T>({
  items,
  onReorder,
  getId,
}: UseDragReorderOptions<T>): DragReorderState<T> {
  const [draggedItem, setDraggedItem] = useState<T | null>(null);
  const [draggedOverId, setDraggedOverId] = useState<string | null>(null);

  const handleDragStart = useCallback((item: T) => (e: DragEvent) => {
    setDraggedItem(item);
    e.dataTransfer.effectAllowed = 'move';
    // Add a small delay to allow the drag image to be captured
    setTimeout(() => {
      (e.target as HTMLElement).classList.add('dragging');
    }, 0);
  }, []);

  const handleDragOver = useCallback((id: string) => (e: DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setDraggedOverId(id);
  }, []);

  const handleDragEnd = useCallback(() => {
    setDraggedItem(null);
    setDraggedOverId(null);
    // Remove dragging class from all elements
    document.querySelectorAll('.dragging').forEach(el => {
      el.classList.remove('dragging');
    });
  }, []);

  const handleDrop = useCallback((targetId: string) => (e: DragEvent) => {
    e.preventDefault();
    
    if (!draggedItem) return;
    
    const draggedId = getId(draggedItem);
    if (draggedId === targetId) return;

    const newItems = [...items];
    const draggedIndex = newItems.findIndex(item => getId(item) === draggedId);
    const targetIndex = newItems.findIndex(item => getId(item) === targetId);

    if (draggedIndex === -1 || targetIndex === -1) return;

    // Remove dragged item and insert at target position
    const [removed] = newItems.splice(draggedIndex, 1);
    newItems.splice(targetIndex, 0, removed);

    onReorder(newItems);
    handleDragEnd();
  }, [draggedItem, items, getId, onReorder, handleDragEnd]);

  return {
    draggedItem,
    draggedOverId,
    handleDragStart,
    handleDragOver,
    handleDragEnd,
    handleDrop,
    isDragging: draggedItem !== null,
  };
}

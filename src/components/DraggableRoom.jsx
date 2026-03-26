import { useState, useRef, useEffect, useCallback } from 'react';

export function DraggableRoom({
  room,
  roomType,
  isSelected,
  hasOverlap = false,
  isLocked = false,
  validationWarnings = [],
  onClick,
  onUpdate,
  onDelete,
  onDuplicate,
  onToggleLock,
  scale = 1
}) {
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const roomRef = useRef(null);
  const dragStartRef = useRef({ x: 0, y: 0 });
  const resizeStartRef = useRef({ x: 0, y: 0, width: 0, height: 0, posX: 0, posY: 0 });
  const resizeDirectionRef = useRef(null);
  const actionRef = useRef(null); // 'drag' | 'resize' | null

  // Handle room dragging
  const handleMouseDown = useCallback((e) => {
    // Don't start drag if clicking on a resize handle or control button
    if (e.target.closest('.resize-handle') || e.target.closest('.room-control-btn')) return;
    if (isLocked) return;
    e.stopPropagation();
    e.preventDefault();

    actionRef.current = 'drag';
    setIsDragging(true);
    dragStartRef.current = {
      x: e.clientX - room.position.x * scale,
      y: e.clientY - room.position.y * scale
    };
  }, [room.position.x, room.position.y, scale, isLocked]);

  // Handle resize start
  const handleResizeStart = useCallback((e, direction) => {
    if (isLocked) return;
    e.stopPropagation();
    e.preventDefault();

    actionRef.current = 'resize';
    resizeDirectionRef.current = direction;
    setIsResizing(direction);
    resizeStartRef.current = {
      x: e.clientX,
      y: e.clientY,
      width: room.size.width,
      height: room.size.height,
      posX: room.position.x,
      posY: room.position.y
    };
  }, [room.size.width, room.size.height, room.position.x, room.position.y, isLocked]);

  useEffect(() => {
    if (!actionRef.current) return;

    const handleMouseMove = (e) => {
      const action = actionRef.current;
      if (!action) return;

      if (action === 'drag') {
        const ds = dragStartRef.current;
        const newX = Math.max(0, (e.clientX - ds.x) / scale);
        const newY = Math.max(0, (e.clientY - ds.y) / scale);

        const snappedX = Math.round(newX / 2) * 2;
        const snappedY = Math.round(newY / 2) * 2;

        onUpdate({
          ...room,
          position: { x: snappedX, y: snappedY }
        });
      } else if (action === 'resize') {
        const rs = resizeStartRef.current;
        const dir = resizeDirectionRef.current;
        if (!dir || !roomType) return;

        const deltaX = (e.clientX - rs.x) / scale;
        const deltaY = (e.clientY - rs.y) / scale;

        let newWidth = rs.width;
        let newHeight = rs.height;
        let newX = rs.posX;
        let newY = rs.posY;

        if (dir.includes('e')) {
          newWidth = Math.max(roomType.minSize.width, rs.width + deltaX);
        }
        if (dir.includes('s')) {
          newHeight = Math.max(roomType.minSize.height, rs.height + deltaY);
        }
        if (dir.includes('w')) {
          const widthDelta = Math.min(deltaX, rs.width - roomType.minSize.width);
          newWidth = rs.width - widthDelta;
          newX = rs.posX + widthDelta;
        }
        if (dir.includes('n')) {
          const heightDelta = Math.min(deltaY, rs.height - roomType.minSize.height);
          newHeight = rs.height - heightDelta;
          newY = rs.posY + heightDelta;
        }

        // Snap to grid
        newWidth = Math.max(roomType.minSize.width, Math.round(newWidth / 2) * 2);
        newHeight = Math.max(roomType.minSize.height, Math.round(newHeight / 2) * 2);
        newX = Math.round(newX / 2) * 2;
        newY = Math.round(newY / 2) * 2;

        onUpdate({
          ...room,
          size: { width: newWidth, height: newHeight },
          position: { x: newX, y: newY }
        });
      }
    };

    const handleMouseUp = () => {
      actionRef.current = null;
      resizeDirectionRef.current = null;
      setIsDragging(false);
      setIsResizing(false);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, isResizing, room, scale, onUpdate, roomType]);

  const area = room.size.width * room.size.height;

  const hasWarnings = validationWarnings.length > 0;

  return (
    <div
      ref={roomRef}
      className={`room-element ${isSelected ? 'selected' : ''} ${isDragging ? 'dragging' : ''} ${isResizing ? 'resizing' : ''} ${hasOverlap ? 'overlap' : ''} ${isLocked ? 'locked' : ''} ${hasWarnings ? 'has-warnings' : ''}`}
      style={{
        left: `${room.position.x * scale}px`,
        top: `${room.position.y * scale}px`,
        width: `${room.size.width * scale}px`,
        height: `${room.size.height * scale}px`,
        borderColor: hasOverlap ? '#ef4444' : (hasWarnings ? '#f59e0b' : roomType?.color),
        backgroundColor: hasOverlap ? '#ef444433' : (hasWarnings ? '#f59e0b22' : `${roomType?.color}22`),
        cursor: isLocked ? 'not-allowed' : (isDragging ? 'grabbing' : 'grab'),
        opacity: isLocked ? 0.7 : 1
      }}
      onMouseDown={handleMouseDown}
      onClick={(e) => {
        e.stopPropagation();
        if (!e.target.closest('.resize-handle')) {
          onClick(room);
        }
      }}
    >
      {/* Room Content */}
      <div className="room-content">
        <span className="room-element-icon">{roomType?.icon}</span>
        <span className="room-element-name">{room.customName || room.name}</span>
        <span className="room-element-size">
          {room.size.width}m × {room.size.height}m
        </span>
        <span className="room-element-area">{area}m²</span>
        {isLocked && (
          <span style={{ fontSize: 'min(1.2rem, calc(100% / 5))', marginTop: '0.25rem' }} title="Room is locked">
            🔒
          </span>
        )}
        {hasOverlap && (
          <span style={{ fontSize: 'min(1.5rem, calc(100% / 4))', color: '#ef4444', marginTop: '0.25rem' }} title="Room overlaps with another">
            ⚠️
          </span>
        )}
        {hasWarnings && !hasOverlap && (
          <span style={{ fontSize: 'min(1.5rem, calc(100% / 4))', color: '#f59e0b', marginTop: '0.25rem' }} title={validationWarnings.join(', ')}>
            ⚠️
          </span>
        )}
      </div>

      {/* Dimension Labels */}
      {isSelected && (
        <>
          <div className="dimension-label dimension-horizontal" style={{
            top: '-24px',
            left: '50%',
            transform: 'translateX(-50%)',
            pointerEvents: 'none'
          }}>
            {room.size.width}m
          </div>
          <div className="dimension-label dimension-vertical" style={{
            left: '-40px',
            top: '50%',
            transform: 'translateY(-50%)',
            pointerEvents: 'none'
          }}>
            {room.size.height}m
          </div>
        </>
      )}

      {/* Controls */}
      <div className="room-controls">
        {onToggleLock && (
          <button
            className={`room-control-btn ${isLocked ? 'active' : ''}`}
            onClick={(e) => {
              e.stopPropagation();
              onToggleLock(room.id);
            }}
            title={isLocked ? "Unlock Room" : "Lock Room"}
          >
            {isLocked ? '🔒' : '🔓'}
          </button>
        )}
        <button
          className="room-control-btn"
          onClick={(e) => {
            e.stopPropagation();
            onClick(room);
          }}
          title="Edit Details"
        >
          ⚙️
        </button>
        {onDuplicate && (
          <button
            className="room-control-btn"
            onClick={(e) => {
              e.stopPropagation();
              onDuplicate(room);
            }}
            title="Duplicate Room"
          >
            📋
          </button>
        )}
        <button
          className="room-control-btn danger"
          onClick={(e) => {
            e.stopPropagation();
            if (!isLocked) {
              onDelete(room.id);
            }
          }}
          title={isLocked ? "Unlock to delete" : "Delete"}
          disabled={isLocked}
        >
          🗑️
        </button>
      </div>

      {/* Resize Handles */}
      {isSelected && !isLocked && (
        <>
          <div
            className="resize-handle resize-n"
            onMouseDown={(e) => handleResizeStart(e, 'n')}
          />
          <div
            className="resize-handle resize-ne"
            onMouseDown={(e) => handleResizeStart(e, 'ne')}
          />
          <div
            className="resize-handle resize-e"
            onMouseDown={(e) => handleResizeStart(e, 'e')}
          />
          <div
            className="resize-handle resize-se"
            onMouseDown={(e) => handleResizeStart(e, 'se')}
          />
          <div
            className="resize-handle resize-s"
            onMouseDown={(e) => handleResizeStart(e, 's')}
          />
          <div
            className="resize-handle resize-sw"
            onMouseDown={(e) => handleResizeStart(e, 'sw')}
          />
          <div
            className="resize-handle resize-w"
            onMouseDown={(e) => handleResizeStart(e, 'w')}
          />
          <div
            className="resize-handle resize-nw"
            onMouseDown={(e) => handleResizeStart(e, 'nw')}
          />
        </>
      )}
    </div>
  );
}

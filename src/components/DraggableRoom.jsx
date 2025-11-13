import { useState, useRef, useEffect } from 'react';

export function DraggableRoom({
  room,
  roomType,
  isSelected,
  hasOverlap = false,
  onClick,
  onUpdate,
  onDelete,
  onDuplicate,
  scale = 1
}) {
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [resizeStart, setResizeStart] = useState({ x: 0, y: 0, width: 0, height: 0 });
  const roomRef = useRef(null);

  // Handle room dragging
  const handleMouseDown = (e) => {
    if (e.target.classList.contains('resize-handle')) return;
    e.stopPropagation();
    setIsDragging(true);
    setDragStart({
      x: e.clientX - room.position.x * scale,
      y: e.clientY - room.position.y * scale
    });
  };

  // Handle resize start
  const handleResizeStart = (e, direction) => {
    e.stopPropagation();
    setIsResizing(direction);
    setResizeStart({
      x: e.clientX,
      y: e.clientY,
      width: room.size.width,
      height: room.size.height,
      posX: room.position.x,
      posY: room.position.y
    });
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (isDragging) {
        const newX = Math.max(0, (e.clientX - dragStart.x) / scale);
        const newY = Math.max(0, (e.clientY - dragStart.y) / scale);

        // Snap to grid (every 2 units)
        const snappedX = Math.round(newX / 2) * 2;
        const snappedY = Math.round(newY / 2) * 2;

        onUpdate({
          ...room,
          position: { x: snappedX, y: snappedY }
        });
      } else if (isResizing) {
        const deltaX = (e.clientX - resizeStart.x) / scale;
        const deltaY = (e.clientY - resizeStart.y) / scale;

        let newWidth = resizeStart.width;
        let newHeight = resizeStart.height;
        let newX = resizeStart.posX;
        let newY = resizeStart.posY;

        if (isResizing.includes('e')) {
          newWidth = Math.max(roomType.minSize.width, resizeStart.width + deltaX);
        }
        if (isResizing.includes('s')) {
          newHeight = Math.max(roomType.minSize.height, resizeStart.height + deltaY);
        }
        if (isResizing.includes('w')) {
          const widthDelta = Math.min(deltaX, resizeStart.width - roomType.minSize.width);
          newWidth = resizeStart.width - widthDelta;
          newX = resizeStart.posX + widthDelta;
        }
        if (isResizing.includes('n')) {
          const heightDelta = Math.min(deltaY, resizeStart.height - roomType.minSize.height);
          newHeight = resizeStart.height - heightDelta;
          newY = resizeStart.posY + heightDelta;
        }

        // Snap to grid
        newWidth = Math.round(newWidth / 2) * 2;
        newHeight = Math.round(newHeight / 2) * 2;
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
      setIsDragging(false);
      setIsResizing(false);
    };

    if (isDragging || isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, isResizing, dragStart, resizeStart, room, scale, onUpdate, roomType]);

  const area = room.size.width * room.size.height;

  return (
    <div
      ref={roomRef}
      className={`room-element ${isSelected ? 'selected' : ''} ${isDragging ? 'dragging' : ''} ${isResizing ? 'resizing' : ''} ${hasOverlap ? 'overlap' : ''}`}
      style={{
        left: `${room.position.x * scale}px`,
        top: `${room.position.y * scale}px`,
        width: `${room.size.width * scale}px`,
        height: `${room.size.height * scale}px`,
        borderColor: hasOverlap ? '#ef4444' : roomType?.color,
        backgroundColor: hasOverlap ? '#ef444433' : `${roomType?.color}22`,
        cursor: isDragging ? 'grabbing' : 'grab'
      }}
      onMouseDown={handleMouseDown}
      onClick={(e) => {
        e.stopPropagation();
        onClick(room);
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
        {hasOverlap && (
          <span style={{ fontSize: 'min(1.5rem, calc(100% / 4))', color: '#ef4444', marginTop: '0.25rem' }}>
            ⚠️
          </span>
        )}
      </div>

      {/* Controls */}
      <div className="room-controls">
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
            onDelete(room.id);
          }}
          title="Delete"
        >
          🗑️
        </button>
      </div>

      {/* Resize Handles */}
      {isSelected && (
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
